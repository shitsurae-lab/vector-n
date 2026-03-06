"use client";
import { useRef, useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CapsuleItem = {
  id: string;
  enTitle: string;
  jaTitle: string;
  image: string;
};

export const CapsuleSection = ({ items }: { items: CapsuleItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  return (
    <section ref={containerRef} className="relative w-full">
      {/*
    背景を absolute ではなく、コンテンツを包む「器」として配置。
    w-[150vw] で左右に突き抜けさせ、rounded で上部を丸めます。
  */}
      <div className="relative left-1/2 w-[120vw] -translate-x-1/2 overflow-hidden rounded-[100%_100%_0_0] bg-gradient-to-b from-[#f3f1ee] to-[#e5e2de] py-32 shadow-[0_-20px_60px_-20px_rgba(100,90,80,0.05)] md:py-48">
        <div
          className="bg-grain pointer-events-none absolute inset-0 z-0 opacity-[0.18] mix-blend-soft-light"
          style={{
            filter: "sepia(10%) brightness(1.11) contrast(110%)",
            // 親の rounded を引き継ぐために一応指定（overflow-hiddenがあれば不要ですが念のため）
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          {/* --- タイトルエリア(Scroll発火)---  */}
          <motion.div
            className="mb-14 flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-2 font-[family-name:var(--font-michroma)] text-3xl font-bold tracking-[0.35em] text-zinc-800 uppercase md:text-4xl">
              about
            </h2>

            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="h-[1px] w-4 bg-zinc-400" />
              <p className="font-[family-name:var(--font-mixed)] text-[10px] font-medium tracking-[0.25em] text-zinc-400 uppercase md:text-xs">
                Creative Philosophy
              </p>
              <span className="h-[1px] w-4 bg-zinc-400" />
            </div>

            <p className="max-w-2xl px-4 text-sm leading-relaxed tracking-[0.06em] text-zinc-600 md:text-base">
              デザインと実装、その先にある「運用」までを設計する。
              <br className="hidden md:block" />
              見た目の美しさだけでなく、更新する人、使う人、
              <br className="hidden md:block" />
              育てていく人のことまで考える。
            </p>
          </motion.div>
          <ul
            className="no-scrollbar mt-14 mb-24 flex snap-x snap-mandatory justify-start gap-8 overflow-x-auto px-[10vw] md:justify-between md:gap-0 md:overflow-x-visible md:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                className="w-[70%] flex-none snap-center md:w-[28%]"
                onClick={() =>
                  setActiveCard(activeCard === item.id ? null : item.id)
                }
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                  opacity: 1, // 透明度を1にし、登場
                  // y: [0, -20, 0],
                }}
                animate={{
                  y: activeCard === item.id ? 0 : [0, -20, 0],
                }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  opacity: {
                    duration: 1.2,
                    delay: 0.4 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  y: {
                    duration: 6 + i,
                    repeat: Infinity, //無限に繰り返す
                    ease: "easeInOut",
                    delay: 0.4 + i * 0.15,
                  },
                  // rotate: {
                  //   duration: 8,
                  //   repeat: Infinity,
                  //   ease: "easeInOut",
                  // },
                }}
              >
                <div className="group relative aspect-[2/3] overflow-hidden rounded-[40px] border border-black/5 bg-slate-200 shadow-sm transition-transform duration-500 hover:-translate-y-3">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.enTitle}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[14px] font-bold tracking-[0.3em] text-gray-400">
                        {item.enTitle}
                      </span>
                    </div>
                  )}
                  {/* ホバー時のオーバーレイ */}
                  {/* ホバー時のテキスト表示 */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="mb-2 text-xs tracking-widest uppercase">
                      {item.enTitle}
                    </span>
                    <span className="text-[12px] opacity-80">
                      {item.jaTitle}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          {/*  Button (shadcn/ui: Scroll発火 + stagger風のdelay) */}
          <motion.div
            className="animate-target mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              asChild
              className="rounded-full border-none bg-zinc-900 px-8 py-6 text-white transition-all hover:bg-zinc-700 hover:text-white"
            >
              <Link href="/about">View More About</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
