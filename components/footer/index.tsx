"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

// ============================================
// Nav items（Headerと同じ構成）
// ============================================
const NAV_ITEMS = [
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
] as const;

// ============================================
// Footer
// ============================================
export const Footer = () => {
  return (
    /*
      背景: white（全幅）
      上下padding:
        SP/Tab: pt-10 pb-5
        PC:     pt-20 pb-10
      コンテンツ幅はfooter-inner側のmax-widthで制御
        SP:  max-w-[335px]
        Tab: max-w-[448px]
        PC:  max-w-[434px]
    */
    <footer className="flex w-full flex-col items-center justify-start gap-6 bg-white pt-10 pb-5 lg:gap-12 lg:pt-20 lg:pb-10">
      {/* footer-inner
        mx-auto + max-w でコンテンツ幅を中央制御
        SP:  px-5（335px相当）、gap 24px
        Tab: max-w-[448px]、px-0、gap 24px
        PC:  max-w-[434px]、px-0、gap 48px
      */}
      <div className="mx-auto flex w-full flex-col items-center gap-6 px-5 md:max-w-[448px] md:px-0 lg:max-w-[434px] lg:gap-12">
        {/* footer-nav: nav-list + logo
          gap: 全デバイス 40px
        */}
        <div className="flex w-full flex-col items-center gap-10">
          {/* ── Footer Nav list ──
            SP:     grid 3col×2row、col-gap 8px、row-gap 10px、w-[316px]
            Tab/PC: flex row、justify-start、gap 16px
          */}
          <nav aria-label="フッターナビゲーション">
            <ul className="grid w-[316px] grid-cols-3 grid-rows-2 gap-x-2 gap-y-2.5 md:flex md:h-6 md:w-auto md:flex-row md:items-center md:justify-start md:gap-4">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} className="flex items-center gap-4">
                  {/* 区切り線: Tab/PC のみ、最初のアイテムには非表示 */}
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-5 w-px bg-[#333] md:block"
                    />
                  )}
                  <Link
                    href={item.href}
                    className="hover:text-primary flex w-[100px] items-center justify-center px-[2px] text-[14px] leading-normal font-medium text-[#333] transition-colors duration-150 md:w-auto md:justify-start md:px-0 md:py-[2px] md:text-[16px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {/* GitHub */}
              <li className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="hidden h-5 w-px bg-[#333] md:block"
                />
                <a
                  href="https://github.com/shitsurae-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary flex w-[100px] items-center justify-center gap-1.5 px-[2px] text-[14px] leading-normal font-medium text-[#333] transition-colors duration-150 md:w-auto md:justify-start md:px-0 md:py-[2px] md:text-[16px]"
                  aria-label="GitHubを開く"
                >
                  <Github size={18} strokeWidth={1.8} />
                  <span>GITHUB</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* ── Footer Logo ──
            全デバイス: ロゴマーク 38×48px、gap 8px
            テキスト: var(--font-display) 20px 500 #333 lh1.1
            SP:     w-[250px] h-[40px]
            Tab/PC: w-[280px] h-[48px]
          */}
          <Link
            href="/"
            className="flex h-[40px] w-[250px] flex-row items-center gap-2 md:h-[48px] md:w-[280px]"
            aria-label="トップページへ"
          >
            <Image
              src="/assets/logo-vector@2x.webp"
              alt="Toshiyuki Kurashima logo mark"
              width={38}
              height={48}
              className="h-[48px] w-[38px] shrink-0"
            />
            <span className="font-zalando w-[234px] text-[20px] leading-[1.1] font-medium whitespace-nowrap text-[#333]">
              Toshiyuki Kurashima
            </span>
          </Link>
        </div>
        {/* /footer-nav */}

        {/* ── Copyright ──
          全デバイス: var(--font-display) 12px 500 #333 text-center
        */}
        <p
          className="font-zalando w-full text-center text-[12px] leading-normal font-medium text-[#333]"
          aria-label="著作権表示"
        >
          © 2026 VECTOR -N
        </p>
      </div>
      {/* /footer-inner */}
    </footer>
  );
};
