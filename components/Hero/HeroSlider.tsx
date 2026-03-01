"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FluidMaskPrimary } from "../ui/FluidMasks";

interface MainVisualImage {
  src: string;
  subSrc?: string;
  alt: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  date?: string; // 💡 追加
}

interface SliderProps {
  images: MainVisualImage[];
}

export const HeroSlider = ({ images }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. スライド切り替えタイマー
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  // 2. 【初回のみ実行】常時の「生命感」と「初期登場」のアニメーション
  useGSAP(
    () => {
      if (!images.length || !containerRef.current) return;
      // A. 背面の影：大きくゆったり揺らす
      gsap.to(".hero-bg-shape-animated", {
        y: 15, // 揺れ幅を少し大きく（25→40）して深さを強調
        x: 10,
        scale: 1.04, // 少し膨らむ動きを追加
        duration: 7, // 周期を長く（6→8秒）して「ゆったり」させる
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".main-mask-container", {
        scaleY: 1.04, // 形状に合わせて少し深めに呼吸
        duration: 10, // 影より少し遅い周期にすると、ズレ（視差）が綺麗に出ます
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 0%", // 上端固定
      });

      gsap.to(".sub-visual-wrapper", {
        y: -25,
        x: 10,
        rotation: 1.5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // スクロールインジケーター (独立動作)
      gsap.fromTo(
        ".animate-scroll-line-inner",
        { y: "-100%" },
        { y: "100%", duration: 1.5, repeat: -1, ease: "power1.inOut" },
      );

      // --- B. 初回登場時のスライドアニメーション ---
      gsap.from(".main-visual-wrapper", {
        y: -100,
        opacity: 0,
        duration: 1.8,
        ease: "power4.out",
      });
    },
    { scope: containerRef },
  ); // 依存関係なし（初回のみ）

  // 3. 【切り替え時に実行】スライドのアニメーション
  useGSAP(() => {
    if (!images.length || !containerRef.current) return;

    const container = containerRef.current;
    const activeSlide = container.querySelector(`.slide-${currentIndex}`);
    const activeSubSlide = container.querySelector(
      `.sub-slide-${currentIndex}`,
    );
    const activeTextElements = container.querySelectorAll(
      `.text-${currentIndex}`,
    );

    if (activeSlide && activeSubSlide) {
      // 既存のスライドをリセット
      gsap.set(".slide-item, .sub-slide-item", { opacity: 0, zIndex: 0 });

      // アクティブな要素を前面へ
      gsap.set([activeSlide, activeSubSlide], { zIndex: 10 });

      const tl = gsap.timeline();
      tl.fromTo(
        [activeSlide, activeSubSlide],
        { opacity: 0, scale: 1.02 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          overwrite: true, // 💡 呼吸アニメーションとの衝突を防ぐ
        },
      ).fromTo(
        activeTextElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=1",
      );
    }
  }, [currentIndex]); // currentIndexが変わるたびに実行

  if (!images || images.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[85vh] w-screen overflow-hidden bg-gradient-to-br from-[#f8f6f3] via-[#f3f1ee] to-[#eceae7] md:h-svh"
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 md:px-12">
        {/* --- 🖼️ ビジュアルエリア --- */}
        <div className="main-visual-wrapper relative mx-auto aspect-[4/3] w-full max-w-[1280px] md:aspect-[4/3] lg:aspect-[16/9]">
          {/* ① 背面のさりげない影 */}
          <div
            className="hero-bg-shape-animated pointer-events-none absolute top-4 -right-4 -bottom-8 left-4 z-0 bg-zinc-400/10 blur-[60px]"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
          />

          {/* ② メイン流体スライダー */}
          <div
            className="main-image-container relative z-10 h-full w-full overflow-hidden"
            style={{ clipPath: "url(#fluid-mask-mv)" }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`slide-item absolute inset-0 slide-${index}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  className="scale-110 object-cover"
                />
              </div>
            ))}
          </div>

          {/* ③ サブ縦長楕円（セクション跨ぎ） */}
          <div className="sub-visual-wrapper absolute -right-2 bottom-[-160px] z-40 aspect-[3/4] w-[35vw] max-w-[280px] overflow-hidden rounded-[200px] shadow-2xl md:-right-10 md:bottom-[-160px] md:w-[24vw] lg:bottom-[-120px] lg:w-[18vw]">
            {images.map((image, index) => (
              <div
                key={`sub-${index}`}
                className={`sub-slide-item absolute inset-0 sub-slide-${index}`}
              >
                <Image
                  src={image.subSrc || image.src}
                  alt=""
                  fill
                  className="scale-110 object-cover"
                />
              </div>
            ))}
          </div>

          {/* ④ 動的メタデータ */}
          {/* <div className='absolute top-0 left-0 z-30 pt-10 pl-4 md:pl-0 space-y-1 font-mono'>
            {images.map((image, index) => (
              <div key={`meta-${index}`} className={`meta-${index} opacity-0`}>
                <p className='text-[9px] tracking-[0.2em] text-zinc-400 uppercase'>
                  CASE_0{index + 1} /{' '}
                  {image.date
                    ? new Date(image.date).getFullYear()
                    : new Date().getFullYear()}
                </p>
                <p className='text-[9px] tracking-[0.2em] text-zinc-400'>
                  35.6895° N
                </p>
              </div>
            ))}
          </div> */}
        </div>

        {/* --- 🖋️ テキストレイヤー --- */}
        <div className="pointer-events-none absolute right-0 bottom-[10%] z-30 w-[calc(100%-100px)] sm:bottom-[24%] sm:w-[calc(100%-40px)] md:right-auto md:bottom-[12%] md:left-20 md:w-[calc(100%-160px)]">
          {images.map((image, index) => (
            <div
              key={`text-group-${index}`}
              className={index === currentIndex ? "block" : "hidden"}
            >
              <div className={`text-${index} mb-4 flex items-center gap-4`}>
                <div className="h-[1px] w-12 bg-zinc-300" />
                <p className="font-[family-name:var(--font-mixed)] text-[10px] tracking-[0.3em] text-zinc-500 uppercase md:text-xs">
                  {image.subtitle}
                </p>
              </div>
              <h2
                className={`text-${index} font-[family-name:var(--font-anton)] text-5xl leading-tight tracking-wider text-zinc-900 uppercase md:text-7xl lg:text-8xl`}
              >
                {image.title}
              </h2>
              {image.desc && (
                <p
                  className={`text-${index} mt-10 ml-16 max-w-sm border-l border-zinc-200 pl-6 text-xs leading-relaxed tracking-wider text-zinc-500 md:text-sm`}
                >
                  {image.desc}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* --- 🖱️ Scroll Indicator --- */}
        <div className="absolute right-auto bottom-24 left-8 z-50 flex flex-col items-end gap-4 overflow-hidden sm:bottom-8 md:right-12 md:bottom-40 md:left-auto md:items-start lg:bottom-12">
          <span
            className="vertical-text font-[family-name:var(--font-michroma)] text-[6px] tracking-[0.2em] text-zinc-400 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            scroll down
          </span>
          <div className="relative h-12 w-[1px] overflow-hidden bg-zinc-200/30">
            <div className="animate-scroll-line-inner absolute inset-0 bg-zinc-400" />
          </div>
        </div>
      </div>

      <FluidMaskPrimary />
    </section>
  );
};
