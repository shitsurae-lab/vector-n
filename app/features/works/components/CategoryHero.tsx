'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type HeroProps = {
  src: string;
  subSrc?: string;
  title: string;
  subtitle?: string;
  desc?: string;
  alt: string;
  date?: string;
};

export const CategoryHero = ({
  src,
  subSrc,
  title,
  subtitle,
  desc,
  alt,
  date,
}: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tl = gsap.timeline();

      // 1. 背景レイヤーとメイン画像を一気にフェード
      tl.fromTo(
        ['.hero-bg-shape', '.main-visual-wrapper'],
        { opacity: 0, scale: 1.05, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.1,
          ease: 'power2.out',
        },
      );

      // 2. サブ画像（重なりを強調するため少し遅らせる）
      tl.fromTo(
        '.sub-visual-wrapper',
        { opacity: 0, x: 20, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 1.5, ease: 'back.out(1.2)' },
        '-=1.4',
      );

      // 3. テキストと「あしらい」のアニメーション
      tl.fromTo(
        '.animate-text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
        '-=1',
      );
      gsap.fromTo(
        '.animate-scroll-line-inner',
        { y: '-100%' }, // 上に隠れた状態から
        {
          y: '100%', // 下に抜けるまで
          duration: 1.5,
          repeat: -1, // 無限ループ
          ease: 'power1.inOut',
          delay: 2, // 最初の登場アニメーションが終わる頃にスタート
        },
      );
    },

    { scope: containerRef },
  );

  // 今日の日付をデフォルトにする（もしdateが渡されなかった時のため）
  const displayDate = date ? new Date(date) : new Date();
  const formattedDate = displayDate
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');

  return (
    <section
      ref={containerRef}
      className='relative w-screen h-[85vh] md:h-svh overflow-hidden bg-[#f3f1ee] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'
    >
      <div className='relative w-full max-w-[1440px] h-full mx-auto px-6 md:px-12 flex flex-col'>
        {/* --- 🖼️ ビジュアルエリア：重なりと奥行きを演出 --- */}
        <div className='relative w-full max-w-[1200px] aspect-[4/3] md:aspect-[16/9]'>
          {/* ① 背面の薄い流体シェイプ（影と奥行きの役割） */}
          <div
            className='hero-bg-shape absolute inset-0 bg-zinc-300/10 translate-x-6 translate-y-6 scale-[1.02] blur-[20px]'
            style={{ clipPath: 'url(#fluid-mask-hero)' }}
          />

          {/* ② メイン流体シェイプ画像 */}
          <div
            className='main-visual-wrapper relative z-10 w-full h-full shadow-2xl'
            style={{ clipPath: 'url(#fluid-mask-hero)' }}
          >
            <Image src={src} alt={alt} fill priority className='object-cover' />
          </div>
          {/* ② サブ縦長楕円画像 */}
          <div className='sub-visual-wrapper absolute z-40 right-2 bottom-[-160px] md:bottom-[-160px] lg:bottom-[-120px] w-[35vw] md:w-[24vw] lg:w-[18vw] max-w-[280px] aspect-[3/4] shadow-2xl [0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden rounded-[200px]'>
            <Image
              src={subSrc || src}
              alt=''
              fill
              className='object-cover scale-110'
            />
          </div>

          {/* ④ メタデータ（あしらいテキスト：生成画像を再現） */}
          <div className='absolute top-0 left-0 z-30 pt-10 pl-4 md:pl-0 space-y-1 font-mono'>
            <p className='animate-text text-[9px] tracking-[0.2em] text-zinc-400 uppercase'>
              PUBLISHED / {formattedDate}
            </p>
            <p className='animate-text text-[9px] tracking-[0.2em] text-zinc-400'>
              35.4504° N, 139.6342° E
            </p>
          </div>
        </div>
        {/* --- 🖋️ テキストレイヤー --- */}
        <div className='absolute bottom-[10%] sm:bottom-[24%] md:bottom-[12%] sm:w-[calc(100%-40px)] md:w-[calc(100%-160px)] w-[calc(100%-100px)] right-0 md:right-auto md:left-20 z-30'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='h-[1px] w-12 bg-zinc-400'></div>
            {/* ここを 英語ではMichroma、文字間を広げる */}
            <p className='font-[family-name:var(--font-mixed)] text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500'>
              {subtitle}
            </p>
          </div>

          {/* メインタイトル：ウェイトを少し落とし、字間を広げる */}
          <h1 className='font-[family-name:var(--font-anton)] text-5xl md:text-7xl lg:text-8xl leading-tight text-zinc-900 uppercase tracking-wider'>
            {title}
          </h1>

          {/* 説明文：さらにインデントを下げて密度を作る */}
          {desc && (
            <p className='animate-text mt-10 ml-16 max-w-sm text-xs md:text-sm text-zinc-500 leading-relaxed tracking-wider border-l border-zinc-200 pl-6'>
              {desc}
            </p>
          )}
        </div>
        {/* --- 🖱️ Scroll Indicator (1pxライン) --- */}
        <div className='absolute bottom-24 sm:bottom-8 md:bottom-40 lg:bottom-12 left-8 md:left-auto right-auto md:right-12 z-50 flex flex-col items-end md:items-start gap-4 overflow-hidden'>
          <span
            className='font-[family-name:var(--font-michroma)] text-[6px] tracking-[0.2em] text-zinc-400 uppercase vertical-text'
            style={{ writingMode: 'vertical-rl' }}
          >
            scroll down
          </span>
          <div className='relative w-[1px] h-12 bg-zinc-200/30 overflow-hidden'>
            <div className='animate-scroll-line-inner absolute inset-0 bg-zinc-400' />
          </div>
        </div>
      </div>

      {/* --- SVG定義 --- */}
      <svg width='0' height='0' className='absolute'>
        <defs>
          <clipPath id='fluid-mask-hero' clipPathUnits='objectBoundingBox'>
            <path
              transform='scale(0.00105, 0.00155)'
              d='M119.624 588C14.1239 497.646 -37.8762 170 31.6616 0H824.124C920.624 25.5 950.124 90 950.124 146C950.124 226 880.942 337.14 726.162 389C653.624 413.304 539.124 529.5 457.124 588C353.124 662.195 202.624 659.084 119.624 588Z'
            />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};
