import Link from 'next/link';
import he from 'he';
import { NAV_PATHS } from '@/app/constants/config';

type Props = {
  category?: string;
  title?: string;
};

export const Breadcrumbs = ({ category, title }: Props) => {
  return (
    <nav className='flex gap-2 text-sm text-gray-500 pt-6 mb-6'>
      <Link href='/' className='hover:underline'>
        HOME
      </Link>

      <span>/</span>
      <Link href={`/${NAV_PATHS.WORKS.path}`} className='hover:underline'>
        {NAV_PATHS.WORKS.label}
      </Link>

      {category && (
        <>
          <span>/</span>
          <Link
            href={`/${NAV_PATHS.WORKS.path}/${category}`}
            className='hover:underline capitalize'
          >
            {category}
          </Link>
        </>
      )}

      {title && (
        <>
          <span>/</span>
          <span className='text-gray-900 truncate'>{he.decode(title)}</span>
        </>
      )}
    </nav>
  );
};
