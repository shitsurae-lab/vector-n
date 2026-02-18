/**
 * ------------------------------------------------------------------
 * 🌻 型定義（Types）
 * ------------------------------------------------------------------
 */

// 1. カテゴリー（achievement_cat）の型
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

// 2. 制作実績（achievement）詳細の型
export interface WorkData {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string; protected: boolean };
  acf: {
    work_detail: {
      next_api_image?: string;
      period: string;
      role: string;
      tools_design: string;
      tools_coding: string;
      background: string;
      design_intent: string;
      creative_logic: string;
      results: string;
      site_url: string;
      sub_image_01?: string;
      sub_image_02?: string;
      sub_image_03?: string;
      sub_image_04?: string;
    };
    next_api_image?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text?: string }>;
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
}

// 3. 固定ページ（Pages）の型
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
  };
};

// 4.💡 WPの複雑な階層からカテゴリー名とスラグを安全に取り出す
export const getCategoryFromWork = (work: WorkData) => {
  const terms = work._embedded?.['wp:term'];
  if (!terms || !Array.isArray(terms[0]) || terms[0].length === 0) return null;

  // 0番目の配列（カテゴリー）の最初の要素を取得
  const category = terms[0][0];
  return {
    name: category.name,
    slug: category.slug,
  };
};

/**
 * ------------------------------------------------------------------
 * 📡 API関数
 * ------------------------------------------------------------------
 */

// カテゴリーのスラッグからIDを調べる補助関数
export const fetchCategoryIdBySlug = async (slug: string): Promise<number> => {
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement_cat?slug=${slug}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  if (!data || data.length === 0)
    throw new Error(`Category not found : ${slug}`);
  return data[0].id;
};

// 1. 指定カテゴリーに属する作品一覧を取得
export const fetchWorksByCategory = async (
  categorySlug: string,
): Promise<WorkData[]> => {
  const categoryId = await fetchCategoryIdBySlug(categorySlug);
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement?achievement_cat=${categoryId}&_embed&_fields=id,title,excerpt,content,slug,date,modified,acf,featured_media,_links,_embedded`;
  const res = await fetch(url, { cache: 'no-store' });
  return await res.json();
};

// 2. 作品詳細（WorkData）をスラッグから1件取得
export const fetchWorkBySlug = async (
  slug: string,
): Promise<WorkData | null> => {
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement?slug=${slug}&_embed&_fields=id,title,excerpt,content,slug,date,modified,acf,featured_media,_links,_embedded`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  return data && data.length > 0 ? (data[0] as WorkData) : null;
};

// 3. 全カテゴリーを取得
export const fetchAllCategories = async (): Promise<Category[]> => {
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement_cat?_embed&_fields=id,name,slug,description,acf,_embedded`;
  const res = await fetch(url, { cache: 'no-store' });
  return await res.json();
};

// 4. カテゴリー情報（Category）をスラッグから1件取得
export const fetchCategoryBySlug = async (
  slug: string,
): Promise<Category | null> => {
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement_cat?_embed&slug=${slug}&_fields=id,name,slug,description,acf,_embedded`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  return data && data.length > 0 ? (data[0] as Category) : null;
};

// 5. 固定ページを取得
export const fetchAboutPage = async (): Promise<PageData | null> => {
  const url = `https://naname-lab.net/wp-json/wp/v2/pages?slug=about&_embed&_fields=id,title,slug,acf,_links,_embedded`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  return data && data.length > 0 ? (data[0] as PageData) : null;
};
