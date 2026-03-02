"use client";

import * as React from "react";
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

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Works", href: "/works" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full">
      {/* --- 左上: ロゴ --- */}
      <div className="pointer-events-none fixed top-0 left-0 z-[60] flex h-[160px] w-[140px] items-center justify-center rounded-br-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.6)_40%,_rgba(255,255,255,0.2)_70%,_transparent_100%)] backdrop-blur-[6px] md:bg-none md:backdrop-blur-none">
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
      <nav className="fixed top-6 right-6 z-50 hidden md:flex">
        <NavLinks
          pathname={pathname}
          className="flex flex-col items-end gap-4"
        />
      </nav>

      {/* --- モバイル版: ハンバーガーメニュー --- */}
      <div className="fixed top-4 right-4 z-40 md:hidden">
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
    </header>
  );
};
