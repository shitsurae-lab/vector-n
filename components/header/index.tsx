"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react"; // アイコンをインポート
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { NavLinks } from "./nav-links";
import { AnimatedHamburger } from "./AnimatedHamburger";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  //1. headerの高さを取得
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  //2. スクロール検知の設定
  const { scrollY } = useScroll();
  //2. ※rawの変異を作成
  const rawScale = useTransform(scrollY, [0, 100], [1, 0.8]);
  const [hidden, setHidden] = useState(false);

  // 3. ①スクロール0px〜100pxの間で、パディングを 40px から 10px に変化させる
  const headerPadding = useTransform(scrollY, [0, 100], ["40px", "10px"]);
  // 3. ②rawの変位をuseSpringに通す
  const logoScale = useSpring(rawScale, {
    stiffness: 100, // 剛性（高いほどキビキビ動く）
    damping: 30, // 減衰（高いほど揺れがすぐ収まる）
    restDelta: 0.001,
  });

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // 100px以上スクロールし、かつ下方向なら隠す
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      ref={headerRef}
      variants={{
        visible: { y: 0 },
        // 取得した動的な高さ分だけマイナスに動かす
        hidden: { y: -headerHeight },
      }}
      animate={hidden ? "hidden" : "visible"}
      // style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 z-50 flex w-full justify-between"
    >
      {/* --- 左上: ロゴ --- */}
      <motion.div
        style={{ scale: logoScale }}
        className="pointer-events-none z-[60] grid h-[80px] w-[64px] place-items-center md:h-[88px] md:w-[88px]"
      >
        {/* ─── Logo (mark + text) ─── */}
        {/*
            PC/Tablet: mark 38×48px + text 234px / SP: mark 32×40px + text 210px
            ロゴ画像: public/images/logo.svg (マークのみ)
            テキスト: "Toshiyuki Kurashima" — ZalandoSans相当 → var(--font-display) で代替
          */}
        {isHomePage ? (
          <h1 className="m-0 leading-none">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="トップページへ"
            >
              {/* Logo mark */}
              <Image
                src="/assets/logo-vector@2x.webp"
                alt="Toshiyuki Kurashima logo mark"
                width={38}
                height={48}
                priority
                className="h-[40px] w-[32px] md:h-[48px] md:w-[38px]"
              />

              {/* Logo text — always visible (unlike the old scrolled-only behavior) */}
              <span className="font-zalando w-[210px] text-[18px] leading-[1.1] font-medium whitespace-nowrap text-[#333] uppercase md:w-[234px] md:text-[20px]">
                Toshiyuki Kurashima
              </span>
            </Link>
          </h1>
        ) : (
          <div className="leading-none">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="トップページへ"
            >
              {/* Logo mark */}
              <Image
                src="/assets/logo-vector@2x.webp"
                alt="Toshiyuki Kurashima logo mark"
                width={38}
                height={48}
                priority
                className="h-[40px] w-[32px] md:h-[48px] md:w-[38px]"
              />

              {/* Logo text — always visible (unlike the old scrolled-only behavior) */}
              <span className="font-zalandow-[210px] text-[18px] leading-[1.1] font-medium whitespace-nowrap text-[#333] uppercase md:w-[234px] md:text-[20px]">
                Toshiyuki Kurashima
              </span>
            </Link>
          </div>
        )}
      </motion.div>

      {/* --- PC版: 右上・縦並びナビゲーション --- */}
      <nav className="z-50 hidden p-6 md:flex">
        <NavLinks
          pathname={pathname}
          variant="horizontal"
          className="hidden items-center gap-10 md:flex"
        />
      </nav>

      {/* --- モバイル版: ハンバーガーメニュー --- */}
      <div className="z-40 mt-2 mr-2 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 hover:bg-transparent focus-visible:ring-0"
            >
              {/* アイコンのアニメーション切り替え */}
              {/* <div className="relative h-8 w-8">
                <Menu
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300`}
                />
                <span className="sr-only">Open menu</span>
              </div> */}
              <AnimatedHamburger isOpen={isOpen} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-[80%] flex-col items-center justify-center sm:w-[350px]"
          >
            <nav>
              <NavLinks
                pathname={pathname}
                variant="drawer"
                onItemClick={() => setIsOpen(false)}
                className="flex flex-col"
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      {/* デバッグ用: 取得したheaderの高さ */}
      {/* <div className="absolute top-40 left-4 text-red-500">
        Height: {headerHeight}px
      </div> */}
    </motion.header>
  );
};
