"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ProductProps {
  index: number;
  num: string;
  enTitle: string;
  jaTitle: string;
  category: string;
  link: string;
  imageHref: string;
  ctaText: string; // テキストフィールドの値をそのまま受け取る
  isAbout?: boolean;
}

export const MorphingContainer = ({
  index,
  num,
  enTitle,
  jaTitle,
  category,
  link,
  imageHref,
  ctaText,
  isAbout = false,
}: ProductProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // すべて18ポイント（Cコマンド18個）で統一
  const pathInitial =
    "M0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0C0,0,0,0,0,0Z";

  const shape1 =
    "M0,-20C4.5,-20,9,-15.5,11.4,-10C13.8,-4.5,14,-0.5,12.8,4.1C11.6,8.7,9,14,0,14C-9,14,-11,10,-12,5C-13,0,-12.5,-5.5,-8.9,-10.6C-5.3,-15.7,-3,-20,0,-20C0,-20,0,-20,0,-20C0,-20,0,-20,0,-20C0,-20,0,-20,0,-20C0,-20,0,-20,0,-20C0,-20,0,-20,0,-20C0,-20,0,-20,0,-20C0,-20,0,-20,0,-20C0,-20,0,-20,0,-20Z";

  const shape2 =
    "M8.1,-8.5C18,-8.5,35,-8.5,45,-4.3C55,0,53.2,5,53.2,10C53.2,15,55,25,45,35C35,45,18,48.5,8.1,48.5C-2,48.5,-10,48.5,-15,40C-20,31.5,-20.8,20,-20.8,10C-20.8,0,-20,-4.3,-15,-6.4C-10,-8.5,-2,-8.5,8.1,-8.5C8.1,-8.5,8.1,-8.5,8.1,-8.5C8.1,-8.5,8.1,-8.5,8.1,-8.5C8.1,-8.5,8.1,-8.5,8.1,-8.5C8.1,-8.5,8.1,-8.5,8.1,-8.5C8.1,-8.5,8.1,-8.5,8.1,-8.5C8.1,-8.5,8.1,-8.5,8.1,-8.5Z";

  const shape3 =
    "M8.3,78.2C2,85,40,70,60.3,60C80.6,50,87.7,21.9,85,2.7C82.3,-16.5,65.7,-32.8,49.3,-38.5C32.9,-44.2,16.4,-39.2,-0.5,-39.7C-17.4,-40.2,-34.7,-46.1,-49.3,-40.4C-63.9,-34.7,-76,-17.3,-70,-6C-64,5.3,-40,10.7,-25.3,26.8C-10.6,42.9,-5.3,69.9,8.3,78.2C8.3,78.2,8.3,78.2,8.3,78.2C8.3,78.2,8.3,78.2,8.3,78.2C8.3,78.2,8.3,78.2,8.3,78.2C8.3,78.2,8.3,78.2,8.3,78.2C8.3,78.2,8.3,78.2,8.3,78.2C8.3,78.2,8.3,78.2,8.3,78.2Z";

  const shape4 =
    "M30.1,-52.5C40.6,-46.1,51.7,-41.2,59.6,-32.7C67.5,-24.2,72.3,-12.1,69.3,-1.7C66.3,8.7,55.7,17.3,46.1,22.9C36.5,28.6,28,31.1,20.5,35.6C13,40.1,6.5,46.6,-2.1,50.2C-10.6,53.8,-21.3,54.6,-28,49.6C-34.8,44.7,-37.6,34,-43.1,24.8C-48.7,15.6,-56.9,7.8,-59.5,-1.5C-62.1,-10.8,-59.1,-21.6,-51.4,-27C-43.7,-32.5,-31.3,-32.6,-21.9,-39.6C-12.6,-46.7,-6.3,-60.7,1.8,-63.7C9.8,-66.8,19.7,-58.9,30.1,-52.5Z";

  const shape5 =
    "M0.4,-86C15,-86,30,-80.5,42.9,-71.7C55.8,-62.9,66.6,-51.8,72.3,-38.8C78,-25.8,78.6,-10.9,78,3.7C77.5,18.2,75.6,32.4,70,45.5C64.3,58.6,54.8,70.5,42.5,78.6C30.2,86.6,15.1,90.8,0.4,90C-14.2,89.3,-28.5,83.6,-39.8,75C-51.2,66.4,-59.7,54.9,-67.1,42.6C-74.5,30.2,-80.8,17.1,-80.5,4.2C-80.2,-8.8,-73.2,-21.5,-65.9,-34C-58.6,-46.5,-50.9,-58.7,-39.9,-68.6C-28.8,-78.5,-14.4,-86,0.4,-86C0.4,-86,0.4,-86,0.4,-86C0.4,-86,0.4,-86,0.4,-86C0.4,-86,0.4,-86,0.4,-86C0.4,-86,0.4,-86,0.4,-86C0.4,-86,0.4,-86,0.4,-86C0.4,-86,0.4,-86,0.4,-86Z";

  const pathFinal =
    "M0,-95C17,-95,33,-91,46,-83C59,-75,69,-63,73,-48C77,-33,75,-17,75,0C75,17,73,33,69,48C65,63,55,75,42,83C29,91,15,95,0,95C-15,95,-29,91,-42,83C-55,75,-65,63,-69,48C-73,33,-75,17,-75,0C-75,-17,-73,-33,-69,-48C-65,-63,-55,-75,-42,-83C-29,-91,-15,-95,0,-95C0,-95,0,-95,0,-95C0,-95,0,-95,0,-95Z";

  const isEven = index % 2 === 1;

  useGSAP(
    () => {
      if (!pathRef.current || !contentRef.current) return;

      gsap.set(pathRef.current, { attr: { d: pathInitial } });
      gsap.set(contentRef.current, { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        //Aboutページの場合、アニメーション終了後、ループ開始
        onComplete: () => {
          if (isAbout) {
            gsap.to(pathRef.current, {
              attr: { d: shape5 }, //楕円から少し歪んだ形へ
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        },
      });

      tl.to(pathRef.current, {
        attr: { d: shape1 },
        duration: 0.5,
        ease: "power1.inOut",
      })
        .to(pathRef.current, {
          attr: { d: shape2 },
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(pathRef.current, {
          attr: { d: shape3 },
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(pathRef.current, {
          attr: { d: shape4 },
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(pathRef.current, {
          attr: { d: shape5 },
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(pathRef.current, {
          attr: { d: pathFinal },
          duration: 1.2,
          ease: "power1.inOut",
        })
        .to(
          contentRef.current,
          { y: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" },
          "-=0.5",
        );
    },
    { scope: containerRef, dependencies: [isAbout] },
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 px-6 py-24 md:gap-24 md:px-16`}
    >
      {/* 左側：モーフィング画像領域 */}
      <div className="w-full basis-full md:basis-3/5">
        <svg
          viewBox="0 0 200 200"
          className="h-auto w-full overflow-visible drop-shadow-xl"
        >
          <defs>
            <clipPath id={`mask-${num}`}>
              <path ref={pathRef} transform="translate(100 100)" />
            </clipPath>
          </defs>
          <image
            href={imageHref}
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#mask-${num})`}
          />
        </svg>
      </div>

      {/* 右側：テキストコンテンツ領域 */}
      <div
        ref={contentRef}
        className="basis-full space-y-8 text-left md:basis-2/5"
      >
        <div className="text-6xl leading-none font-light tabular-nums opacity-10">
          {num}
        </div>
        <div className="space-y-3">
          <h3 className="text-4xl leading-[0.9] font-black tracking-tighter uppercase md:text-5xl">
            {enTitle}
          </h3>
          <p className="text-lg font-medium tracking-[0.3em] text-gray-700">
            {jaTitle}
          </p>
        </div>
        <div className="border-y border-black/10 py-6 text-sm leading-relaxed tracking-wider whitespace-pre-wrap text-gray-500">
          {category}
        </div>
        <div className="pt-4">
          <Link
            href={link}
            className="group inline-flex items-center gap-6 rounded-full border border-black px-12 py-4 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-500 hover:bg-black hover:text-white"
          >
            {ctaText}
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
