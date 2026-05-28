import { notFound } from "next/navigation";
import he from "he";
import { Metadata } from "next";
import { worksRepository } from "@/app/features/works/api/repository";
import { WorkDetailContent } from "@/app/features/works/components/WorkDetailContent";

// ----------------------------------------------------------------
// 型定義
// ----------------------------------------------------------------
type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

// ----------------------------------------------------------------
// generateMetadata
// ----------------------------------------------------------------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await worksRepository.getWorkBySlug(slug);
  const rawTitle = work?.title?.rendered || slug;
  return {
    title: `制作実績：${he.decode(rawTitle)}`,
  };
}

// ----------------------------------------------------------------
// ページ本体
// page.tsx はデータ取得のみ。表示は WorkDetailContent に委譲。
// ----------------------------------------------------------------
export default async function WorkDetailPage({ params }: PageProps) {
  const { category, slug } = await params;

  const [work, categoryData] = await Promise.all([
    worksRepository.getWorkBySlug(slug),
    worksRepository.getCategoryBySlug(category),
  ]);

  if (!work || !categoryData) {
    console.log(
      `❌ データが見つかりません: category=${category}, slug=${slug}`,
    );
    notFound();
  }

  return (
    <WorkDetailContent
      work={work}
      categorySlug={category}
      categoryName={categoryData.acf?.next_title || categoryData.name}
    />
  );
}

// ----------------------------------------------------------------
// SSG用: ビルド時に詳細ページを静的生成
// ----------------------------------------------------------------
export async function generateStaticParams() {
  const categories = await worksRepository.getAllCategories();

  const results = await Promise.all(
    categories.map(async (cat) => {
      const works = await worksRepository.getWorksByCategory(cat.slug);
      return works.map((work) => ({
        category: cat.slug,
        slug: work.slug,
      }));
    }),
  );

  return results.flat();
}
