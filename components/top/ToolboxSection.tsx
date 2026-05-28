"use client";

import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

// ============================================
// Types
// ============================================
interface ToolboxItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

// ============================================
// Data
// ============================================
const TOOLBOX_ITEMS: ToolboxItem[] = [
  {
    id: "design",
    title: "デザイン",
    description:
      "Figmaでプロトタイプを作成し、ムードボードで方向性に沿ってコーディングに活かしています。",
    imageSrc: "/assets/images/top/toolbox/design.webp",
    imageAlt: "デザイン",
  },
  {
    id: "frontend",
    title: "フロントエンド",
    description:
      "React / Next.js / TypeScriptでポートフォリオをフルデプロイ。Framer Motion・Lottie・shadcn/uiを活用し、実装レベルの環境構築とパフォーマンス最適化を実現しています。",
    imageSrc: "/assets/images/top/toolbox/frontend.webp",
    imageAlt: "フロントエンド",
  },
  {
    id: "wordpress",
    title: "WordPress",
    description:
      "プラグイン開発からスクラッチ構築まで。独自テーマはブロックエディタ対応、カスタム投稿タイプやACFを使った管理しやすい設計を心がけています。",
    imageSrc: "/assets/images/top/toolbox/wordpress.webp",
    imageAlt: "WordPress",
  },
  {
    id: "backend",
    title: "バックエンド・インフラ",
    description:
      "Laravel API・Docker Compose・MySQL・Nginxを組み合わせたフルスタック環境を構築。AIエージェントを活用しながら、試証・ストレージ運用・デプロイまで対応しています。",
    imageSrc: "/assets/images/top/toolbox/backend.webp",
    imageAlt: "バックエンド・インフラ",
  },
  {
    id: "cicd",
    title: "デプロイ・CI/CD",
    description:
      "Vercel（Frontend）・Railway（Backend）・Cloudflare（Storage）を組み合わせた全工程を構築。GitHub連携による自動デプロイも常時実施。",
    imageSrc: "/assets/images/top/toolbox/deploy.webp",
    imageAlt: "デプロイ・CI/CD",
  },
  {
    id: "project",
    title: "プロジェクト管理",
    description:
      "Notionでタスク・進捗共有、関係者全員が把握できる透明度の高いプロジェクト運営を心がけています。",
    imageSrc: "/assets/images/top/toolbox/project.webp",
    imageAlt: "プロジェクト管理",
  },
];

// ============================================
// Animation variants
// ============================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ============================================
// Section heading (About・Works と共通パターン)
// ============================================
function SectionHeading({ label }: { label: string }) {
  return (
    <div className="py-20">
      <h2 className="flex_line_heading">{label}</h2>
    </div>
  );
}

// ============================================
// Toolbox card
// ============================================
function ToolboxCard({ item, delay }: { item: ToolboxItem; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      className="flex flex-col items-stretch overflow-hidden rounded-[10px] border border-[#abaaa8]/50 bg-white shadow-[2px_2px_4px_0_rgba(171,170,168,0.2)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)] lg:rounded-[8px]"
    >
      {/* 画像
        PC:  300×226px → aspect-ratio 300/226
        Tab: 330×204px → aspect-ratio 330/204
        SP:  335×206px → aspect-ratio 335/206
        ※ 近似値なので aspect-[300/226] を基準に breakpoint で切り替え
      */}
      <div className="relative aspect-[335/206] w-full overflow-hidden md:aspect-[330/204] lg:aspect-[300/226]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 335px, (max-width: 1365px) 330px, 300px"
        />
      </div>

      {/* テキストエリア
        PC:  padding 20px 20px 40px、gap 14px
        Tab: padding 16px 24px 32px、gap 16px
        SP:  padding 24px 20px 32px、gap 16px
      */}
      <div className="flex flex-col gap-4 bg-white px-5 pt-6 pb-8 md:gap-4 md:px-6 md:pt-4 md:pb-8 lg:gap-[14px] lg:px-5 lg:pt-5 lg:pb-10">
        {/* タイトル + マーカー
          font-size: PC・Tab 20px / SP 18px、bold、#333（#000 → #333 修正適用）
          マーカー幅: PC 198px / Tab 72px / SP 295px
          マーカー高さ: 全デバイス 2px
        */}

        <h3 className="card_heading_marker">{item.title}</h3>

        {/* 説明文
          全デバイス: NotoSansJP 14px normal #333 line-height 1.7
        */}
        <p className="text-[14px] leading-[1.7] font-normal text-[#333]">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

// ============================================
// ToolboxSection
// ============================================
export default function ToolboxSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    /*
      背景: 全幅グラデーション（globals.cssの共通グラデーション to bottom #fdfbfb → #ebedee）
      padding: 全デバイス 120px 0
      ※ Toolboxのみ全幅背景あり → section に bg を乗せる
    */
    <section
      id="toolbox"
      ref={ref}
      className="w-full py-[120px]"
      style={{
        background: "linear-gradient(to bottom, #fdfbfb, #ebedee)",
      }}
      aria-labelledby="toolbox-heading"
    >
      {/*
        コンテンツ幅:
          PC:     max-w-[960px]
          Tablet: max-w-[696px]
          SP:     max-w-[335px]（px-5 で左右 20px 確保）
      */}
      <div className="mx-auto flex w-full flex-col items-center px-5 md:max-w-[696px] md:px-0 lg:max-w-[960px]">
        {/* セクションタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <SectionHeading label="TOOLBOX" />
        </motion.div>

        {/* グリッド
          PC:  3列 2行、col-gap 20px、row-gap 40px、padding 10px
          Tab: 2列 3行、col-gap 36px、row-gap 60px
          SP:  1列、gap 80px
        */}
        <div className="flex w-full flex-col gap-[80px] md:grid md:grid-cols-2 md:gap-x-[36px] md:gap-y-[60px] lg:grid-cols-3 lg:gap-x-[20px] lg:gap-y-[40px] lg:p-[10px]">
          {TOOLBOX_ITEMS.map((item, i) => (
            <ToolboxCard key={item.id} item={item} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
