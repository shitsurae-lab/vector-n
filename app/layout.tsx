import type { Metadata } from "next";
import {
  Anton,
  Bebas_Neue,
  Orbitron,
  Michroma,
  Montserrat,
} from "next/font/google"; //
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import ScrollToTop from "@/components/ScrollToTop";

// h2用: インパクトのある英単語
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

//数字
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400", // Bebas Neueは通常400のみ
  variable: "--font-bebas-neue",
});

// h3(英)用: 近未来的な英単語
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const michroma = Michroma({
  weight: "400", // Michromaは400のみ
  subsets: ["latin"],
  variable: "--font-michroma",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vector-n",
    default: "Vector-n | Toshiyuki Kurashima's Portfolio",
  },
  description:
    "「運用まで視野に入れた」Web制作を提供。デザイン、フロントエンド開発、WordPress・CMS実装まで一貫して対応可能です。後任が迷わない保守性の高い設計と、モダンな技術スタック（Next.js / TypeScript）でビジネスの成長を支援します。",

  metadataBase: new URL("https://www.vector-n.net"),

  // OGP
  openGraph: {
    title: "Vector-n | Toshiyuki Kurashima's Portfolio",
    description: "デザインと実装、その先にある運用を繋ぐ。現場目線のWeb制作。",
    url: "https://www.vector-n.net",
    siteName: "Vector-n",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // ファイル名と拡張子を合わせる
        width: 1200,
        height: 630,
        alt: "Vector-n OGP Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${anton.variable} ${orbitron.variable} ${michroma.variable} ${bebasNeue.variable} ${montserrat.variable}`}
    >
      <body className="bg-[#f8f6f3] text-[#4f545a] antialiased selection:bg-black selection:text-white">
        <ScrollToTop />
        {/* 全ページ共通：ヘッダー */}
        <Header />

        {/* メインコンテンツ */}
        {children}
        <Toaster position="top-center" richColors />
        {/* 全ページ共通：フッター */}
        <Footer />
      </body>
    </html>
  );
}
