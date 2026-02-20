// components/ScrollToTop.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. ページ最上部へスクロール
    window.scrollTo(0, 0);

    // 2. GSAPの計算をリセット（遷移後の要素位置を正しく再取得するため）
    ScrollTrigger.refresh();

    // (オプション) 遷移時に実行中のアニメーションがあれば止める
    // gsap.killTweensOf("*");
  }, [pathname]);

  return null; // 画面には何も表示しない
}
