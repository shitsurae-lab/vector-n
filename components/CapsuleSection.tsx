'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type CapsuleItem = {
  id: string;
  enTitle: string;
  jaTitle: string;
  image: string;
};

export const CapsuleSection = ({ items }: { items: CapsuleItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!items?.length || !containerRef.current) return;

      // 1. 初期状態をGSAPで一括セット（CSSのopacity-0等に頼りすぎない）
      gsap.set('.animate-target', { opacity: 0, y: 40 });

      // Timelineを作成して、順番（ステージ）を管理
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%', // 画面の70%位置で開始
          once: true, // 1回だけ実行
        },
      });

      tl.to('.animate-target', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15, // 👈 これで H2 -> P -> Button -> LI が順番に動く
      });
    },
    { scope: containerRef, dependencies: [items] },
  );

  return (
    <section
      ref={containerRef}
      className='relative 100svh pt-20 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden'
    >
      <div className='bg-[#f3f1ee] py-[10vh] min-h-[80vh] rounded-[50vw_50vw_0_0]'>
        <div className='max-w-5xl mx-auto px-6 pt-10'>
          {/* opacity-0 と translate-y-8 で初期状態を隠す */}
          <h2 className='animate-target opacity-0 translate-y-8 text-center text-4xl md:text-5xl font-black tracking-[0.2em] mb-4 text-gray-800 uppercase'>
            about
          </h2>
          <p className='animate-target w-full px-4 md:max-w-2xl mx-auto mb-10 text-center md:text-left'>
            現場でのEC運営経験を糧に、職人のような丁寧なモノづくりを追求しています。
            誰もが迷わず、未来の変更に耐えうる「血の通った設計」が、私のスタイルです
          </p>

          {/* 4. Button (shadcn/ui) */}
          <div className='animate-target text-center mb-10'>
            <Button
              asChild
              className='rounded-full px-8 py-6 bg-zinc-900 text-white hover:bg-zinc-700 hover:text-white border-none transition-all'
            >
              <Link href='/about'>View More About</Link>
            </Button>
          </div>

          <ul
            className='flex overflow-x-auto pt-3 snap-x snap-mandatory gap-8 justify-start md:justify-center px-[10vw] md:px-0 no-scrollbar'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className='animate-target opacity-0 translate-y-10 flex-none w-[70%] md:w-[28%] snap-center'
              >
                <div className='group relative aspect-[2/3] overflow-hidden rounded-full transition-transform duration-500 hover:-translate-y-3 shadow-sm border border-black/5 bg-slate-200'>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.enTitle}
                      fill
                      className='object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                  ) : (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <span className='text-gray-400 text-[14px] tracking-[0.3em] font-bold'>
                        {item.enTitle}
                      </span>
                    </div>
                  )}
                  {/* ホバー時のオーバーレイ */}
                  {/* ホバー時のテキスト表示 */}
                  <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-white text-center'>
                    <span className='text-xs tracking-widest uppercase mb-2'>
                      {item.enTitle}
                    </span>
                    <span className='text-[12px] opacity-80'>
                      {item.jaTitle}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
