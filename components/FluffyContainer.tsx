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
      className={`max-w-6xl mx-auto w-full flex flex-col ${
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
        className='basis-full md:basis-1/2 pt-10 md:pt-20 relative'
      >
        <div className='group relative'>
          {/* --- 01. ビッグナンバー (Anton) ---
        text-transparent と -webkit-text-stroke で「線」にして、Michromaの空間美を邪魔しないようにします */}
          <span
            className='absolute -top-16 -left-10 md:-top-24 md:-left-14 select-none pointer-events-none
    font-[family-name:var(--font-anton)] text-[140px] md:text-[220px]
    leading-none transition-all duration-1000 text-zinc-900 opacity-[0.04] group-hover:opacity-[0.08]'
          >
            {num}
          </span>

          <div className='relative z-10 space-y-6'>
            {/* --- 02. 英語メインタイトル (Anton) --- */}
            <div className='transition-transform duration-700 group-hover:translate-x-2'>
              <h3 className='font-[family-name:var(--font-anton)] text-5xl md:text-6xl tracking-tight uppercase leading-[0.85] text-zinc-900'>
                {enTitle}
              </h3>
            </div>

            {/* --- 03. ライン ＋ 日本語サブタイトル (Michroma) ---
          Michromaは横長なので、trackingを広げすぎると読みづらくなります。
          [0.2em] 程度に抑えつつ、font-boldで存在感を出します。 */}
            <div className='flex items-center gap-4 pl-1'>
              <span className='h-[1px] w-10 bg-zinc-300 transition-all duration-700 group-hover:w-20 group-hover:bg-zinc-900' />
              <p className='font-[family-name:var(--font-mixed)] text-xs md:text-sm tracking-[0.2em] font-bold text-zinc-500 uppercase'>
                {jaTitle}
              </p>
            </div>

            {/* --- 04. 本文 (Michroma) --- */}
            <div className='pl-1 pt-2'>
              <div className='font-[family-name:var(--font-mixed)] text-[12px] md:text-[13px] leading-[1.8] tracking-widest text-zinc-500 whitespace-pre-wrap max-w-sm border-l-2 border-zinc-50 pl-5 transition-colors duration-500 group-hover:border-zinc-200'>
                {category}
              </div>
            </div>

            {/* --- 05. CTAボタン (Michroma) --- */}
            {link && ctaText && (
              <div className='pl-1 pt-6'>
                <div className='group/btn inline-flex items-center gap-5 font-[family-name:var(--font-mixed)] text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 hover:text-zinc-900 transition-all'>
                  <span className='relative'>
                    {ctaText}
                    <span className='absolute -bottom-1 left-0 w-0 h-[1.5px] bg-zinc-900 transition-all duration-300 group-hover/btn:w-full' />
                  </span>
                  <span className='p-2 rounded-full border border-zinc-100 group-hover/btn:border-zinc-900 group-hover/btn:translate-x-2 transition-all duration-300'>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            )}
          </div>
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
