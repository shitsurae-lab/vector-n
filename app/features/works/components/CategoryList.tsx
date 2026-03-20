"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// ★ work.ts から定義済みの型をインポート
import { Category } from "../api/works";

// 親（section全体）のアニメーション設定
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4, // Heroの余韻を待つ
      staggerChildren: 0.15, // タイトル、サブタイトル、カードの順で出す
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

export const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col gap-10 md:gap-16"
    >
      {/* --- アニメーションするタイトルエリア --- */}
      <div className="flex flex-col items-center">
        <motion.p
          variants={itemVariants}
          className="mb-2 text-center font-[family-name:var(--font-mixed)] text-xs font-bold text-zinc-400"
        >
          カテゴリー
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="mb-6 text-center font-[family-name:var(--font-michroma)] text-2xl font-bold tracking-[0.5em] text-[#2a2723] uppercase md:text-3xl"
        >
          Categories
        </motion.h2>
      </div>

      {/* --- カードリストエリア --- */}
      <motion.ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <motion.li key={cat.id} variants={itemVariants} className="list-none">
            <Link
              href={`/works/${cat.slug}`}
              className="group block h-full no-underline"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                // チラつき防止用のスタイル
                style={{ willChange: "transform" }}
              >
                <Card className="group h-full transform-gpu overflow-hidden border-none bg-[#faf9f7] pt-0 ring-1 ring-transparent transition-all transition-shadow group-hover:ring-[#2a2723]/10 hover:shadow-xl">
                  {/* 画像エリア */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    {cat.acf?.next_image && (
                      <Image
                        src={cat.acf.next_image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{
                          filter: "sepia(5%) brightness(1.02) contrast(102%)",
                        }}
                      />
                    )}
                  </div>

                  {/* テキストエリア：paddingのバランスを調整 */}
                  <div className="relative px-5 py-4">
                    <CardHeader className="mb-2 p-0">
                      <CardTitle className="text-xl text-[#363f51] transition-colors duration-300 group-hover:text-zinc-500">
                        {cat.acf?.term_title || cat.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pb-6">
                      <p className="line-clamp-2 min-h-[2.8rem] text-sm leading-relaxed text-zinc-500">
                        {cat.acf?.term_desc || cat.description}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};
