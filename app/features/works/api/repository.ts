/**
 * ------------------------------------------------------------------
 * repository.ts
 * APIアクセスの「窓口」を一元管理するファイル
 *
 * ページ側は worksRepository だけを見る。
 * WordPress → Headless CMS に乗り換える場合は
 * このファイルの実装だけ差し替えればよい。
 * ------------------------------------------------------------------
 */

import { Category, WorkData, PageData } from "./types";

const BASE_URL = "https://naname-lab.net/wp-json/wp/v2";

// ----------------------------------------------------------------
// 内部ユーティリティ（repository 外には export しない）
// ----------------------------------------------------------------
const fetchCategoryIdBySlug = async (slug: string): Promise<number> => {
  const res = await fetch(`${BASE_URL}/achievement_cat?slug=${slug}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!data || data.length === 0) {
    throw new Error(`Category not found: ${slug}`);
  }
  return data[0].id as number;
};

// ----------------------------------------------------------------
// worksRepository
// ----------------------------------------------------------------
export const worksRepository = {
  /**
   * 全カテゴリーを取得
   * 使用箇所: /works
   */
  getAllCategories: async (): Promise<Category[]> => {
    const res = await fetch(
      `${BASE_URL}/achievement_cat?_embed&_fields=id,name,slug,description,acf,_embedded`,
      { cache: "no-store" },
    );
    return res.json();
  },

  /**
   * カテゴリー情報をスラッグから1件取得
   * 使用箇所: /works/[category]
   */
  getCategoryBySlug: async (slug: string): Promise<Category | null> => {
    const res = await fetch(
      `${BASE_URL}/achievement_cat?_embed&slug=${slug}&_fields=id,name,slug,description,acf,_embedded`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data && data.length > 0 ? (data[0] as Category) : null;
  },

  /**
   * カテゴリー別の実績一覧を取得
   * 使用箇所: /works/[category]
   */
  getWorksByCategory: async (categorySlug: string): Promise<WorkData[]> => {
    const categoryId = await fetchCategoryIdBySlug(categorySlug);
    const res = await fetch(
      `${BASE_URL}/achievement?achievement_cat=${categoryId}&_embed&_fields=id,title,excerpt,content,slug,date,modified,acf,featured_media,_links,_embedded`,
      { cache: "no-store" },
    );
    return res.json();
  },

  /**
   * 実績詳細をスラッグから1件取得
   * 使用箇所: /works/[category]/[slug]（サーバー側）
   */
  getWorkBySlug: async (slug: string): Promise<WorkData | null> => {
    const res = await fetch(
      `${BASE_URL}/achievement?slug=${slug}&_embed&_fields=id,title,excerpt,content,slug,date,modified,acf,featured_media,_links,_embedded`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data && data.length > 0 ? (data[0] as WorkData) : null;
  },

  /**
   * パスワード認証付き実績詳細を取得
   * 使用箇所: WorkDetailContent.tsx（クライアント側）
   */
  getWorkBySlugWithPassword: async (
    slug: string,
    password: string,
  ): Promise<WorkData | null> => {
    const res = await fetch(
      `${BASE_URL}/achievement?slug=${slug}&password=${password.trim()}&_embed`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return Array.isArray(data) && data.length > 0
      ? (data[0] as WorkData)
      : null;
  },

  /**
   * 固定ページをスラッグから取得
   * 使用箇所: /works（ヒーロー画像など）
   */
  getPageBySlug: async (slug: string): Promise<PageData | null> => {
    const res = await fetch(
      `${BASE_URL}/pages?slug=${slug}&_embed&_fields=id,title,slug,acf,_links,_embedded`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data && data.length > 0 ? (data[0] as PageData) : null;
  },
};
