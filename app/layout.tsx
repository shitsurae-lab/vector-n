import type { Metadata } from 'next';
import {
  Anton,
  Bebas_Neue,
  Orbitron,
  Michroma,
  Montserrat,
} from 'next/font/google'; //
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import ScrollToTop from '@/components/ScrollToTop';

// h2用: インパクトのある英単語
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

//数字
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // Bebas Neueは通常400のみ
  variable: '--font-bebas-neue',
});

// h3(英)用: 近未来的な英単語
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const michroma = Michroma({
  weight: '400', // Michromaは400のみ
  subsets: ['latin'],
  variable: '--font-michroma',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer', // ここにお名前などを
  description: 'Design and Development Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='ja'
      className={`${anton.variable} ${orbitron.variable} ${michroma.variable} ${bebasNeue.variable} ${montserrat.variable}`}
    >
      <body className='antialiased bg-[#f8f6f3] text-[#4f545a] selection:bg-black selection:text-white'>
        <ScrollToTop />
        {/* 全ページ共通：ヘッダー */}
        <Header />

        {/* メインコンテンツ */}
        {children}
        <Toaster position='top-center' richColors />
        {/* 全ページ共通：フッター */}
        <Footer />
      </body>
    </html>
  );
}
