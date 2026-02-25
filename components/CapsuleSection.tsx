"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type CapsuleItem = {
  id: string;
  enTitle: string;
  jaTitle: string;
  image: string;
};

export const CapsuleSection = ({ items }: { items: CapsuleItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!items?.length || !containerRef.current) return;

      // 1. 初期状態をGSAPで一括セット（CSSのopacity-0等に頼りすぎない）
      gsap.set(".animate-target", { opacity: 0, y: 40 });

      // Timelineを作成して、順番（ステージ）を管理
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%", // 画面の70%位置で開始
          once: true, // 1回だけ実行
        },
      });

      tl.to(".animate-target", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.15, // 👈 これで H2 -> P -> Button -> LI が順番に動く
      });
    },
    { scope: containerRef, dependencies: [items] },
  );

  return (
    <section
      ref={containerRef}
      className="100svh relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen overflow-hidden pt-20"
    >
      <div className="min-h-[80vh] rounded-[50vw_50vw_0_0] bg-[#f3f1ee] py-[10vh]">
        <div className="mx-auto max-w-5xl px-6 pt-10">
          {/* opacity-0 と translate-y-8 で初期状態を隠す */}
          <div className="mb-12 flex flex-col items-center">
            {/* 英語メイン: Michromaで「設計」の精密さを表現 */}
            <h2 className="animate-target mb-2 translate-y-8 font-[family-name:var(--font-michroma)] text-3xl font-bold tracking-[0.5em] text-zinc-800 uppercase opacity-0 md:text-4xl">
              about
            </h2>

            {/* 日本語サブ: 意味を補完し、視線を本文へ繋ぐ */}
            <div className="animate-target flex translate-y-8 items-center gap-3 opacity-0">
              <span className="h-[1px] w-4 bg-zinc-400" />
              <p className="font-[family-name:var(--font-mixed)] text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase md:text-xs">
                Creative Philosophy
              </p>
              <span className="h-[1px] w-4 bg-zinc-400" />
            </div>
          </div>
          {/* 4. Button (shadcn/ui) */}
          <div className="animate-target mb-10 text-center">
            <Button
              asChild
              className="rounded-full border-none bg-zinc-900 px-8 py-6 text-white transition-all hover:bg-zinc-700 hover:text-white"
            >
              <Link href="/about">View More About</Link>
            </Button>
          </div>

          <ul
            className="no-scrollbar flex snap-x snap-mandatory justify-start gap-8 overflow-x-auto px-[10vw] pt-3 md:justify-center md:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="animate-target w-[70%] flex-none translate-y-10 snap-center opacity-0 md:w-[28%]"
              >
                <div className="group relative aspect-[2/3] overflow-hidden rounded-full border border-black/5 bg-slate-200 shadow-sm transition-transform duration-500 hover:-translate-y-3">
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
