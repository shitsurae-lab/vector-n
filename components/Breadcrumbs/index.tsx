import Link from "next/link";
import he from "he";
import { ChevronRight } from "lucide-react";
import { NAV_PATHS, type NavPath } from "@/app/constants/config";

// ----------------------------------------------------------------
// 型定義
// ----------------------------------------------------------------
// 既存の Breadcrumbs コンポーネントの Props 構造を踏襲
// ----------------------------------------------------------------
type Props = {
  parent?: NavPath;
  category?: {
    name: string; // 表示用（例: Web Design）
    slug: string; // URL用（例: web-design）
  };
  title?: string; // 投稿タイトル（WPの title.rendered）
};

// ----------------------------------------------------------------
// Breadcrumb コンポーネント
// ----------------------------------------------------------------
// Zeplin:
//   SP:  w-355px  pt-8px   font-size: 12px
//   Tab: w-728px  pt-8px   font-size: 14px
//   PC:  w-960px  pt-16px  font-size: 14px
//
// 区切り文字: ChevronRight（lucide）
// リンク色:   #333  hover: #003366
// カレント:   #333（非リンク）
// ----------------------------------------------------------------
export const Breadcrumbs = ({ parent, category, title }: Props) => {
  return (
    <nav aria-label="パンくずリスト" className="flex w-full justify-center">
      <ol className="flex w-[355px] flex-row flex-wrap items-center gap-2 pt-2 md:w-[728px] md:pt-2 lg:w-[1140px] lg:pt-4">
        {/* 1. HOME */}
        <li className="flex items-center gap-2">
          <Link
            href={NAV_PATHS.HOME.path}
            className="font-sans text-xs leading-none font-normal text-[#333] transition-colors hover:text-[#003366] md:text-sm"
          >
            {NAV_PATHS.HOME.label}
          </Link>
        </li>

        {/* 2. Parent（WORKS など） */}
        {parent && parent.path !== "/" && (
          <li className="flex items-center gap-2">
            <ChevronRight
              size={14}
              className="shrink-0 text-[#333]"
              strokeWidth={1.5}
            />
            {category || title ? (
              // 配下にページがある → リンクあり
              <Link
                href={`/${parent.path}`}
                className="font-sans text-xs leading-none font-normal text-[#333] transition-colors hover:text-[#003366] md:text-sm"
              >
                {parent.label}
              </Link>
            ) : (
              // カレントページ → 非リンク
              <span className="font-sans text-xs leading-none font-normal text-[#333] md:text-sm">
                {parent.label}
              </span>
            )}
          </li>
        )}

        {/* 3. Category（カスタム投稿のタクソノミー） */}
        {category && (
          <li className="flex items-center gap-2">
            <ChevronRight
              size={14}
              className="shrink-0 text-[#333]"
              strokeWidth={1.5}
            />
            {title ? (
              // 配下に投稿詳細がある → リンクあり
              <Link
                href={`/${parent?.path ?? "works"}/${category.slug}`}
                className="font-sans text-xs leading-none font-normal text-[#333] transition-colors hover:text-[#003366] md:text-sm"
              >
                {category.name}
              </Link>
            ) : (
              // カレントページ → 非リンク
              <span className="font-sans text-xs leading-none font-normal text-[#333] md:text-sm">
                {category.name}
              </span>
            )}
          </li>
        )}

        {/* 4. Title（投稿詳細） */}
        {title && (
          <li className="flex items-center gap-2">
            <ChevronRight
              size={14}
              className="shrink-0 text-[#333]"
              strokeWidth={1.5}
            />
            {/* タイトルは長くなりうるので truncate */}
            <span className="max-w-[140px] truncate font-sans text-xs leading-none font-normal text-[#333] md:max-w-[300px] md:text-sm">
              {he.decode(title)}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
};
