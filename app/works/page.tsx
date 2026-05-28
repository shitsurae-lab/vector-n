import { worksRepository } from "@/app/features/works/api/repository";
import CategoryCard from "@/components/works/CategoryCard";
import PageShell from "@/components/works/PageShell";
import { NAV_PATHS } from "@/app/constants/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works",
};

// ----------------------------------------------------------------
// /works  全カテゴリー一覧ページ
// ----------------------------------------------------------------
export default async function WorksPage() {
  const categories = await worksRepository.getAllCategories();

  return (
    <PageShell title="WORKS" parent={NAV_PATHS.WORKS}>
      {/*
       * Zeplin .content-grid
       * SP:  1col  gap-80px    padding: 40px 20px  rounded-8px
       * Tab: 2col  col-gap-24  row-gap-40  padding: 40px 20px  rounded-16px
       * PC:  3col  col-gap-30  row-gap-60  padding: 60px 30px  rounded-16px
       */}
      <div className="flex w-full flex-col gap-20 rounded-lg bg-white px-[10px] py-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-10 md:rounded-2xl md:px-5 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-[60px] lg:p-[60px_30px]">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </PageShell>
  );
}
