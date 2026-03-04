"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  //1. headerの高さを取得
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  //2. スクロール検知の設定
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

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
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 z-50 w-full"
    >
      {/* --- 左上: ロゴ --- */}
      <div className="pointer-events-none relative top-0 left-0 z-[60] flex h-[160px] w-[140px] items-center justify-center rounded-br-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.6)_40%,_rgba(255,255,255,0.2)_70%,_transparent_100%)] backdrop-blur-[6px] md:bg-none md:backdrop-blur-none">
        <Link href="/" className="pointer-events-auto">
          <Image
            src="/logo-thin-y@2x.webp"
            alt="Vector n"
            width={80}
            height={102}
            className="h-auto w-[80px] object-contain"
            priority
          />
        </Link>
      </div>

      {/* --- PC版: 右上・縦並びナビゲーション --- */}
      <nav className="absolute top-6 right-6 z-50 hidden md:flex">
        <NavLinks
          pathname={pathname}
          className="flex flex-col items-end gap-4"
        />
      </nav>

      {/* --- モバイル版: ハンバーガーメニュー --- */}
      <div className="absolute top-4 right-4 z-40 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-12 w-12 hover:bg-transparent focus-visible:ring-0"
            >
              {/* アイコンのアニメーション切り替え */}
              <div className="relative h-8 w-8">
                <Menu
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300`}
                />
                <span className="sr-only">Open menu</span>
              </div>
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
