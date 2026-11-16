"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import * as he from "he";
/**
 * 制作実績の型定義
 */
import { WorkData } from "@/app/features/works/api/types";

//日時のフォーマット
function formatDate(date: string): string {
  return date.slice(0, 10).replace(/-/g, ".");
}

// サムネイル: アイキャッチ → ACFの画像の順に探す
function getThumbnail(work: WorkData): string {
  return (
    work._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    work.acf?.next_api_image ||
    work.acf?.work_detail?.next_api_image ||
    ""
  );
}

//条件にあったカテゴリー情報（複数）を取得する
function getCategoryFromWork(work: WorkData) {
  const terms = work._embedded?.["wp:term"] ?? [];
  const flatTerms = terms.flat();
  const result = flatTerms.filter(
    (term) => term.taxonomy === "achievement_cat",
  );
  return result;
}

/**
 * 抜粋もしくはコンテンツ内の文章、そうでなければデフォルト文字列;
 * を指定
 * */
//プレーンテキストへ
function plainText(text: string): string {
  const decodeText = he.decode(text);
  return decodeText
    .replace(/<\/p>/g, " ")
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s+/g, " ");
}
//文字数制限
function shortenText(text: string): string {
  if (text.length > 30) {
    return `${text.slice(0, 30)}...`;
  }
  return text;
}

function getWorkDescription(work: WorkData): string {
  const excerpt = work.excerpt.rendered;
  const content = work.content.rendered;

  // 次は表示する文章を選ぶ
  const description =
    plainText(excerpt).trim() ||
    plainText(content).trim() ||
    "制作実績をご紹介します";

  return shortenText(description);
}

/**
 * カード1件分のProps
 */
type CardProps = {
  work: WorkData;
};

// const props = {
//   work: {
//     id: 1,
//     title: { rendered: "実績A" },
//     // その他の実績データ
//   },
// };

// const work = props.work;
/**
 * {work}:CardPropsの{work}は分割代入
 */
function LatestWorkCard({ work }: CardProps) {
  const thumbnail = getThumbnail(work);
  const categories = getCategoryFromWork(work);
  const workSlug = work.slug; //投稿スラッグ
  const categorySlug = categories[0]?.slug; //カテゴリースラッグ
  const categoryName = categories[0]?.name ?? "未分類"; //カテゴリー名称(日本語)
  const href = categorySlug ? `/works/${categorySlug}/${workSlug}` : "/works";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
    >
      <Link
        href={href}
        className="shadow-card flex flex-col p-4 md:flex-row md:border-b md:border-neutral-300 md:px-0 md:py-5 md:shadow-none"
      >
        <div className="relative aspect-13/8 md:min-w-0 md:flex-[2]">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt=""
              fill
              className="object-cover object-top"
            />
          )}
        </div>
        <div className="pt-4 md:min-w-0 md:flex-[3] md:pt-0 md:pl-6">
          <div className="mb-1 inline-flex items-center gap-[10px] text-[13px] text-neutral-400">
            <time dateTime={work.date}>{formatDate(work.date)}</time>
            <span className="rounded-[0.5em] border border-neutral-300 px-[0.6em] py-[0.2em] text-[10px] uppercase">
              {categoryName}
            </span>
          </div>
          <h3 className="mb-2 font-bold">{work.title.rendered}</h3>
          <p className="text-sm">{getWorkDescription(work)}</p>
        </div>
      </Link>
    </motion.article>
  );
}
/**
 * 受け取る側が出す、『条件』
 * worksという名前で、WorkData[]という『型』で受け取ると条件を出している」
 */
type Props = {
  works: WorkData[];
};

/**
 * Page.tsxからわたってきたworksを取り出し、{works}として使おうとしている
 * 関数自身で『私はこういうものを受け取ります』ということを宣言する
 */
export default function LatestWorksSection({ works }: Props) {
  return (
    <section
      id="latest"
      className="w-full py-20 md:py-[120px]"
      style={{
        background: "linear-gradient(to bottom, #fdfbfb, #ebedee)",
      }}
    >
      <div className="mx-auto flex w-full flex-col items-center px-5 md:max-w-[696px] md:px-0 lg:max-w-[960px]">
        <div className="w-full pb-20">
          <h2 className="flex_line_heading">LATEST WORKS</h2>
        </div>
        <ul className="flex w-full flex-col gap-y-10 md:gap-y-0">
          {works.map((work) => (
            <li key={work.id}>
              {/* {formatDate(work.date)} */}
              {/* {getThumbnail(work) || "画像なし"} */}
              <LatestWorkCard work={work} />
              {/* 前者のworkはコンポーネントに渡す。後者は変数をJSXで使うために{}で囲む */}
            </li>
          ))}
        </ul>
        {/* VIEW ALL WORKS */}
        <div className="mt-10 flex w-full justify-center">
          <Link
            href="/works"
            className="text-primary border-primary hover:text-accent hover:border-accent inline-flex items-center gap-2 border-b pb-[2px] text-[13px] font-semibold tracking-widest transition-colors duration-150"
          >
            VIEW ALL WORKS
          </Link>
        </div>
      </div>
    </section>
  );
}
