import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google'; // セリフ体を追加
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// 1. 本文用のサンセリフ体
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// 2. タイトル用の美しいセリフ体 (Playfair Display)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
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
    <html lang='ja' className={`${inter.variable} ${playfair.variable}`}>
      <body className='antialiased bg-[#f8f6f3] text-[#4f545a] selection:bg-black selection:text-white'>
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
