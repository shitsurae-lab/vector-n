"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FluidMaskPrimary } from "../ui/FluidMasks"; // 共通マスク

type HeroProps = {
  src: string;
  subSrc?: string;
  title: string;
  subtitle?: string;
  desc?: string;
  alt: string;
  date?: string;
};

export const CategoryHero = ({
  src,
  subSrc,
  title,
  subtitle,
  desc,
  alt,
}: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // --- A. 常時の「生命感」アニメーション (HeroSliderと共通) ---
      gsap.to(".main-mask-container", {
        scaleY: 1.03,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 0%",
      });

      gsap.to(".hero-bg-shape-animated", {
        y: 20,
        x: 10,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".sub-visual-wrapper", {
        y: -25,
        x: 10,
        rotation: 1.5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // --- B. 登場時のアニメーション ---
      const tl = gsap.timeline();
      tl.fromTo(
        ".main-visual-wrapper",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.8, ease: "power4.out" },
      ).fromTo(
        ".animate-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=1.2",
      );

      // Scroll line
      gsap.fromTo(
        ".animate-scroll-line-inner",
        { y: "-100%" },
        { y: "100%", duration: 1.5, repeat: -1, ease: "power1.inOut" },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[85vh] w-screen overflow-hidden bg-gradient-to-br from-[#f8f6f3] via-[#f3f1ee] to-[#eceae7] md:h-svh"
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 md:px-12">
        {/* --- 🖼️ ビジュアルエリア：HeroSliderと構造を統一 --- */}
        <div className="main-visual-wrapper relative mx-auto aspect-[4/3] w-full max-w-[1280px] md:aspect-[4/3] lg:aspect-[16/9]">
          {/* ① 背面のゆらゆら動く影 */}
          <div
            className="hero-bg-shape-animated pointer-events-none absolute top-4 -right-4 -bottom-8 left-4 z-0 bg-zinc-400/10 blur-[80px]"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
          />

          {/* ② メイン画像 */}
          <div
            className="main-mask-container relative z-10 h-full w-full overflow-hidden"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="scale-110 object-cover"
            />
          </div>

          {/* ③ サブ画像 */}
          <div className="sub-visual-wrapper absolute -right-4 bottom-[-120px] z-40 aspect-square w-[40vw] max-w-[280px] overflow-hidden rounded-full shadow-2xl md:-right-10 md:bottom-[-160px] md:w-[22vw] lg:bottom-[-120px] lg:w-[18vw]">
            <Image
              src={subSrc || src}
              alt=""
              fill
              className="scale-110 object-cover"
            />
          </div>
        </div>

        {/* --- 🖋️ テキストレイヤー --- */}
        <div className="absolute right-0 bottom-[10%] z-30 w-[calc(100%-80px)] sm:bottom-[24%] sm:w-[calc(100%-40px)] md:right-auto md:bottom-[8%] md:left-20 md:w-[calc(100%-160px)]">
          <div className="animate-text mb-4 flex items-center gap-4">
            <div className="pointer-events-none absolute inset-y-0 -left-10 -z-10 w-[200%] bg-gradient-to-r from-[#f8f6f3]/80 via-[#f8f6f3]/40 to-transparent blur-md" />
            <div className="mt-[7px] h-6 w-[1px] bg-zinc-300" />
            <p className="max-w-[240px] font-[family-name:var(--font-mixed)] text-[9px] text-[10px] leading-relaxed tracking-[0.4em] text-zinc-600 uppercase md:max-w-[400px] md:text-[10px]">
              {subtitle}
            </p>
          </div>

          <h1 className="animate-text font-[family-name:var(--font-anton)] text-5xl leading-tight tracking-wider text-zinc-900 uppercase md:text-7xl lg:text-8xl">
            {title}
          </h1>

          {desc && (
            <p className="animate-text mt-10 ml-16 max-w-sm border-l border-zinc-200 pl-6 text-xs leading-relaxed tracking-wider text-zinc-500 md:text-sm">
              {desc}
            </p>
          )}
        </div>

        {/* --- 🖱️ Scroll Indicator --- */}
        <div className="absolute right-auto bottom-24 left-8 z-50 flex flex-col items-start gap-4 overflow-hidden sm:bottom-8 md:bottom-40 md:left-0 lg:bottom-12">
          <span
            className="vertical-text font-[family-name:var(--font-michroma)] text-[6px] tracking-[0.2em] text-zinc-400 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            scroll down
          </span>
          <div className="relative h-12 w-[1px] overflow-hidden bg-zinc-200/30">
            <div className="animate-scroll-line-inner absolute inset-0 bg-zinc-400" />
          </div>
        </div>
      </div>

      <FluidMaskPrimary />
    </section>
  );
};
