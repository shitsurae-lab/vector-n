"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FluidMaskPrimary } from "../ui/FluidMasks";

interface MainVisualImage {
  src: string;
  subSrc?: string;
  alt: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  date?: string;
}

interface SliderProps {
  images: MainVisualImage[];
}

// テキスト等の登場アニメーション
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export const HeroSlider = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // スライド切り替えタイマー
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[85vh] w-screen overflow-hidden bg-gradient-to-br from-[#f8f6f3] via-[#f3f1ee] to-[#eceae7] md:h-svh">
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 md:px-12">
        {/* --- 🖼️ ビジュアルエリア --- */}
        <div className="main-visual-wrapper relative mx-auto aspect-[4/3] w-full max-w-[1280px] md:aspect-[4/3] lg:aspect-[16/9]">
          {/* ① 背面のさりげない影 (常時ゆったり動かす) */}
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="hero-bg-shape-animated pointer-events-none absolute top-4 -right-4 -bottom-8 left-4 z-0 bg-zinc-400/10 blur-[80px]"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
          />

          {/* ② メイン流体スライダー */}
          <motion.div
            animate={{ scaleY: [1, 1.04, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="main-image-container relative z-10 h-full w-full overflow-hidden"
            style={{
              clipPath: "url(#fluid-mask-mv)",
              transformOrigin: "50% 0%",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`main-${currentIndex}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  priority
                  className="scale-110 object-cover"
                />
                {/* ② 粒レイヤー（画像のすぐ後に配置して、親子関係にする） */}
                <div
                  className="bg-grain pointer-events-none absolute inset-0 z-[999] opacity-[0.4] mix-blend-soft-light"
                  style={{
                    filter: "sepia(20%) brightness(1.1) contrast(110%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ③ サブ縦長楕円 */}
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 10, 0], rotate: [0, 1.5, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="sub-visual-wrapper absolute -right-4 bottom-[-120px] z-40 aspect-square w-[40vw] max-w-[280px] overflow-hidden rounded-full shadow-2xl md:-right-10 md:bottom-[-160px] md:w-[22vw] lg:bottom-[-120px] lg:w-[18vw]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`sub-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex].subSrc || images[currentIndex].src}
                  alt=""
                  fill
                  className="scale-110 object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- 🖋️ テキストレイヤー --- */}
        <div className="pointer-events-none absolute right-0 bottom-[20%] z-30 w-[calc(100%-80px)] sm:bottom-[24%] sm:w-[calc(100%-40px)] md:right-auto md:bottom-[8%] md:left-20 md:w-[calc(100%-160px)]">
          <AnimatePresence mode="wait">
            <motion.div key={`text-${currentIndex}`}>
              <motion.div
                variants={fadeInUp}
                custom={0}
                initial="hidden"
                animate="visible"
                className="mb-4 flex items-center gap-4"
              >
                <div className="pointer-events-none absolute inset-y-0 -left-10 -z-10 w-[200%] bg-gradient-to-r from-[#f8f6f3]/80 via-[#f8f6f3]/40 to-transparent blur-md" />
                <div className="mt-[7px] h-6 w-[1px] bg-zinc-300" />
                <p className="max-w-[240px] font-[family-name:var(--font-mixed)] text-[10px] leading-relaxed tracking-[0.4em] text-zinc-600 uppercase md:max-w-[400px]">
                  {images[currentIndex].subtitle}
                </p>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                custom={1}
                initial="hidden"
                animate="visible"
                className="font-[family-name:var(--font-anton)] text-5xl leading-tight tracking-wider text-zinc-900 uppercase md:text-7xl lg:text-8xl"
              >
                {images[currentIndex].title}
              </motion.h2>

              {images[currentIndex].desc && (
                <motion.p
                  variants={fadeInUp}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  className="mt-10 ml-16 max-w-sm border-l border-zinc-200 pl-6 text-xs leading-relaxed tracking-wider text-zinc-500 md:text-sm"
                >
                  {images[currentIndex].desc}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- 🖱️ Scroll Indicator --- */}
        <div className="absolute right-auto bottom-20 left-8 z-50 flex flex-col items-start gap-4 overflow-hidden sm:bottom-8 md:bottom-24 md:left-0 lg:bottom-12 lg:bottom-40">
          <span
            className="vertical-text font-[family-name:var(--font-michroma)] text-[6px] tracking-[0.2em] text-zinc-400 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            scroll down
          </span>
          <div className="relative h-12 w-[1px] overflow-hidden bg-zinc-200/30">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-zinc-400"
            />
          </div>
        </div>
      </div>

      <FluidMaskPrimary />
    </section>
  );
};
