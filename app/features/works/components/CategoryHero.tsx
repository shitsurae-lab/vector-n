'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type HeroProps = {
  src: string; // メイン画像
  subSrc?: string; // サブ画像
  title: string;
  subtitle?: string;
  desc?: string;
  alt: string;
};

export const CategoryHero = ({
  src,
  subSrc,
  title,
  subtitle,
  desc,
  alt,
}: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline();

      // 1. メインの流体画像フェードイン
      tl.fromTo(
        '.main-visual-wrapper',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
      );

      // 2. サブの丸画像（右下）の出現
      tl.fromTo(
        '.sub-visual-wrapper',
        { opacity: 0, y: 40, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'back.out(1.7)' },
        '-=1.2', // メインの途中から開始
      );

      // 3. テキストのアニメーション（下からふわっと）
      tl.fromTo(
        '.animate-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
        '-=1',
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className='relative w-screen h-[80vh] md:h-svh overflow-hidden bg-[#f3f1ee] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'
    >
      {/* --- コンテンツエリア (1440px制限) --- */}
      <div className='relative w-full max-w-[1440px] h-full mx-auto px-6 md:px-12'>
        {/* --- メイン流体シェイプ画像 --- */}
        <div
          className='main-visual-wrapper relative w-[95%] md:w-[65%] max-w-[940px] aspect-[4/3] md:aspect-[1.2/1] mx-auto md:ml-0'
          style={{ clipPath: 'url(#fluid-mask-hero)' }}
        >
          <Image src={src} alt={alt} fill priority className='object-cover' />
        </div>

        {/* 🔘 サブの流体シェイプ（右下のアクセント） */}
        <div
          className='sub-visual-wrapper absolute z-20 right-4 bottom-32 w-[45vw] md:right-10 md:bottom-20 md:w-[22vw] md:max-w-[320px] aspect-square'
          style={{ clipPath: 'url(#blob-mask-hero)' }}
        >
          <Image src={subSrc || src} alt='' fill className='object-cover' />
        </div>

        {/* --- テキストレイヤー --- */}
        <div className='absolute bottom-[10%] left-6 md:left-20 z-20 pointer-events-none'>
          <p className='animate-text text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-2'>
            {subtitle}
          </p>
          <h1 className='animate-text text-4xl md:text-7xl font-black leading-none text-zinc-900 uppercase'>
            {title}
          </h1>
          {desc && (
            <p className='animate-text mt-6 max-w-sm text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap'>
              {desc}
            </p>
          )}
        </div>
      </div>

      {/* --- 流体シェイプの定義 (IDが重複しないように名称変更) --- */}
      <svg width='0' height='0' className='absolute pointer-events-none'>
        <defs>
          <clipPath id='fluid-mask-hero' clipPathUnits='objectBoundingBox'>
            <path
              transform='scale(0.00105, 0.00155)'
              d='M119.624 588C14.1239 497.646 -37.8762 170 31.6616 0H824.124C920.624 25.5 950.124 90 950.124 146C950.124 226 880.942 337.14 726.162 389C653.624 413.304 539.124 529.5 457.124 588C353.124 662.195 202.624 659.084 119.624 588Z'
            />
          </clipPath>
          <clipPath id='blob-mask-hero' clipPathUnits='objectBoundingBox'>
            <circle cx='0.5' cy='0.5' r='0.5' />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};
