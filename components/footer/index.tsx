import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 w-full border-t border-black/5 px-10 py-20 text-[#4f545a]">
      <div className="mx-auto flex max-w-[1600px] flex-col space-y-6">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
          {/* 左側：ロゴ */}
          <div>
            <Link
              href="/"
              className="block transition-opacity hover:opacity-70"
            >
              <Image
                src="/logo-thin-y@2x.webp"
                alt="Vector n"
                /* 比率を 40:51 に合わせる (80x102) */
                width={80}
                height={102}
                className="h-auto w-[80px] object-contain"
                priority
              />
            </Link>
          </div>

          {/* 右側：リンク */}
          <div className="flex gap-16 md:gap-24">
            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                Navigation
              </p>
              <ul className="space-y-2 text-sm font-light tracking-widest uppercase">
                <li>
                  <Link
                    href="/"
                    className="transition-opacity hover:opacity-50"
                  >
                    Top
                  </Link>
                </li>
                <li>
                  {/* href を /works に修正 */}
                  <Link
                    href="/works"
                    className="transition-opacity hover:opacity-50"
                  >
                    Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="transition-opacity hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-opacity hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                Source
              </p>
              <ul className="space-y-2 text-sm font-light tracking-widest uppercase">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-opacity hover:opacity-50"
                  >
                    GitHub
                    <span className="text-[8px]">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* コピーライトの余白微調整 */}
        <p className="pt-10 text-center text-[10px] tracking-[0.2em] uppercase opacity-50">
          © {currentYear} vector-n. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
