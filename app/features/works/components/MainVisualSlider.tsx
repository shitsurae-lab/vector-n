"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MainVisualImage {
  src: string;
  subSrc?: string;
  alt: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  date?: string; // 💡 追加
}

interface SliderProps {
  images: MainVisualImage[];
}

export const MainVisualSlider = ({ images }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. スライド切り替えタイマー
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  // 2. アニメーション制御
  useGSAP(() => {
    if (!images || images.length === 0 || !containerRef.current) return;

    const container = containerRef.current;

    // --- A. スクロール指示器の無限ループ (独立動作) ---
    gsap.fromTo(
      ".animate-scroll-line-inner",
      { y: "-100%" },
      { y: "100%", duration: 1.5, repeat: -1, ease: "power1.inOut" },
    );

    // --- B. スライドのアニメーション ---
    gsap.set(".slide-item, .sub-slide-item", { opacity: 0, zIndex: 0 });
    const activeSlide = container.querySelector(`.slide-${currentIndex}`);
    const activeSubSlide = container.querySelector(
      `.sub-slide-${currentIndex}`,
    );
    const activeTextElements = container.querySelectorAll(
      `.text-${currentIndex}`,
    );
    const activeMeta = container.querySelector(`.meta-${currentIndex}`);

    if (activeSlide && activeSubSlide) {
      const tl = gsap.timeline();
      gsap.set([activeSlide, activeSubSlide], { zIndex: 10 });

      tl.fromTo(
        [activeSlide, activeSubSlide],
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out", delay: 0.3 },
      ).fromTo(
        [activeTextElements, activeMeta],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=1",
      );
    }
  }, [currentIndex, images]);

  if (!images || images.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[85vh] w-screen overflow-hidden bg-[#f3f1ee] md:h-svh"
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 md:px-12">
        {/* --- 🖼️ ビジュアルエリア --- */}
        <div className="relative aspect-[4/3] w-full max-w-[1200px] md:aspect-[16/9]">
          {/* ① 背面のさりげない影 */}
          <div
            className="hero-bg-shape absolute inset-0 translate-x-6 translate-y-6 scale-[1.02] bg-zinc-300/10 blur-[20px]"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
          />

          {/* ② メイン流体スライダー */}
          <div
            className="relative z-10 h-full w-full overflow-hidden shadow-2xl"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`slide-item absolute inset-0 slide-${index}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* ③ サブ縦長楕円（セクション跨ぎ） */}
          <div className="sub-visual-wrapper absolute right-2 bottom-[-140px] z-40 aspect-[3/4] w-[35vw] max-w-[280px] overflow-hidden rounded-[200px] shadow-2xl md:bottom-[-160px] md:w-[24vw] lg:bottom-[-120px] lg:w-[18vw]">
            {images.map((image, index) => (
              <div
                key={`sub-${index}`}
                className={`sub-slide-item absolute inset-0 sub-slide-${index}`}
              >
                <Image
                  src={image.subSrc || image.src}
                  alt=""
                  fill
                  className="scale-110 object-cover"
                />
              </div>
            ))}
          </div>

          {/* ④ 動的メタデータ */}
          {/* <div className='absolute top-0 left-0 z-30 pt-10 pl-4 md:pl-0 space-y-1 font-mono'>
            {images.map((image, index) => (
              <div key={`meta-${index}`} className={`meta-${index} opacity-0`}>
                <p className='text-[9px] tracking-[0.2em] text-zinc-400 uppercase'>
                  CASE_0{index + 1} /{' '}
                  {image.date
                    ? new Date(image.date).getFullYear()
                    : new Date().getFullYear()}
                </p>
                <p className='text-[9px] tracking-[0.2em] text-zinc-400'>
                  35.6895° N
                </p>
              </div>
            ))}
          </div> */}
        </div>

        {/* --- 🖋️ テキストレイヤー --- */}
        <div className="pointer-events-none absolute right-0 bottom-[10%] z-30 w-[calc(100%-100px)] sm:bottom-[24%] sm:w-[calc(100%-40px)] md:right-auto md:bottom-[12%] md:left-20 md:w-[calc(100%-160px)]">
          {images.map((image, index) => (
            <div
              key={`text-group-${index}`}
              className={index === currentIndex ? "block" : "hidden"}
            >
              <div className={`text-${index} mb-4 flex items-center gap-4`}>
                <div className="h-[1px] w-12 bg-zinc-300" />
                <p className="font-[family-name:var(--font-mixed)] text-[10px] tracking-[0.3em] text-zinc-500 uppercase md:text-xs">
                  {image.subtitle}
                </p>
              </div>
              <h2
                className={`text-${index} font-[family-name:var(--font-anton)] text-5xl leading-tight tracking-wider text-zinc-900 uppercase md:text-7xl lg:text-8xl`}
              >
                {image.title}
              </h2>
              {image.desc && (
                <p
                  className={`text-${index} mt-10 ml-16 max-w-sm border-l border-zinc-200 pl-6 text-xs leading-relaxed tracking-wider text-zinc-500 md:text-sm`}
                >
                  {image.desc}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* --- 🖱️ Scroll Indicator --- */}
        <div className="absolute right-auto bottom-24 left-8 z-50 flex flex-col items-end gap-4 overflow-hidden sm:bottom-8 md:right-12 md:bottom-40 md:left-auto md:items-start lg:bottom-12">
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

      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="fluid-mask-mv" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.00105, 0.00155)"
              d="M119.624 588C14.1239 497.646 -37.8762 170 31.6616 0H824.124C920.624 25.5 950.124 90 950.124 146C950.124 226 880.942 337.14 726.162 389C653.624 413.304 539.124 529.5 457.124 588C353.124 662.195 202.624 659.084 119.624 588Z"
            />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};
