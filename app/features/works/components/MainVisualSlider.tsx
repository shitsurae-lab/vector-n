'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type SliderProps = {
  // ACFから取得したテキストも含める
  images: {
    src: string;
    alt: string;
    title?: string;
    subtitle?: string;
    desc?: string;
  }[];
};

export const MainVisualSlider = ({ images }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(
    () => {
      // 初回のマスク出現
      gsap.fromTo(
        maskRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 2, ease: 'expo.inOut' },
      );

      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 6000); // 少しゆったり6秒に設定

      return () => clearInterval(timer);
    },
    { scope: containerRef },
  );

  // 画像とテキストのアニメーション連動
  useGSAP(() => {
    // コンテナ内の全スライドを取得
    const allSlides =
      containerRef.current?.querySelectorAll('[class*="slide-"]') || [];
    const activeSlide = containerRef.current?.querySelector(
      `.slide-${currentIndex}`,
    );
    const activeText = containerRef.current?.querySelectorAll(
      `.text-${currentIndex}`,
    );
    if (activeSlide && activeText) {
      // --- 加筆：古いスライドのクリア ---
      // 新しいアニメを開始する前に、全スライドの透明度を下げてリセットする。
      // これにより1枚目が背後に残り続ける現象を防ぎます。
      gsap.to(allSlides, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });

      const tl = gsap.timeline();

      // 画像のフェード & ズーム
      tl.fromTo(
        activeSlide,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1.05,
          duration: 2,
          ease: 'power2.out',
          // --- 加筆：z-indexの動的制御 ---
          // アニメ開始時に最前面(z-10)へ、終了時に少し下げる(z-1)ことで重なりを整理
          onStart: () => {
            gsap.set(activeSlide, { zIndex: 10 });
          },
          onComplete: () => {
            gsap.set(activeSlide, { zIndex: 1 });
          },
        },
      );

      // テキストを下からふわっと（画像より少し遅らせる）
      tl.fromTo(
        activeText,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.2 },
        '-=1.2', // 画像のフェード中盤から開始
      );

      // 極低速ズーム（継続）
      gsap.to(activeSlide, { scale: 1, duration: 6, ease: 'linear' });
    }
  }, [currentIndex]);

  return (
    <section
      ref={containerRef}
      className='relative py-24 left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen h-svh mb-12 overflow-hidden  bg-[#f8f6f3]'
    >
      <div
        ref={maskRef}
        className='absolute top-0 left-16 w-[62.5vw] h-[calc(100%-160px)] overflow-hidden rounded-b-[500px] z-10'
      >
        {images?.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 slide-${index} overflow-hidden`}
            style={{
              // 初期状態はすべて透明、z-indexも 0 に統一
              opacity: 0,
              zIndex: index === currentIndex ? 10 : 0,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              className='object-cover'
            />
          </div>
        ))}
      </div>

      {/* テキストレイヤー：画像のインデックスと連動 */}
      <div className='absolute top-[60%] left-24 z-20 pointer-events-none'>
        {images.map(
          (image, index) =>
            index === currentIndex && (
              <div key={index} className='space-y-4'>
                <div
                  className={`text-${index} text-sm tracking-[0.3em] uppercase opacity-70`}
                >
                  {image.subtitle || 'live wisely and beautifully'}
                </div>
                <h2
                  className={`text-${index} text-5xl md:text-7xl font-serif leading-tight text-slate-900 uppercase`}
                >
                  {image.title}
                </h2>
                {image.desc && (
                  <p
                    className={`text-${index} max-w-sm text-sm leading-loose text-slate-600 mt-6`}
                  >
                    {image.desc}
                  </p>
                )}
              </div>
            ),
        )}
      </div>
    </section>
  );
};
