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
        className="pointer-events-none z-[60] grid h-[120px] w-[96px] place-items-center rounded-br-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.6)_40%,_rgba(255,255,255,0.2)_70%,_transparent_100%)] backdrop-blur-[6px] md:h-[150px] md:w-[120px] md:bg-none md:backdrop-blur-none"
      >
        {isHomePage ? (
          <h1 className="m-0 leading-none">
            <Link href="/" className="pointer-events-auto block">
              <Image
                src="/logo-vector@2x.webp"
                alt="Vector-n | Toshiyuki Kurashima's Portfolio"
                width={160}
                height={200}
                className="h-auto w-[64px] object-contain md:w-[80px]"
                priority
              />
            </Link>
          </h1>
        ) : (
          <div className="leading-none">
            <Link href="/" className="pointer-events-auto block">
              <Image
                src="/logo-thin-y@2x.webp"
                alt="Vector-n | Toshiyuki Kurashima's Portfolio"
                width={80}
                height={102}
                className="h-auto w-[80px] object-contain"
                priority
              />
            </Link>
          </div>
        )}
      </motion.div>

      {/* --- PC版: 右上・縦並びナビゲーション --- */}
      <nav className="z-50 hidden p-6 md:flex">
        <NavLinks
          pathname={pathname}
          className="flex flex-col items-end gap-4"
        />
      </nav>

      {/* --- モバイル版: ハンバーガーメニュー --- */}
      <div className="z-40 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-12 w-12 hover:bg-transparent focus-visible:ring-0"
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
                onItemClick={() => setIsOpen(false)}
                className="flex flex-col items-center gap-10"
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
