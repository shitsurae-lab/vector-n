import Link from "next/link";
import Image from "next/image";

import {
  fetchAllCategories,
  fetchPageBySlug,
} from "../features/works/api/works";
import { CategoryList } from "../features/works/components/CategoryList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { NAV_PATHS } from "../constants/config";
import { CategoryHero } from "../../components/Hero/CategoryHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works",
};

//ページ本体の関数Page(【async】を前につけて、通信待ちができるように定義します)
export default async function WorksTopPage() {
  const categories = await fetchAllCategories();
  // 1. 固定ページ「about」のデータを取得
  const pageData = await fetchPageBySlug("achievement_cat");

  // データが見つからない場合のガード
  if (!pageData) {
    return null;
  }

  const { acf } = pageData;
  return (
    // <main className='p-10'>
    //   <h1 className='text-2xl font-bold mb-6'>カテゴリー一覧</h1>
    //   <pre>{JSON.stringify(categories, null, 2)}</pre>
    // </main>
    <main className="mx-auto max-w-6xl px-6 md:px-16">
      <CategoryHero
        src={acf?.works_hero_main || ""}
        subSrc={acf?.works_hero_sub || ""}
        title={acf?.works_hero_title || pageData.title.rendered}
        subtitle={acf?.works_hero_subtitle || "Works"}
        desc={acf?.works_hero_desc || ""}
        alt={pageData.title.rendered}
      />
      <Breadcrumbs parent={NAV_PATHS.WORKS} />
      <section className="flex flex-col gap-15 pt-10 md:gap-20 md:pt-20">
        <CategoryList categories={categories} />
      </section>
    </main>
  );
}
