import Link from "next/link";
import he from "he";
import { NAV_PATHS, type NavPath } from "@/app/constants/config";

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
    <nav className="scrollbar-hide flex items-center gap-2 overflow-x-auto py-6 text-[10px] font-bold tracking-[0.3em] whitespace-nowrap text-zinc-400 uppercase">
      {/* 1. HOME */}
      <Link
        href={NAV_PATHS.HOME.path}
        className="shrink-0 transition-colors hover:text-zinc-900"
      >
        {NAV_PATHS.HOME.label}
      </Link>

      {/* 2. Parent (WORKS など) */}
      {parent && parent.path !== "/" && (
        <>
          <span className="shrink-0 text-zinc-300">/</span>
          {category || title ? (
            <Link
              href={`/${parent.path}`}
              className="shrink-0 transition-colors hover:text-zinc-900"
            >
              {parent.label}
            </Link>
          ) : (
            <span className="shrink-0 text-zinc-900">{parent.label}</span>
          )}
        </>
      )}

      {/* 3. Category (カスタム投稿のタクソノミー) */}
      {category && (
        <>
          <span className="shrink-0 text-zinc-300">/</span>
          {title ? (
            <Link
              href={`/${parent?.path || "works"}/${category.slug}`}
              className="shrink-0 transition-colors hover:text-zinc-900"
            >
              {category.name}
            </Link>
          ) : (
            <span className="shrink-0 text-zinc-900">{category.name}</span>
          )}
        </>
      )}

      {/* 4. Title (投稿詳細) */}
      {title && (
        <>
          <span className="shrink-0 text-zinc-300">/</span>
          <span className="max-w-[150px] truncate text-zinc-900 md:max-w-[300px]">
            {he.decode(title)}
          </span>
        </>
      )}
    </nav>
  );
};
