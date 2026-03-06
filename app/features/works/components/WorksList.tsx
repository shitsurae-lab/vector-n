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
            >
              <Link
                href={`/works/${category}/${work.slug}`}
                className="group block h-full no-underline"
              >
                <Card className="flex h-full flex-col overflow-hidden bg-[#faf9f7] pt-0 transition-shadow hover:shadow-md">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={altText}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover transition-transform duration-500 hover:scale-105 ${isProtected ? "blur-[0.5px]" : ""}`}
                        style={{
                          // サムネイルの青みを抑え、温かみを加える
                          filter: "sepia(5%) brightness(1.02) contrast(102%)",
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="bg-grain pointer-events-none absolute inset-0 z-10 opacity-[0.08] mix-blend-soft-light" />
                  </div>

                  <CardHeader className="p-4 pb-2">
                    <div className="mb-1 text-xs text-gray-500">
                      {formattedDate}
                    </div>
                    <CardTitle className="text-lg text-[#2a2723] transition-all duration-500 group-hover:translate-x-1 group-hover:text-zinc-500">
                      {/* <Link
                      href={`/works/${category}/${work.slug}`}
                      className="hover:underline"
                    > */}
                      {he.decode(work.title.rendered)}
                      {/* </Link> */}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="grow p-4 pt-0">
                    <div className="line-clamp-3 text-sm text-gray-600">
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

                  <CardFooter className="p-4 pt-0">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase transition-colors duration-500 group-hover:text-[#2a2723]">
                      <span>
                        {isProtected ? "View with Password" : "Read More"}
                      </span>
                      <motion.span
                        variants={{
                          hidden: { x: 0 },
                          visible: { x: 5 },
                        }}
                        transition={{ duration: 0.3 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.section>
  );
};
