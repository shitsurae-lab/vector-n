"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ============================================
// Types & Data
// ============================================
interface AboutCardData {
  number: string;
  title: string;
  subtitle: string; // h4 — font-bold、PCと同サイズ
  body: string; // p  — font-normal、PCと同サイズ
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean; // PC・タブレットで画像左右反転
}

const CARDS: AboutCardData[] = [
  {
    number: "01",
    title: "小売業界の経験が今に生きています",
    subtitle:
      "ノンデザイナーが自分で設定・更新できる体制を構築、施策のスピードが向上。",
    body: "店舗マネジメントからECバイヤーまで、小売業界の最前線にいました。そこで叩き込まれたのは「見やすく、選びやすく、買いやすい」という現場感覚。その視点はUIにも生きています。",
    imageSrc: "/assets/images/top/top-experience.webp",
    imageAlt: "小売業界での経験",
    reverse: false,
  },
  {
    number: "02",
    title: "「誰でも更新できる」を設計します",
    subtitle: "コードは書けても、引き継いだ人が途方に暮れるのは素敵じゃない",
    body: "ブロックパターンの設計、管理画面のUI、マニュアルの整備まで――現場担当者が自走できる状態をゴールにしています",
    imageSrc: "/assets/images/top/top-design.webp",
    imageAlt: "更新性の高い設計",
    reverse: true,
  },
  {
    number: "03",
    title: "知らない技術をそのままにしません",
    subtitle: "デザインもプログラミングも知らない技術をそのままにしません。",
    body: "WooCommerce未経験から4ヶ月でサイト構築。現在もReact/Next.jsでTypeScriptでポートフォリオを再構築するなど、AIエージェントを活用して新しい領域に挑戦しています。",
    imageSrc: "/assets/images/top/top-tech.webp",
    imageAlt: "技術への挑戦",
    reverse: false,
  },
];

// ============================================
// Animation Wrapper
// ============================================
function RevealOnScroll({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="flex w-full justify-center"
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Section heading — shared pattern
// ============================================
function SectionHeading({ label }: { label: string }) {
  return (
    <div className="py-20">
      <h2 className="flex_line_heading">{label}</h2>
    </div>
  );
}

// ============================================
// Main Component
// ============================================
export default function AboutSection() {
  return (
    /*
      背景について:
        ① サイト共通グラデーション (globals.css) に乗せる場合 → style属性を削除
        ② Aboutセクション専用色にする場合 → style属性のgradientを差し替え
      現在は ① の共通グラデーションに統一（style属性なし）
    */
    <section id="about" className="w-full py-20 md:py-[120px]">
      {/*
        コンテンツ幅:
          PC:     max-w-[960px] //当初の設定は1140px
          Tablet: max-w-[696px]
          SP:     max-w-[335px]
      */}
      <div className="mx-auto flex w-full flex-col items-center px-5 md:max-w-[696px] md:px-0 lg:max-w-[960px]">
        <SectionHeading label="ABOUT" />

        {/* カードリスト: SP gap-16 / Tab gap-[120px] / PC gap-[160px] */}
        <div className="flex w-full flex-col gap-16 md:gap-[120px] lg:gap-[160px]">
          {CARDS.map((card, i) => (
            <AboutCard key={card.number} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Sub Component: AboutCard
// ============================================
function AboutCard({ card, index }: { card: AboutCardData; index: number }) {
  return (
    <RevealOnScroll delay={index * 0.05}>
      {/*
        カードレイアウト:
          SP:     flex-col、中央揃え
          Tablet: flex-row（reverse考慮）、gap-6
          PC:     flex-row（reverse考慮）、justify-between
        padding:
          SP:     40px 20px
          Tablet: 64px 24px 32px
          PC:     64px 32px 32px
      */}
      <div
        className={[
          "relative w-full border border-[#ebebeb] bg-white",
          "shadow-[2px_2px_4px_0_rgba(171,170,168,0.2)]",
          "flex flex-col items-center", // SP: 縦
          "p-10", // SP: 40px 20px ≒ p-10 px-5
          "px-5",
          "md:flex-row md:items-start md:gap-6", // Tablet: 横
          "md:p-[64px_24px_32px]",
          "lg:justify-between lg:gap-0", // PC: justify-between
          "lg:p-[64px_32px_32px]",
          card.reverse ? "md:flex-row-reverse" : "md:flex-row",
        ].join(" ")}
      >
        {/* ナンバリング
            PC:     88px  color #003366
            Tablet: 64px  color #003366
            SP:     48px  color #333
          */}
        <span
          className={[
            "font-roboto text-ateneo-blue absolute -top-10 right-5 md:right-6 lg:right-8", // SP: 20px, Tab: 24px, PC: 32px
            card.reverse
              ? "md:right-auto md:left-6 lg:right-auto lg:left-8"
              : "", // 02のとき左寄せ
            "block text-[48px] leading-none font-semibold",
            "md:text-[64px] lg:text-[88px]",
            "md:text-ateneo-blue",
          ].join(" ")}
          aria-hidden="true"
        >
          {card.number}
        </span>
        {/* ── テキストエリア ── */}
        <div className="flex w-full flex-col gap-6 md:max-w-[384px] md:gap-5 lg:max-w-[524px] lg:gap-10">
          {/* タイトル + マーカー */}
          <h3 className="heading_marker">{card.title}</h3>

          {/* サブタイトル(h4) + 本文(p)
            フォントサイズ: Tab/SP 14px / PC 16px
            font-weight: h4 = bold / p = normal
            どちらも #333、line-height 1.7
          */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[14px] leading-[1.7] font-bold text-[#333] lg:text-[16px]">
              {card.subtitle}
            </h4>
            <p className="text-[14px] leading-[1.7] font-normal text-[#333] lg:text-[16px]">
              {card.body}
            </p>
          </div>
        </div>
        {/* /テキストエリア */}

        {/* ── 画像エリア ──
          PC:     300×300px
          Tablet: 280×280px
          SP:     295×295px、上マージン 32px
        */}
        <div className="relative mt-8 h-[295px] w-[295px] shrink-0 md:mt-0 md:h-[280px] md:w-[280px] lg:h-[300px] lg:w-[300px]">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 767px) 295px, (max-width: 1365px) 280px, 300px"
          />
        </div>
      </div>
    </RevealOnScroll>
  );
}
