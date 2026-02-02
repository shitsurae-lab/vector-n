import { NAV_PATHS } from '@/app/constants/config';
import Link from 'next/link';
import he from 'he';

type Props = {
  category: string;
  title: string;
};

export const Breadcrumbs = ({ category, title }: Props) => {
  return (
    // 🍞 パンくずリスト
    <nav className='flex gap-2 text-sm text-gray-500 mb-6'>
      <Link href='/' className='hover:underline'>
        HOME
      </Link>
      <span>/</span>
      <Link
        href={`/${NAV_PATHS.WORKS.path}/${category}`}
        className='hover:underline capitalize'
      >
        {category}
      </Link>
      <span>/</span>
      <span className='text-gary-900 truncate'>{he.decode(title)}</span>
    </nav>
  );
};
