"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[939px] w-full overflow-hidden bg-white md:h-[590px] md:min-h-0 lg:[height:var(--hero-h-pc)]"
      aria-label="メインビジュアル"
    >
      {/* SP shape */}
      <Image
        src="/assets/images/top/hero-shape-sp.svg"
        alt=""
        width={160}
        height={120}
        priority
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[120px] w-[160px] object-cover select-none md:hidden"
      />

      {/* Tablet shape */}
      <Image
        src="/assets/images/top/hero-shape-tab.svg"
        alt=""
        width={768}
        height={464}
        priority
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 hidden w-full select-none md:block lg:hidden"
        style={{
          height: "calc(100vw * 464 / 768)",
        }}
      />

      {/* PC shape */}
      <Image
        src="/assets/images/top/hero-shape.svg"
        alt=""
        width={1366}
        height={640}
        priority
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 hidden w-full select-none lg:block"
        style={{
          height: "calc(100vw * 640 / 1366)",
        }}
      />

      {/* outer padding */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-5 pt-20 pb-20 md:px-9 md:pt-[88px] md:pb-20 lg:px-[113px] lg:pt-[88px] lg:pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col items-center md:max-w-[696px] md:flex-row md:items-start md:justify-between lg:max-w-[1140px] lg:gap-[72px]"
        >
          {/*
            SP: hero-imageを先に、hero-bodyを後に
            Tab/PC: flex-rowで横並び（orderで制御）
          */}

          {/* hero-image */}
          {/* hero-image */}
          <motion.div
            variants={fadeUp}
            className="relative order-first w-full max-w-[335px] shrink-0 md:order-last md:w-[380px] md:max-w-none lg:w-[620px]"
          >
            {/* <picture>
              <source
                media="(min-width: 1366px)"
                srcSet="/assets/images/top/hero-character.webp"
                width={620}
                height={470}
              />
              <source
                media="(min-width: 768px)"
                srcSet="/assets/images/top/hero-character-tab.webp"
                width={380}
                height={380}
              />
              <img
                src="/assets/images/top/hero-character-sp.webp"
                alt="Toshiyuki Kurashima 3D character"
                width={335}
                height={438}
                fetchPriority="high"
                decoding="async"
                className="h-auto w-full object-contain object-bottom"
              />
            </picture> */}
            <Image
              src="/assets/images/top/hero-character.webp"
              alt=""
              width={880}
              height={944}
              className=""
            />
          </motion.div>

          {/* hero-body */}
          <div className="order-last flex w-full flex-col items-start gap-10 pt-5 pr-[15px] pb-5 md:order-first md:w-[280px] md:gap-12 md:pt-0 md:pr-0 md:pb-[15px] lg:w-[448px] lg:gap-20 lg:pt-4 lg:pr-0 lg:pb-4">
            {/* hero-text */}
            <div className="flex w-full flex-col items-start gap-6 lg:gap-10">
              <motion.h1
                variants={fadeUp}
                className="font-zalando text-[32px] leading-[1.15] font-bold md:text-[44px] lg:text-[64px] lg:leading-[1.1]"
              >
                SELECTED
                <br />
                WORKS
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="w-full text-[14px] leading-[2] text-[#333] md:text-[16px]"
              >
                作って、渡して、終わり――じゃない。
                <br />
                デザインから実装、運用設計まで、
                <br />
                <strong>現場が自走できる仕組みごと、つくります。</strong>
              </motion.p>
            </div>

            {/* button-list
              SP:  2col×2row（3ボタン＋空1セル）
              Tab: 2col×2row、col-gap 20px
              PC:  w-[330px]、col-gap 10px
            */}
            <motion.div
              variants={fadeUp}
              className="grid w-full grid-cols-2 gap-x-[10px] gap-y-[10px] md:gap-x-5 lg:w-[330px] lg:gap-x-[10px]"
            >
              <HeroButton href="#about" label="ABOUT" />
              <HeroButton href="#toolbox" label="TOOLBOX" />
              <HeroButton href="#works" label="WORKS" />
              {/* 4セル目は空 */}
              <div aria-hidden="true" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      scroll={true}
      className="bg-primary border-primary hover:text-primary flex h-[44px] w-full items-center justify-center rounded-full border px-10 text-[13px] font-semibold tracking-widest text-white transition-all duration-200 hover:bg-white"
    >
      {label}
    </Link>
  );
}
