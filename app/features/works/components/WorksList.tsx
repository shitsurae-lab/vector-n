"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import he from "he";
import { WorkData } from "../api/works";

type WorkListProps = {
  works: WorkData[];
  category: string;
  categoryDesc?: string; // カテゴリーの説明文を受け取れるように追加
};

// 親（section全体）のアニメーション設定
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4, // Heroの余韻を待つ
      staggerChildren: 0.1, // タイトル、説明文、カードの順で出す
    },
  },
};

// 共通のふわっと浮き上がる設定
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const WorksList = ({ works, category, categoryDesc }: WorkListProps) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col gap-10 md:gap-20"
    >
      {/* --- 🖋️ タイトル・説明文エリア --- */}
      <div className="flex flex-col items-center py-10">
        <motion.h2
          variants={itemVariants}
          className="mb-8 text-center font-[family-name:var(--font-michroma)] text-2xl font-bold tracking-[0.5em] text-[#2a2723] uppercase md:mb-12 md:text-3xl"
        >
          {category}
        </motion.h2>

        {categoryDesc && (
          <motion.p
            variants={itemVariants}
            className="word-break-loose max-w-prose text-center font-[family-name:var(--font-mixed)] text-sm leading-relaxed font-light tracking-widest break-keep text-zinc-500 md:text-base"
          >
            {categoryDesc}
          </motion.p>
        )}
      </div>

      {/* --- 🖼️ カードリストエリア (ul) --- */}
      <motion.ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => {
          const isProtected = work.content.protected;
          const thumbnail =
            work.acf?.next_api_image ||
            work._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const altText =
            work._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
            he.decode(work.title.rendered);
          const formattedDate = new Date(work.date)
            .toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, ".");

          return (
            <motion.li
              key={work.id}
              variants={itemVariants}
              className="list-none"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ willChange: "transform" }}
            >
              <Link
                href={`/works/${category}/${work.slug}`}
                className="group block h-full no-underline"
              >
                <Card className="flex h-full transform-gpu flex-col overflow-hidden border-none bg-[#faf9f7] p-0 ring-1 ring-transparent transition-all hover:shadow-xl hover:ring-[#2a2723]/10">
                  {/* 1. 画像エリア：Card(p-0)の直下に置くことで隙間を排除 */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={altText}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${isProtected ? "blur-[0.5px]" : ""}`}
                        style={{
                          filter: "sepia(5%) brightness(1.02) contrast(102%)",
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    {/* グレインエフェクト */}
                    <div className="bg-grain pointer-events-none absolute inset-0 z-10 opacity-[0.08] mix-blend-soft-light" />
                  </div>

                  {/* 2. テキストコンテンツエリア：px-5 pb-6 で全体の余白を定義 */}
                  <div className="flex flex-grow flex-col px-5 pb-6">
                    <CardHeader className="mb-2 p-0">
                      <div className="mb-1 text-[10px] font-medium tracking-wider text-gray-400">
                        {formattedDate}
                      </div>
                      <CardTitle className="text-lg leading-snug text-[#363f51] transition-colors duration-300 group-hover:text-zinc-500">
                        {he.decode(work.title.rendered)}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow p-0">
                      <div className="line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-gray-600">
                        {isProtected ? (
                          <p>この投稿はパスワードで保護されています</p>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: work.excerpt.rendered,
                            }}
                          />
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="mt-4 p-0">
                      <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase transition-all duration-300 group-hover:text-[#2a2723]">
                        <span>
                          {isProtected ? "View with Password" : "Read More"}
                        </span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.section>
  );
};
