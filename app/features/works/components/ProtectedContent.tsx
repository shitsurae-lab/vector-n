'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import he from 'he';
import { WorkData } from '../api/works'; // APIファイルから型をインポート
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Search, ZoomIn } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  slug: string;
  categorySlug: string;
  initialWork: WorkData;
};

export const ProtectedContent = ({
  slug,
  categorySlug,
  initialWork,
}: Props) => {
  const [password, setPassword] = useState('');
  const [workData, setWorkData] = useState<WorkData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // 初回読み込み時、もし最初から保護されていなければデータを表示
  useEffect(() => {
    if (!initialWork.content.protected) {
      setWorkData(initialWork);
    }
  }, [initialWork]);

  // パスワード認証
  const handleVerify = async () => {
    setLoading(true);
    setError(false);
    const url = `https://naname-lab.net/wp-json/wp/v2/achievement?slug=${slug}&password=${password.trim()}&_embed`;

    try {
      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setWorkData(data[0] as WorkData);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workData) return;

    const sections = gsap.utils.toArray<HTMLElement>('section.story-section');

    sections.forEach((section) => {
      const elements = section.querySelectorAll('.animate-item');

      gsap.fromTo(
        elements,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2, // 0.2秒刻みで順番に発火
          scrollTrigger: {
            trigger: section,
            start: 'top 85%', // 画面の下から15%の位置に来たら開始
            toggleActions: 'play none none none', // 1回だけ再生
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [workData]);

  // 🔓 認証成功後、または元々公開されている場合のレイアウト
  if (workData) {
    const detail = workData.acf?.work_detail;
    const title = he.decode(workData.title.rendered);
    const displayImage =
      workData.acf?.work_detail.next_api_image ||
      workData._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const subImages = [
      detail?.sub_image_01,
      detail?.sub_image_02,
      detail?.sub_image_03,
      detail?.sub_image_04,
    ].filter(Boolean);

    return (
      <div className='animate-in fade-in duration-700'>
        {/* 1. ヒーローエリア (左右突き抜け) */}
        <section className='relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-zinc-50 py-20 mb-12 border-b border-zinc-100'>
          <div className='max-w-4xl mx-auto px-6 text-center'>
            <span className='text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase block mb-4'>
              {categorySlug}
            </span>
            <h1 className='text-2xl md:text-4xl font-black mb-10 leading-tight text-zinc-900'>
              {title}
            </h1>
            {displayImage && (
              <div className='max-w-[880px] mx-auto overflow-hidden rounded-xl shadow-2xl bg-white'>
                <img
                  src={displayImage}
                  alt={title}
                  className='w-full h-auto block'
                />
              </div>
            )}
          </div>
        </section>

        <div className='max-w-4xl mx-auto px-6'>
          {/* 2. パンくず */}
          <nav className='text-[10px] font-bold text-zinc-400 mb-12 flex gap-2 tracking-widest uppercase'>
            <Link href='/' className='hover:text-black transition-colors'>
              HOME
            </Link>{' '}
            /
            <Link
              href={`/works/${categorySlug}`}
              className='hover:text-black transition-colors'
            >
              {categorySlug}
            </Link>{' '}
            /<span className='text-zinc-800'>{title}</span>
          </nav>

          {/* 3. スペック表 (shadcn/ui Table + レスポンシブ縦線) */}
          <section className='mb-24'>
            <div className='rounded-lg border border-zinc-200 overflow-hidden shadow-sm'>
              <Table>
                <TableBody>
                  {[
                    { label: '制作期間', value: detail?.period },
                    { label: '担当分野', value: detail?.role },
                    { label: 'Design Tools', value: detail?.tools_design },
                    { label: 'Coding Tools', value: detail?.tools_coding },
                    {
                      label: 'URL',
                      value: detail?.site_url ? (
                        <a
                          href={detail.site_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600 font-bold hover:text-blue-800 hover:underline inline-flex items-center gap-1 transition-all'
                        >
                          サイトを閲覧する
                          <svg
                            className='w-3 h-3'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                            ></path>
                          </svg>
                        </a>
                      ) : (
                        '非公開'
                      ),
                    },
                  ].map((spec, i) => (
                    <TableRow
                      key={i}
                      className='flex flex-col md:table-row border-b last:border-0 hover:bg-transparent'
                    >
                      <TableCell className='font-bold bg-zinc-50/50 w-full md:w-[200px] md:border-r border-zinc-200 py-4 px-6 text-zinc-500 text-[10px] uppercase tracking-widest'>
                        {spec.label}
                      </TableCell>
                      <TableCell className='py-4 px-6 text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed'>
                        {spec.value || '---'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 4. ストーリーセクション (パターンB) */}
          <div className='space-y-40 mb-32'>
            {[
              {
                label: 'Background',
                title: 'なぜ、この制作が必要だったのか。',
                body: detail?.background,
              },
              {
                label: 'Design',
                title: '誰に、何を届けるためのデザインか。',
                body: detail?.design_intent,
              },
              {
                label: 'Intent',
                title: 'デザインと実装を繋ぐ、論理の構築',
                body: detail?.creative_logic,
              },
              {
                label: 'Result',
                title: '完成後に見えてきた新しい課題と手応え。',
                body: detail?.results,
              },
            ].map(
              (item, i) =>
                item.body && (
                  <section
                    key={i}
                    className='story-section max-w-2xl mx-auto text-center'
                  >
                    {/* ラベル: 繊細なラインで囲む */}
                    <div className='animate-item flex items-center justify-center gap-4 mb-6'>
                      <div className='h-[1px] w-4 bg-zinc-200'></div>
                      <span className='text-[10px] font-bold tracking-[0.3em] zinc-200 uppercase'>
                        {item.label}
                      </span>
                      <div className='h-[1px] w-4 bg-zinc-200'></div>
                    </div>

                    <h3 className='animate-item text-xl md:text-2xl lg:text-3xl font-bold text-zinc-900 mb-8 tracking-tight'>
                      {item.title}
                    </h3>

                    {/* 本文: 左寄せにしつつ、読みやすさを追求 */}
                    <p className='animate-item text-left text-[15px] lg:text-base leading-[2] text-zinc-500 whitespace-pre-wrap font-medium'>
                      {item.body}
                    </p>
                  </section>
                ),
            )}
          </div>

          {/* 5. サブ画像 */}
          {subImages.length > 0 && (
            <section className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-32'>
              {subImages.map((img, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <div className='group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-zinc-100 bg-white aspect-video relative'>
                      <img
                        src={img as string}
                        alt=''
                        className='w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90'
                      />
                      {/* 虫眼鏡アイコンなどを出すと親切 */}
                      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40'>
                        <div className='flex flex-col items-center gap-2'>
                          <ZoomIn className='w-8 h-8 text-white animate-in zoom-in-75 duration-300' />
                          <span className='text-[10px] font-bold text-white tracking-widest uppercase'>
                            View Image
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  {/* 拡大表示される中身 */}
                  <DialogContent className='max-w-[95vw] max-h-[95vh] border-none bg-transparent p-0 shadow-none overflow-hidden flex items-center justify-center'>
                    <div className='relative max-w-[90vw] max-h-[90vh]'>
                      <img
                        src={img as string}
                        alt=''
                        className='w-full h-auto max-h-[90vh] object-contain rounded-lg animate-in zoom-in-95 duration-300'
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </section>
          )}

          {/* 6. 一覧へ*/}
          <section className='mt-20 py-20 border-t border-zinc-100 text-center'>
            <Link
              href={`/works/${categorySlug}`}
              className='inline-block px-12 py-4 bg-zinc-900 text-white text-[10px] font-bold tracking-widest rounded-full hover:bg-black transition-all shadow-xl uppercase'
            >
              {categorySlug} の実績一覧へ
            </Link>
          </section>
        </div>
      </div>
    );
  }
  // 🔒 認証待ちの状態
  return (
    <div className='max-w-4xl mx-auto px-6 py-32 text-center animate-in fade-in duration-500'>
      <div className='bg-zinc-50 p-12 rounded-3xl border-2 border-dashed border-zinc-200'>
        <p className='text-4xl mb-6'>🔒</p>
        <h2 className='text-xl font-bold text-zinc-900 mb-2'>
          Protected Content
        </h2>
        <p className='text-zinc-500 mb-10 text-sm'>
          この実績の閲覧にはパスワードが必要です。
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size='lg'
              className='px-10 rounded-full font-bold shadow-lg hover:scale-105 transition-transform'
            >
              パスワードを入力して閲覧
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle className='text-center'>Authentication</DialogTitle>
            </DialogHeader>
            <div className='py-6 space-y-6'>
              <Input
                type='password'
                placeholder='Enter password...'
                className='text-center py-6 focus-visible:ring-zinc-400'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
              {error && (
                <p className='text-red-500 text-xs text-center font-bold'>
                  パスワードが正しくありません。
                </p>
              )}
              <Button
                onClick={handleVerify}
                className='w-full py-6 font-bold'
                disabled={loading}
              >
                {loading ? '認証中...' : '閲覧する'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
