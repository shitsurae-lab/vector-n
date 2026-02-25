"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type WorkHeroProps = {
  src: string;
  title: string;
  categoryName: string;
  date: string;
  alt: string;
};

export const WorkHero = ({
  src,
  title,
  categoryName,
  date,
  alt,
}: WorkHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainMaskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mainMask = mainMaskRef.current;
      const textLayer = textRef.current;
      if (!mainMask || !textLayer) return;

      const mainImg = mainMask.querySelector("img");
      const animateTexts = textLayer.querySelectorAll(".animate-text");
      if (!mainImg || animateTexts.length === 0) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        mainMask,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 2.5, ease: "expo.inOut" },
      )
        .fromTo(mainImg, { scale: 1.3 }, { scale: 1, duration: 3 }, "<")
        .fromTo(
          animateTexts,
          { opacity: 0, x: -30 }, // 左からふわっと
          { opacity: 1, x: 0, duration: 1.5, stagger: 0.2 },
          "-=1.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative right-[50%] left-[50%] -mr-[50vw] mb-16 -ml-[50vw] h-[80vh] w-screen overflow-hidden bg-[#f8f6f3]"
    >
      {/* メイン画像（右配置：right-0 md:right-16） */}
      <div
        ref={mainMaskRef}
        className="absolute top-0 right-0 z-10 h-full w-full overflow-hidden rounded-b-[100px] md:right-16 md:h-[calc(100%-120px)] md:w-[62.5vw] md:rounded-b-[400px]"
      >
        <Image src={src} alt={alt} fill priority className="object-cover" />
      </div>

      {/* テキストエリア（左配置） */}
      <div
        ref={textRef}
        className="pointer-events-none absolute bottom-12 left-8 z-20 md:left-24"
      >
        <div className="animate-text mb-2 text-xs tracking-[0.3em] uppercase opacity-60">
          {categoryName} / {date}
        </div>
        <h1 className="animate-text max-w-[80vw] text-3xl leading-tight font-bold text-slate-900 md:max-w-2xl md:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
};
