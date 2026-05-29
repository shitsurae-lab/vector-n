import { MetadataRoute } from "next";
import {
  fetchAllCategories,
  getCategoryFromWork,
  WorkData,
} from "@/app/features/works/api/works";

const BASE_URL = "https://www.vector-n.net";

// サイトマップ生成用に、全実績の「スラッグ」と「日付」だけを全件取得する
async function fetchAllWorksForSitemap(): Promise<WorkData[]> {
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement?_embed`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return await res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 必要なデータだけを取得
  const [categories, allWorks] = await Promise.all([
    fetchAllCategories(),
    fetchAllWorksForSitemap(),
  ]);

  // 1. 静的ページ（トップ、About、Contact、Works一覧）
  const staticPaths: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    { url: `${BASE_URL}/works`, lastModified: new Date() },
  ];

  // 2. カテゴリーページ（works/[category]）
  const categoryPaths: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/works/${cat.slug}`,
    lastModified: new Date(),
  }));

  // 3. 実績詳細ページ（works/[category]/[slug]）
  const workPaths: MetadataRoute.Sitemap = allWorks.map((work) => {
    // 💡 work.ts に定義されている getCategoryFromWork を使用
    const categoryInfo = getCategoryFromWork(work);
    const categorySlug = categoryInfo?.slug || "all";

    return {
      url: `${BASE_URL}/works/${categorySlug}/${work.slug}`,
      lastModified: new Date(work.date),
    };
  });

  // すべてを合体させて1つのリストにする
  return [...staticPaths, ...categoryPaths, ...workPaths];
}
