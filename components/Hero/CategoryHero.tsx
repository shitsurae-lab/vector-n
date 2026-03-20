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
//共通設定
const easeCustom = [0.22, 1, 0.36, 1] as const;
// 登場時のふわっとしたアニメーション設定
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2 + i * 0.15, // オープニング後の発火を想定して少し遅延
      duration: 1,
      ease: easeCustom,
    },
  }),
};

// 親コンテナ：子要素のアニメーション開始を管理
export const revealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4, // 各要素（帯、文字、座布団）を0.4秒ずらしで発火
    },
  },
};

// ① 最初の「リビール帯」：左から伸びて、右へハケる
export const initialBar: Variants = {
  hidden: { left: "0%", width: "0%" },
  visible: {
    // 伸びて(0.4s) → そのまま右へ消える(0.4s) = 計0.8sの動き
    left: ["0%", "0%", "100%"],
    width: ["0%", "100%", "0%"],
    transition: {
      duration: 0.8,
      times: [0, 0.5, 1], // 各状態の時間配分
      ease: easeCustom,
    },
  },
};

// ② 土台の文字：帯がハケた後に「スッ」と現れる
export const baseText: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.8, // 帯(0.8s)が消えた直後に発火
      ease: easeCustom,
    },
  },
};

// ③ 座布団：文字が出た後に、さらに一呼吸置いてから敷かれる
export const cushion: Variants = {
  hidden: { width: "0%" },
  visible: {
    width: "100%",
    transition: {
      duration: 0.8,
      delay: 1.4, // 帯(0.8s) + 文字(0.6s) = 1.4s 後に発火
      ease: easeCustom,
    },
  },
};
// メインタイトル用：座布団なし。帯が走るのとほぼ同時に文字がリビール
export const mainTitleVariants = {
  bar: {
    hidden: { left: "0%", width: "0%" },
    visible: {
      left: ["0%", "0%", "100%"],
      width: ["0%", "100%", "0%"],
      transition: {
        duration: 0.8,
        delay: 1.7,
        times: [0, 0.5, 1],
        ease: easeCustom,
      }, // サブタイトル完了後に発火
    },
  },
  text: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, delay: 2.1, ease: easeCustom }, // 帯が伸びた瞬間に文字を出す
    },
  },
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
          {/* --- Subtitle Area --- */}
          <motion.div
            variants={revealContainer}
            initial="hidden"
            animate="visible"
            className="relative mb-2 w-fit max-w-full overflow-hidden" // w-fit かつ max-w-full にすることで、短い時は文字幅、長い時は親の幅
          >
            {/* ① 土台の文字（余白をここで作る） */}
            <motion.p
              variants={baseText}
              className="px-2 py-1 font-[family-name:var(--font-mixed)] text-xs leading-[1.8] tracking-[0.4em] text-zinc-600 uppercase"
            >
              {subtitle}
            </motion.p>

            {/* ② 通り過ぎる帯（inset-0で土台を完全に覆う） */}
            <motion.div
              variants={initialBar}
              className="absolute inset-0 z-20 bg-[#363f51]"
            />

            {/* ③ 座布団と白文字 */}
            <motion.div
              variants={cushion}
              className="absolute inset-0 z-30 overflow-hidden bg-[#363f51]"
            >
              {/* 土台と全く同じフォント設定・パディングにするのがコツ */}
              <p className="w-full px-2 py-1 font-[family-name:var(--font-mixed)] text-xs leading-[1.8] tracking-[0.4em] wrap-break-word text-white uppercase md:w-max md:whitespace-nowrap">
                {subtitle}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            animate="visible"
            className="relative w-fit max-w-full overflow-hidden"
          >
            <motion.h1
              variants={mainTitleVariants.text}
              custom={1}
              initial="hidden"
              animate="visible"
              className="font-[family-name:var(--font-anton)] text-5xl leading-[1.1] tracking-wider wrap-break-word text-[#363f51] uppercase md:text-7xl lg:text-8xl"
            >
              {title}
            </motion.h1>
            <motion.div
              variants={mainTitleVariants.bar}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 z-20 bg-[#363f51]"
            />
          </motion.div>
          {/*
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
          )} */}
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
