import Link from 'next/link';
import he from 'he';
import { NAV_PATHS, type NavPath } from '@/app/constants/config';

type Props = {
  parent?: NavPath;
  category?: {
    name: string; // 表示用（例: Web Design）
    slug: string; // URL用（例: web-design）
  };
  title?: string; // 投稿タイトル（WPの title.rendered）
};

export const Breadcrumbs = ({ parent, category, title }: Props) => {
  return (
    <nav className='flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase py-6 overflow-x-auto whitespace-nowrap scrollbar-hide'>
      {/* 1. HOME */}
      <Link
        href={NAV_PATHS.HOME.path}
        className='hover:text-zinc-900 transition-colors shrink-0'
      >
        {NAV_PATHS.HOME.label}
      </Link>

      {/* 2. Parent (WORKS など) */}
      {parent && parent.path !== '/' && (
        <>
          <span className='text-zinc-300 shrink-0'>/</span>
          {category || title ? (
            <Link
              href={`/${parent.path}`}
              className='hover:text-zinc-900 transition-colors shrink-0'
            >
              {parent.label}
            </Link>
          ) : (
            <span className='text-zinc-900 shrink-0'>{parent.label}</span>
          )}
        </>
      )}

      {/* 3. Category (カスタム投稿のタクソノミー) */}
      {category && (
        <>
          <span className='text-zinc-300 shrink-0'>/</span>
          {title ? (
            <Link
              href={`/${parent?.path || 'works'}/${category.slug}`}
              className='hover:text-zinc-900 transition-colors shrink-0'
            >
              {category.name}
            </Link>
          ) : (
            <span className='text-zinc-900 shrink-0'>{category.name}</span>
          )}
        </>
      )}

      {/* 4. Title (投稿詳細) */}
      {title && (
        <>
          <span className='text-zinc-300 shrink-0'>/</span>
          <span className='text-zinc-900 truncate max-w-[150px] md:max-w-[300px]'>
            {he.decode(title)}
          </span>
        </>
      )}
    </nav>
  );
};
