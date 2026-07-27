"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import he from "he";
import { ExternalLink, ZoomIn } from "lucide-react";
import { motion, Variants } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NAV_PATHS } from "@/app/constants/config";
import { WorkData } from "@/app/features/works/api/types";
import { worksRepository } from "@/app/features/works/api/repository";

// ----------------------------------------------------------------
// アニメーション定義
// ----------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

// ----------------------------------------------------------------
// 小見出し
// ----------------------------------------------------------------
function SectionHeading({ text }: { text: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-4 pb-6">
      <h3 className="heading_marker font-sans text-lg leading-normal font-medium text-[#003366] md:text-xl md:font-bold">
        {text}
      </h3>
    </div>
  );
}

// ----------------------------------------------------------------
// プロジェクト概要テーブル
// tableレイアウト版
// ----------------------------------------------------------------
type TableRow = {
  label: string;
  value: React.ReactNode;
};

function ProjectTable({ rows }: { rows: TableRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ccc]">
      {/* ---------------------------------------------------------------- */}
      {/* PC / Tablet */}
      {/* ---------------------------------------------------------------- */}
      <table className="hidden w-full border-collapse md:table">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#ccc] last:border-b-0">
              <th className="w-[160px] bg-[#f5f5f2] px-5 py-5 text-left align-middle font-sans text-sm font-bold text-[#333] lg:w-[280px] lg:px-20 lg:text-base">
                {row.label}
              </th>

              <td className="px-5 py-5 align-middle font-sans text-sm leading-[1.7] font-normal text-[#333]">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------------------------------------------------------- */}
      {/* SP */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col md:hidden">
        {rows.map((row, i) => (
          <div key={i} className="border-b border-[#ccc] last:border-b-0">
            <div className="bg-[#f5f5f2] px-5 py-4 font-sans text-sm font-bold text-[#333]">
              {row.label}
            </div>

            <div className="bg-white px-5 py-4 font-sans text-sm leading-[1.7] font-normal text-[#333]">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// パスワード認証フォーム
// ----------------------------------------------------------------
function PasswordDialog({
  slug,
  onUnlock,
}: {
  slug: string;
  onUnlock: (work: WorkData) => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError(false);

    try {
      const work = await worksRepository.getWorkBySlugWithPassword(
        slug,
        password,
      );

      if (work) {
        onUnlock(work);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="w-full max-w-[355px] rounded-2xl border border-dashed border-[#e8e8e8] bg-white p-10 text-center md:max-w-[480px]">
        <p className="mb-4 text-4xl">🔒</p>

        <h2 className="mb-2 font-sans text-lg font-bold text-[#003366]">
          Protected Content
        </h2>

        <p className="mb-8 font-sans text-sm text-[#999]">
          この実績の閲覧にはパスワードが必要です。
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full px-10 font-bold shadow-lg transition-transform hover:scale-105"
            >
              パスワードを入力して閲覧
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center font-sans text-[#003366]">
                Authentication
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-6">
              <Input
                type="password"
                placeholder="Enter password..."
                className="py-6 text-center"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              />

              {error && (
                <p className="text-center font-sans text-xs font-bold text-red-500">
                  パスワードが正しくありません。
                </p>
              )}

              <Button
                onClick={handleVerify}
                className="w-full py-6 font-bold"
                disabled={loading}
              >
                {loading ? "認証中..." : "閲覧する"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// メインコンテンツ
// ----------------------------------------------------------------
function WorkContent({
  work,
  categorySlug,
  categoryName,
}: {
  work: WorkData;
  categorySlug: string;
  categoryName: string;
}) {
  const detail = work.acf?.work_detail;

  const title = he.decode(work.title.rendered);

  // 1. バナーカテゴリーかどうかの判定
  const isBanner = categorySlug === "banner";

  // 2. 見出しのテキストを切り替え
  const sectionTitle = isBanner ? "バナー詳細" : "プロジェクト概要";

  const displayImage =
    detail?.next_api_image ||
    work._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const subImages = [
    detail?.sub_image_01,
    detail?.sub_image_02,
    detail?.sub_image_03,
    detail?.sub_image_04,
  ].filter(Boolean) as string[];

  const tableRows: TableRow[] = isBanner
    ? [
        {
          label: "業種",
          value: detail?.industry || "—",
        },
        {
          label: "テイスト",
          value: detail?.taste || "—",
        },
        {
          label: "形状",
          value: detail?.shape || "—",
        },
        {
          label: "配色",
          value: detail?.color_scheme || "—",
        },
        {
          label: "媒体",
          value: detail?.media || "—",
        },
        {
          label: "サイズ",
          value: detail?.size || "—",
        },
        {
          label: "制作期間",
          value: detail?.period || "—",
        },
        {
          label: "担当分野",
          value: detail?.role || "—",
        },
        {
          label: "使用ツール",
          value: detail?.tools_design || "—",
        },
      ]
    : [
        {
          label: "制作期間",
          value: detail?.period || "—",
        },
        {
          label: "担当分野",
          value: detail?.role || "—",
        },
        {
          label: "Design Tools",
          value: detail?.tools_design || "—",
        },
        {
          label: "Coding Tools",
          value: detail?.tools_coding || "—",
        },
        {
          label: "URL",
          value: detail?.site_url ? (
            <a
              href={detail.site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#003366] underline underline-offset-2 transition-colors hover:text-[#F5CA22]"
            >
              {detail.site_url}
              <ExternalLink size={12} />
            </a>
          ) : (
            "非公開"
          ),
        },
      ];

  const articles = [
    {
      heading: "なぜこの制作が必要だったのか",
      body: detail?.background,
    },
    {
      heading: "デザインで意識したこと",
      body: detail?.design_intent,
    },
    {
      heading: "実装で工夫した点",
      body: detail?.creative_logic,
    },
    {
      heading: "振り返りと今後の展望",
      body: detail?.results,
    },
  ].filter((a) => a.body);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={1}
      className="flex w-full flex-col items-center gap-20 rounded-lg border border-[#e8e8e8] bg-white px-5 py-10 md:gap-10 md:rounded-2xl md:border-0 md:px-5 md:py-20 lg:gap-[120px] lg:rounded-2xl lg:border lg:border-[#e8e8e8] lg:px-10"
    >
      {/* タイトル + メイン画像 */}
      <div className="flex w-full flex-col">
        <h2 className="pb-6 text-left font-sans text-lg font-bold text-[#003366] md:pb-10 md:text-2xl">
          {title}
        </h2>

        {displayImage && (
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#d9d9d9] md:aspect-video">
            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 335px, (max-width: 1023px) 688px, 880px"
              priority
            />
          </div>
        )}
      </div>

      {/* プロジェクト概要 */}
      <div className="w-full">
        <SectionHeading text={sectionTitle} />

        <ProjectTable rows={tableRows} />
      </div>
      {!isBanner && (
        <>
          {/* 本文 */}
          <div className="flex w-full flex-col gap-16 md:gap-20">
            {articles.map((article, i) => (
              <motion.article
                key={i}
                className="w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={i}
              >
                <SectionHeading text={article.heading} />

                <p className="text-left font-sans text-sm leading-[1.7] font-normal text-[#444] md:text-base">
                  {article.body}
                </p>
              </motion.article>
            ))}
          </div>

          {/* サブ画像 */}
          {subImages.length > 0 && (
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              {subImages.map((img, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <motion.div
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl bg-[#d9d9d9]"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
                      />

                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <ZoomIn className="h-8 w-8 text-white" />

                        <span className="font-sans text-[10px] font-bold tracking-widest text-white uppercase">
                          View Image
                        </span>
                      </div>
                    </motion.div>
                  </DialogTrigger>

                  <DialogContent className="flex max-h-[95vh] max-w-[95vw] items-center justify-center overflow-hidden border-none bg-transparent p-0 shadow-none">
                    <Image
                      src={img}
                      alt=""
                      width={1200}
                      height={800}
                      className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </>
      )}
      {/* 戻る */}
      <div className="w-full border-t border-[#e8e8e8] pt-10 text-center">
        <Link
          href={`/works/${categorySlug}`}
          className="inline-block rounded-full border border-[#003366] px-10 py-3 font-sans text-sm font-bold text-[#003366] transition-all duration-200 hover:bg-[#003366] hover:text-white"
        >
          {categoryName} の実績一覧へ
        </Link>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------
// エントリーポイント
// ----------------------------------------------------------------
export function WorkDetailContent({
  work: initialWork,
  categorySlug,
  categoryName,
}: {
  work: WorkData;
  categorySlug: string;
  categoryName: string;
}) {
  const [work, setWork] = useState<WorkData | null>(
    initialWork.content.protected ? null : initialWork,
  );

  const isProtected = initialWork.content.protected;

  return (
    <main className="relative flex w-full flex-col items-center bg-[linear-gradient(to_bottom,#fdfbfb,#ebedee)] px-5 pt-[80px] pb-20 md:px-9 md:pt-[100px] lg:px-0 lg:pt-[120px]">
      {/* 背景シェイプ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-0 h-[120px] w-[160px] md:h-[210px] md:w-[280px] lg:h-[300px] lg:w-[400px]"
      >
        <Image
          src="/assets/images/common/main-shape.svg"
          alt=""
          fill
          className="object-cover object-left-top"
        />
      </div>

      {/* パンくず */}
      <div className="relative z-10 w-full">
        <Breadcrumbs
          parent={NAV_PATHS.WORKS}
          category={{
            name: categoryName,
            slug: categorySlug,
          }}
          title={initialWork.title.rendered}
        />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 flex w-[355px] flex-col items-center pt-20 md:w-[728px] lg:w-[960px]">
        {/* カテゴリータイトル */}
        <motion.div
          className="flex w-full flex-col items-center gap-6 pb-20"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <h1 className="text-center font-sans text-2xl font-bold text-[#003366] lg:text-[30px]">
            {categoryName.toUpperCase()}
          </h1>

          <div className="h-1 w-10 bg-[#F5CA22]" />
        </motion.div>

        {/* Protected */}
        {isProtected && !work ? (
          <PasswordDialog
            slug={initialWork.slug}
            onUnlock={(unlockedWork) => setWork(unlockedWork)}
          />
        ) : work ? (
          <WorkContent
            work={work}
            categorySlug={categorySlug}
            categoryName={categoryName}
          />
        ) : null}
      </div>
    </main>
  );
}
