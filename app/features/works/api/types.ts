/**
 * ------------------------------------------------------------------
 * types.ts
 * 型定義の一元管理ファイル
 * ------------------------------------------------------------------
 */

// ----------------------------------------------------------------
// 1. カテゴリー
// ----------------------------------------------------------------
export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  acf?: {
    term_image?: number;
    term_hero_image?: string;
    term_image_url?: string;
    term_image_api?: string;
    mv_subtitle?: string;
    mv_title?: string;
    mv_desc?: string;
    term_hero_image_alt?: string;
    term_title?: string;
    term_desc?: string;
    next_image?: string;
    next_image_sub?: string;
    next_title?: string;
    next_desc?: string;
    next_cta?: string;
  };
};

// ----------------------------------------------------------------
// 2. 制作実績（詳細）
// 既存の works.ts に合わせて WorkData という名前を使用
// ----------------------------------------------------------------
export type WorkData = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string; protected: boolean };
  acf: {
    work_detail: {
      next_api_image?: string;
      period?: string;
      role?: string;
      tools_design?: string;
      tools_coding?: string;
      background?: string;
      design_intent?: string;
      creative_logic?: string;
      results?: string;
      site_url?: string;
      sub_image_01?: string;
      sub_image_02?: string;
      sub_image_03?: string;
      sub_image_04?: string;
      // 👇 バナー用などに追加するカスタムフィールド
      industry?: string; // 業種
      taste?: string; // テイスト
      shape?: string; // 形状
      color_scheme?: string; // 配色
      media?: string; // 媒体
      size?: string; // サイズ
    };
    next_api_image?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
};

// ----------------------------------------------------------------
// 3. 固定ページ
// ----------------------------------------------------------------
export type PageData = {
  id: number;
  title: { rendered: string };
  slug: string;
  acf: {
    about_hero_main?: string;
    about_hero_sub?: string;
    about_hero_title?: string;
    about_hero_subtitle?: string;
    about_hero_desc?: string;
    about_identity?: {
      next_title: string;
      next_ja_title: string;
      next_desc: string;
      next_image: string;
    };
    about_capabilities?: {
      next_title: string;
      next_ja_title: string;
      next_desc: string;
      next_image: string;
    };
    about_expertise?: {
      next_title: string;
      next_ja_title: string;
      next_desc: string;
      next_image: string;
    };
    works_hero_main?: string;
    works_hero_sub?: string;
    works_hero_title?: string;
    works_hero_subtitle?: string;
    works_hero_desc?: string;
  };
};

// ----------------------------------------------------------------
// 4. ユーティリティ
// WPの複雑な階層からカテゴリー名とスラグを安全に取り出す
// ----------------------------------------------------------------
export const getCategoryFromWork = (work: WorkData) => {
  const terms = work._embedded?.["wp:term"];
  if (!terms || !Array.isArray(terms[0]) || terms[0].length === 0) return null;
  const category = terms[0][0];
  return {
    name: category.name,
    slug: category.slug,
  };
};
