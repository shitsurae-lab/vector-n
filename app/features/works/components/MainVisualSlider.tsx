'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 1. 型定義をしっかり行う
interface MainVisualImage {
  src: string;
  subSrc?: string;
  alt: string;
  title?: string;
  subtitle?: string;
  desc?: string;
}

interface SliderProps {
  images: MainVisualImage[];
}

export const MainVisualSlider = ({ images }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. フックは必ずコンポーネントの「最初」に、条件分岐なしで記述する
  useEffect(() => {
    // 早期リターンの代わりに、エフェクト内部で条件判定を行う
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]); // imagesがundefinedの可能性を考慮して?.を付与

  useGSAP(() => {
    // 同様に、GSAP内部で条件判定を行う
    if (!images || images.length === 0 || !containerRef.current) return;

    const container = containerRef.current;

    gsap.set('.slide-item, .sub-slide-item', { opacity: 0, zIndex: 0 });

    const activeSlide = container.querySelector(`.slide-${currentIndex}`);
    const activeSubSlide = container.querySelector(
      `.sub-slide-${currentIndex}`,
    );
    const activeText = container.querySelectorAll(`.text-${currentIndex}`);

    if (activeSlide && activeSubSlide) {
      const tl = gsap.timeline();
      // アクティブな要素を最前面へ
      gsap.set([activeSlide, activeSubSlide], { zIndex: 10 });

      // メインとサブを同時にフェードイン
      tl.to([activeSlide, activeSubSlide], {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
      });
      tl.fromTo(
        activeText,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
        '-=1',
      );
    }
  }, [currentIndex, images]);

  // 2. 早期リターン（レンダリングの除外）はフックより「後」に書く
  if (!images || images.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className='relative w-screen h-[80vh] md:h-svh overflow-hidden bg-[#f3f1ee] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'
    >
      {/* --- コンテンツエリア (1440px制限) --- */}
      <div className='relative w-full max-w-[1440px] h-full mx-auto px-6 md:px-12'>
        {/* --- メイン流体シェイプ画像 --- */}
        <div
          className='relative w-[84%] sm:w-[95%] md:w-[80%] lg:w-[65%] max-w-[940px] aspect-1/1 sm:aspect-4/3 md:aspect-[1.2/1] mx-auto md:ml-0'
          style={{ clipPath: 'url(#fluid-mask)' }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 slide-${index} transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className='object-cover'
              />
            </div>
          ))}
        </div>

        {/* 🔘 サブの流体シェイプ（右下のアクセント：1440pxコンテナ内） */}
        <div
          className='absolute z-20 right-4 bottom-60 md:bottom-60 lg:bottom-32 w-[50vw] sm:w-[45vw] md:w-[45vw] lg:w-[22vw] md:max-w-[320px] md:right-10  aspect-square'
          style={{ clipPath: 'url(#blob-mask)' }}
        >
          {images.map((image, index) => (
            <div
              key={`sub-${index}`}
              className={`absolute inset-0 sub-slide-item sub-slide-${index} transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.subSrc || image.src} // subSrcがなければメイン画像を使用
                alt=''
                fill
                className='object-cover'
              />
            </div>
          ))}
        </div>

        {/* --- テキストレイヤー --- */}
        <div className='absolute bottom-[16%] sm:bottom-[10%] left-6 md:left-20 z-20 pointer-events-none'>
          {images.map((image, index) => (
            <div
              key={index}
              className={index === currentIndex ? 'block' : 'hidden'}
            >
              <p
                className={`text-${index} text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-2`}
              >
                {image.subtitle}
              </p>
              <h2
                className={`text-${index} text-4xl md:text-7xl font-black leading-none text-zinc-900 uppercase`}
              >
                {image.title}
              </h2>
              {image.desc && (
                <p
                  className={`text-${index} mt-6 max-w-sm text-sm text-zinc-600 leading-relaxed`}
                >
                  {image.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- 流体シェイプの定義 (画面には出ない) --- */}
      <svg width='0' height='0' className='absolute pointer-events-none'>
        <defs>
          <clipPath id='fluid-mask' clipPathUnits='objectBoundingBox'>
            {/* 1920pxでも耐えられるようスケーリングを微調整 */}
            <path
              transform='scale(0.00105, 0.00155)'
              d='M119.624 588C14.1239 497.646 -37.8762 170 31.6616 0H824.124C920.624 25.5 950.124 90 950.124 146C950.124 226 880.942 337.14 726.162 389C653.624 413.304 539.124 529.5 457.124 588C353.124 662.195 202.624 659.084 119.624 588Z'
            />
          </clipPath>
          {/* 💡 追加：サブ画像用の正円または有機的な丸 */}
          <clipPath id='blob-mask' clipPathUnits='objectBoundingBox'>
            <circle cx='0.5' cy='0.5' r='0.5' />
            {/* もしここも「ぐにゃっ」とさせたいなら、別の path を入れてみてください */}
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};
