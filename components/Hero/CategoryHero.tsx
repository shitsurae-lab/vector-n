"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FluidMaskPrimary } from "../ui/FluidMasks";

type HeroProps = {
  src: string;
  subSrc?: string;
  title: string;
  subtitle?: string;
  desc?: string;
  alt: string;
  date?: string;
};

// 登場時のふわっとしたアニメーション設定
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2 + i * 0.15, // オープニング後の発火を想定して少し遅延
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export const CategoryHero = ({
  src,
  subSrc,
  title,
  subtitle,
  desc,
  alt,
}: HeroProps) => {
  return (
    <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[80svh] max-h-[900px] w-screen overflow-hidden bg-gradient-to-b from-[#eceae7] via-[#f8f6f3] to-[#f8f6f3] md:h-[70vh] lg:h-svh">
      <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col px-6 md:px-12">
        {/* ---  メインビジュアルエリア --- */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="main-visual-wrapper relative mr-auto ml-0 aspect-[4/3] w-full md:aspect-[4/3] lg:aspect-[16/9] lg:max-w-[80vw] xl:max-w-[1080px]"
        >
          {/* ① 背面のゆらゆら動く影 (生命感) */}
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="hero-bg-shape-animated pointer-events-none absolute top-4 -right-4 -bottom-8 left-4 z-0 bg-zinc-400/10 blur-[80px]"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
          />

          {/* ② 🖼️メイン画像 (マスク/アニメーション) */}
          <motion.div
            animate={{ scaleY: [1, 1.03, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="main-mask-container relative z-10 h-full w-full overflow-hidden"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="scale-110 object-cover"
              sizes="100vw"
            />
            <div
              className="bg-grain pointer-events-none absolute inset-0 z-[999] opacity-[0.4] mix-blend-soft-light"
              style={{
                filter: "sepia(20%) brightness(1.1) contrast(110%)",
              }}
            />
          </motion.div>

          {/* ③ サブ画像 (ふわふわ浮遊感) */}
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 10, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="sub-visual-wrapper absolute -right-4 -bottom-30 z-40 aspect-square w-[40vw] max-w-[280px] overflow-hidden rounded-full shadow-2xl md:-right-6 md:-bottom-20 md:w-[22vw] lg:-right-2 lg:-bottom-15 lg:w-[18vw]"
          >
            <Image
              src={subSrc || src}
              alt=""
              fill
              className="scale-110 object-cover"
              sizes="(max-width: 768px) 40vw, 20vw"
            />
          </motion.div>
        </motion.div>

        {/* --- 🖋️ テキストレイヤー --- */}
        <div className="absolute bottom-[20%] left-6 z-30 w-[calc(100%-80px)] sm:bottom-[24%] sm:w-[calc(100%-40px)] md:right-auto md:bottom-[8%] md:left-20 md:w-[calc(100%-160px)]">
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
              {subtitle}
            </p>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="font-[family-name:var(--font-anton)] text-5xl leading-tight tracking-wider text-[#2a2723] uppercase md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h1>

          {desc && (
            <motion.p
              variants={fadeInUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="mt-10 ml-16 max-w-sm border-l border-zinc-200 pl-6 text-xs leading-relaxed tracking-wider text-zinc-500 md:text-sm"
            >
              {desc}
            </motion.p>
          )}
        </div>
      </div>
      <FluidMaskPrimary />
      {/* --- 🖱️ Scroll Indicator --- */}
      <div className="absolute right-6 bottom-10 left-auto z-50 flex flex-col items-end gap-4 overflow-hidden sm:bottom-8 md:right-6 md:bottom-10 lg:right-6 lg:bottom-12 lg:bottom-40 xl:right-6">
        <span
          className="vertical-text font-[family-name:var(--font-michroma)] text-[8px] tracking-[0.2em] text-zinc-400 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          scroll down
        </span>
        <div className="relative h-20 w-[1px] overflow-hidden bg-zinc-200/30">
          {/* スクロールラインのアニメーション */}
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-zinc-400"
          />
        </div>
      </div>
      {/* --- END 🖱️ Scroll Indicator --- */}
    </section>
  );
};
