import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full py-20 px-10 mt-20 border-t border-black/5 text-[#4f545a]'>
      <div className='max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12'>
        {/* 左側：ロゴとコピーライト */}
        <div className='space-y-6'>
          <Link
            href='/'
            className='text-xl font-bold tracking-tighter uppercase'
          >
            <Image
              src='/logo.webp'
              alt='Vector n'
              width={264}
              height={254}
              className='w-[30%] min-w-[100px] max-w-[160px] md:max-w-[80px] h-auto object-contain' // 高さをクラスで制御するとレスポンシブが楽です
              priority
            />
          </Link>
          <p className='text-[10px] tracking-[0.2em] opacity-50 uppercase'>
            © {currentYear} vector-n. All rights reserved.
          </p>
        </div>

        {/* 右側：リンク */}
        <div className='flex gap-16 md:gap-24'>
          <div className='space-y-4'>
            <p className='text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold'>
              Navigation
            </p>
            <ul className='space-y-2 text-sm uppercase tracking-widest font-light'>
              <li>
                <Link href='/' className='hover:opacity-50 transition-opacity'>
                  Top
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:opacity-50 transition-opacity'
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:opacity-50 transition-opacity'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:opacity-50 transition-opacity'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <p className='text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold'>
              Source
            </p>
            <ul className='space-y-2 text-sm uppercase tracking-widest font-light'>
              <li>
                <a
                  href='https://github.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:opacity-50 transition-opacity flex items-center gap-2'
                >
                  GitHub
                  <span className='text-[8px]'>↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
