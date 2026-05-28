import type { Metadata } from "next";
import {
  Inter,
  Roboto_Condensed,
  Anton,
  Bebas_Neue,
  Orbitron,
  Michroma,
  Montserrat,
  Noto_Sans_JP,
  Space_Grotesk,
  Zalando_Sans,
} from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import OpeningProvider from "./features/works/components/OpeningProvider";
import { UpTo } from "@/components/UpTo";

// h2用: インパクトのある英単語
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

//タイトル
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const zalandoSans = Zalando_Sans({
  subsets: ["latin"],
  variable: "--font-zalando-sans",
  display: "swap",
  adjustFontFallback: false,
});

//数字①
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400", // Bebas Neueは通常400のみ
  variable: "--font-bebas-neue",
});
//数字②
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-condensed",
  display: "swap",
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

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp", // Tailwind v4用
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk", // CSS変数名を指定
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vector-n",
    default: "Vector-n | Toshiyuki Kurashima's Portfolio",
  },
  description:
    "「運用まで視野に入れた」Web制作を提供。デザイン、フロントエンド開発、WordPress・CMS実装まで一貫して対応可能です。後任が迷わない保守性の高い設計と、モダンな技術スタック（Next.js / TypeScript）でビジネスの成長を支援します。",
  metadataBase: new URL("https://www.vector-n.net"),
  alternates: {
    canonical: "./",
  },
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
  verification: {
    google: "PjRLYbD4gNZLG08S39rg08iMHKhm4-4GPcdBveUjiiU",
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
      className={`${anton.variable} ${orbitron.variable} ${michroma.variable} ${noto.variable} ${bebasNeue.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${robotoCondensed.variable} ${inter.variable} ${zalandoSans.variable}`}
    >
      <body className="bg-[#f8f6f3] text-[#4f545a] antialiased selection:bg-black selection:text-white">
        <OpeningProvider>
          <ScrollToTop />
          <UpTo />
          {/* 全ページ共通：ヘッダー */}
          <Header />

          {/* メインコンテンツ */}
          {children}
          <Toaster position="top-center" richColors />
          {/* 全ページ共通：フッター */}
          <Footer />
        </OpeningProvider>
        <GoogleAnalytics gaId="G-DEVPKC45TK" />
      </body>
    </html>
  );
}
