'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Next.jsのImageコンポーネントをインポート
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { Arrow } from 'radix-ui/internal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductProps {
  index: number;
  num: string;
  enTitle: string;
  jaTitle: string;
  category: string;
  link?: string;
  imageHref: string;
  ctaText?: string;
  // 使わない場合は削除、使う予定があるなら残す（今回は警告回避のため一旦コメントアウト）
  // isAbout?: boolean;
}

export const FluffyContainer = ({
  index,
  num,
  enTitle,
  jaTitle,
  category,
  link,
  imageHref,
  ctaText,
}: ProductProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isEven = index % 2 === 1;
  // 1. 背景色の条件分岐（2番目と4番目の時だけ色を変える）
  // プログラミングのindexは0から始まるので、2番目(index:1)と4番目(index:3)を指定します
  const isTargetIndex = index === 1 || index === 3;
  const bgColorClass = isTargetIndex ? 'bg-[#f3f1ee]' : 'bg-transparent'; // ターゲットの色を少し濃いめに設定

  useGSAP(
    () => {
      // 2. 内部で一度変数に受けることで、GSAPが型を正しく認識できるようにします
      const container = containerRef.current;
      const content = contentRef.current;
      if (!container || !content) return;

      const children = gsap.utils.toArray(content.children);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        imageWrapperRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
      ).fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.8',
      );
    },
    { scope: containerRef },
  );
  // link がある場合のみ cursor-pointer と hover背景を付与する
  const wrapperClasses = ` group w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] relative flex flex-col items-center overflow-hidden transition-colors  duration-500 ${bgColorClass} ${link ? 'cursor-pointer hover:bg-black/[0.02]' : ''}`;
  // コンテンツの中身を共通変数化
  const innerContent = (
    <div
      className={`max-w-[1440px] mx-auto w-full flex flex-col ${
        isEven ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-start justify-center gap-12 md:gap-20 py-20 px-6 md:px-16 group`}
    >
      {/* 🖼️ 画像領域：PCで大きくなりすぎないよう制限 */}
      <div
        ref={imageWrapperRef}
        className='basis-full md:basis-1/2 w-full flex justify-center'
      >
        <div className='relative aspect-square w-full max-w-[480px] overflow-hidden rounded-2xl shadow-2xl bg-slate-100'>
          <Image
            src={imageHref}
            alt={enTitle}
            fill
            sizes='(max-width: 768px) 100vw, 480px'
            className={`object-cover transition-transform duration-1000 ease-out ${
              link ? 'group-hover:scale-110' : ''
            }`}
            priority={index === 0}
          />
        </div>
      </div>

      {/* 🖋️ テキスト領域：最新の文字組みレイアウト */}
      <div
        ref={contentRef}
        className='basis-full md:basis-1/2 pt-4 md:pt-10' // 外側の余白
      >
        <div className='space-y-4 group'>
          {' '}
          {/* 👈 ここが提案の「要素間の距離」 */}
          {/* 01. 数字 ＋ 英語メインタイトル */}
          <div className='flex items-start gap-3 transition-transform duration-700 group-hover:translate-x-1'>
            <span className='text-[10px] font-mono text-zinc-400 tracking-tighter pt-2'>
              {num}
            </span>
            <h3 className='text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-zinc-900'>
              {enTitle}
            </h3>
          </div>
          {/* 02. ライン ＋ 日本語サブタイトル */}
          <div className='flex items-center gap-4 pl-10'>
            <span className='h-[1px] w-8 bg-zinc-200' />{' '}
            {/* 水平のあしらい線 */}
            <p className='text-xs md:text-sm tracking-[0.2em] font-bold text-zinc-400 uppercase'>
              {jaTitle}
            </p>
          </div>
          {/* 03. 本文：カテゴリー・説明 */}
          <div className='pl-10 pt-4'>
            <div className='text-[13px] leading-relaxed tracking-wider text-zinc-500 whitespace-pre-wrap max-w-sm border-l border-zinc-100 pl-4'>
              {category}
            </div>
          </div>
          {/* 04. CTAボタン */}
          {link && ctaText && (
            <div className='pl-10 pt-6'>
              <Link
                href={link}
                className='group/btn inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-400 hover:text-black transition-all'
              >
                {ctaText}
                <span className='transform group-hover/btn:translate-x-2 transition-transform duration-300'>
                  <ArrowRight />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // link プロパティの有無で、親要素を Link にするか div にするか分岐
  if (link) {
    return (
      <Link
        href={link}
        ref={containerRef as React.RefObject<HTMLAnchorElement>}
        className={wrapperClasses}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={wrapperClasses}
    >
      {innerContent}
    </div>
  );
};
