"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type SliderProps = {
  images: {
    src: string;
    subSrc?: string;
    alt: string;
    title?: string;
    subtitle?: string;
    desc?: string;
  }[];
};

export const CarouselFade = ({ images }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 初期化：ちらつき防止
  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.set("[class*='text-'], [class*='slide-'], [class*='sub-slide-']", {
        opacity: 0,
        y: 20,
      });

      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 6000);
      return () => clearInterval(timer);
    },
    { scope: containerRef },
  );

  // アニメーション連動
  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeSlide = container.querySelector(`.slide-${currentIndex}`);
    const activeSubSlide = container.querySelector(
      `.sub-slide-${currentIndex}`,
    );
    const activeText = container.querySelectorAll(`.text-${currentIndex}`);

    if (activeSlide && activeSubSlide) {
      const tl = gsap.timeline();

      // メイン画像：上端固定のズームアウト
      tl.fromTo(
        activeSlide,
        { opacity: 0, scale: 1.1, transformOrigin: "center top" },
        { opacity: 1, scale: 1.02, duration: 1.8, ease: "power2.out" },
      );

      // サブ画像：少し遅れてスライドイン
      tl.fromTo(
        activeSubSlide,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1.5, ease: "expo.out" },
        "-=1.5",
      );

      // テキスト：出現
      tl.fromTo(
        activeText,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=1.2",
      );
    }
  }, [currentIndex]);

  return (
    <section
      ref={containerRef}
      className="relative right-1/2 left-1/2 -mr-[50vw] mb-24 -ml-[50vw] h-svh w-screen overflow-hidden bg-[#f8f6f3] md:h-[800px]"
    >
      {/* インナーコンテナ：ここで1200pxに制限し、中央寄せにする */}
      <div className="relative mx-auto h-full w-full max-w-[1200px] px-6 lg:px-0">
        {/* 1. メインマスク：インナー内の左側に配置 (880x640pxイメージ) */}
        <div
          ref={maskRef}
          className="absolute top-0 left-0 z-10 h-[70vh] w-full overflow-hidden rounded-b-[200px] bg-slate-100 md:h-[640px] md:w-[880px] md:rounded-b-[320px]"
        >
          {images?.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 slide-${index} ${index === currentIndex ? "block" : "hidden"}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* 2. サブ画像：インナー内の右下付近に配置 */}
        <div className="absolute right-0 bottom-[20%] z-20 aspect-square w-[35%] overflow-hidden rounded-full border-8 border-[#f8f6f3] shadow-2xl md:right-4 md:bottom-20 md:w-[320px]">
          {images?.map((image, index) => (
            <div
              key={`sub-${index}`}
              className={`absolute inset-0 sub-slide-${index} ${index === currentIndex ? "block" : "hidden"}`}
            >
              <Image
                src={image.subSrc || image.src}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* 3. テキストエリア：インナー内の左下に配置 */}
        <div className="pointer-events-none absolute bottom-4 left-0 z-30 md:bottom-12 md:left-12">
          {images.map(
            (image, index) =>
              index === currentIndex && (
                <div key={index} className="space-y-4">
                  <div
                    className={`text-${index} text-[10px] font-bold tracking-[0.4em] uppercase opacity-60 md:text-sm`}
                  >
                    {image.subtitle || "Creative Portfolio"}
                  </div>
                  <h2
                    className={`text-${index} text-4xl leading-tight font-black text-slate-900 uppercase md:text-7xl`}
                  >
                    {image.title}
                  </h2>
                </div>
              ),
          )}
        </div>
      </div>
    </section>
  );
};
