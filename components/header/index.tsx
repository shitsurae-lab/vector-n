'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // アイコンをインポート
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Works', href: '/works' },
  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className='w-full'>
      {/* --- 左上: ロゴ --- */}
      <div className='fixed top-6 left-4 sm:left-6 z-[60] flex flex-col items-start gap-1'>
        <Link href='/'>
          <Image
            src='/logo-thin-y@2x.webp'
            alt='Vector n'
            width={264}
            height={254}
            className='w-[30%] min-w-[80px] max-w-[160px] md:max-w-[80px] h-auto object-contain' // 高さをクラスで制御するとレスポンシブが楽です
            priority
          />
        </Link>
        <span className='text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 leading-none'>
          Designer / Engineer
        </span>
      </div>

      {/* --- PC版: 右上・縦並びナビゲーション --- */}
      <nav className='hidden md:flex flex-col items-end gap-4 fixed top-6 right-6 z-50 text-right'>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className='text-sm font-bold tracking-[0.2em] hover:opacity-60 transition-all uppercase drop-shadow-sm'
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* --- モバイル版: ハンバーガーメニュー --- */}
      <div className='md:hidden fixed top-4 right-4 z-40'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='relative h-12 w-12 hover:bg-transparent focus-visible:ring-0'
            >
              {/* アイコンのアニメーション切り替え */}
              <div className='relative h-8 w-8'>
                <Menu
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300`}
                />
                <span className='sr-only'>Open menu</span>
              </div>
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side='right'
            className='w-[80%] sm:w-[350px] flex flex-col items-center justify-center'
          >
            <nav className='flex flex-col items-center gap-10'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // 遷移時に閉じる
                  className='text-2xl font-bold tracking-widest uppercase hover:opacity-50'
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
