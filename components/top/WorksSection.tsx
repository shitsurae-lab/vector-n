"use client";

import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Category } from "@/app/features/works/api/types";

// ============================================
// Splide options
// ============================================
const splideOptions = {
  type: "slide" as const,
  focus: 0,
  perPage: 3,
  fixedWidth: "300px",
  gap: "30px",
  padding: { left: "0px", right: "30px" },
  arrows: false,
  pagination: false,
  rewind: false,
  breakpoints: {
    959: {
      perPage: 1,
      fixedWidth: "400px",
      gap: "30px",
      padding: { left: "0px", right: "266px" },
      arrows: false,
      pagination: false,
    },
    767: {
      perPage: 1,
      fixedWidth: "280px",
      gap: "20px",
      padding: { left: "0px", right: "35px" },
      arrows: false,
      pagination: false,
    },
  },
};

// ============================================
// セクション見出し
// ============================================
function SectionHeading({ label }: { label: string }) {
  return (
    <div className="py-20">
      <h2 className="flex_line_heading">{label}</h2>
    </div>
  );
}

// ============================================
// WorksCardSlide
// ============================================
// 一覧ページの WorkCard とは別コンポーネント。
// 違い: 角丸なし / ホバー -translate-y-2 / リンク先 /works/[category]
// ============================================
function WorksCardSlide({ category }: { category: Category }) {
  // 表示用テキスト: ACFの値 → フォールバックの順で参照
  const title = category.acf?.next_title || category.name;
  const excerpt = category.acf?.next_desc || category.description || "";
  const image = category.acf?.term_image_api || "";

  return (
    <Link
      href={`/works/${category.slug}`}
      className="group focus-visible:ring-accent flex flex-col items-center border border-[#e8e8e8] bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:outline-none"
      aria-label={`${title}の実績を見る`}
    >
      {/* 画像エリア
        PC:  300×224 → aspect-[300/224]
        Tab: 400×298 → aspect-[400/298]
        SP:  280×210 → aspect-[4/3]
      */}
      <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[400/298] lg:aspect-[300/224]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 767px) 280px, (max-width: 959px) 400px, 300px"
          />
        ) : (
          // 画像未設定時のフォールバック
          <div className="h-full w-full bg-[#ebedee]" />
        )}
      </div>

      {/* テキストエリア
        PC:  padding 20px 20px 40px  gap 16px
        Tab: padding 24px 24px 48px  gap 16px
        SP:  padding 20px 20px 32px  gap 16px
      */}
      <div className="flex w-full flex-col gap-4 px-5 pt-5 pb-8 md:px-6 md:pt-6 md:pb-12 lg:px-5 lg:pt-5 lg:pb-10">
        {/* タイトル
          PC:  18px bold
          Tab: 18px medium
          SP:  16px bold
        */}
        <h3 className="font-sans text-[16px] leading-normal font-bold text-[#333] md:text-[18px] md:font-medium lg:font-bold">
          {title}
        </h3>

        {/* 本文
          全bp: 14px normal #333
          PC:   line-height 1.7
        */}
        <p className="line-clamp-3 font-sans text-[14px] leading-normal font-normal text-[#333] lg:leading-[1.7]">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}

// ============================================
// WorksSection
// ============================================
// props で Category[] を受け取る（fetch はしない）
// データ取得は page.tsx（Server Component）側で行う
// ============================================
type Props = {
  categories: Category[];
};

export default function WorksSection({ categories }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="works"
      ref={ref}
      className="w-full pt-20 pb-20 md:pt-[120px] md:pb-[120px] lg:pt-[120px] lg:pb-20"
      aria-labelledby="works-heading"
    >
      <div className="mx-auto flex w-full flex-col items-start px-5 md:max-w-[696px] md:px-0 lg:max-w-[1140px]">
        {/* セクションタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <SectionHeading label="WORKS" />
        </motion.div>

        {/* カルーセル */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative w-full overflow-hidden lg:max-w-[1020px]"
        >
          {/* 右端のフェードアウト */}
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

          <Splide
            options={splideOptions}
            aria-label="Works カテゴリー一覧"
            className="works-splide"
          >
            {categories.map((category) => (
              <SplideSlide key={category.slug}>
                <WorksCardSlide category={category} />
              </SplideSlide>
            ))}
          </Splide>
        </motion.div>

        {/* VIEW ALL WORKS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex w-full justify-center"
        >
          <Link
            href="/works"
            className="text-primary border-primary hover:text-accent hover:border-accent inline-flex items-center gap-2 border-b pb-[2px] text-[13px] font-semibold tracking-widest transition-colors duration-150"
          >
            VIEW ALL WORKS
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
