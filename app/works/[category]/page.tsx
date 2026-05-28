import { notFound } from "next/navigation";
import { worksRepository } from "@/app/features/works/api/repository";
import { WorkData } from "@/app/features/works/api/types";
import PageShell from "@/components/works/PageShell";
import WorkCard, { WorkCardData } from "@/components/works/WorkCard";
import { NAV_PATHS } from "@/app/constants/config";
import he from "he";
import { Metadata } from "next";

// ----------------------------------------------------------------
// 型定義
// ----------------------------------------------------------------
type PageProps = {
  params: Promise<{ category: string }>;
};

// ----------------------------------------------------------------
// generateMetadata
// ----------------------------------------------------------------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = await worksRepository.getCategoryBySlug(category);
  const title = categoryData?.acf?.next_title || categoryData?.name || category;
  return { title };
}

// ----------------------------------------------------------------
// マッピング関数
// WorkData（API）→ WorkCardData（WorkCardコンポーネント用）に変換
// ----------------------------------------------------------------
// /works/[category] は実績一覧なので、カードは詳細ページへのリンクになる
// → href は /works/[categorySlug]/[work.slug]
// ----------------------------------------------------------------
function toWorkCardData(work: WorkData, categorySlug: string): WorkCardData {
  // アイキャッチ画像: ACFの next_api_image → wp:featuredmedia の順で参照
  const image =
    work.acf?.next_api_image ||
    work._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "";

  const isProtected = work.content.protected;

  // 本文の抜粋: excerpt の HTML タグを除去
  const excerpt = isProtected
    ? "この投稿はパスワードで保護されています"
    : work.excerpt.rendered.replace(/<[^>]*>/g, "").trim();

  return {
    slug: work.slug,
    category: categorySlug,
    title: he.decode(work.title.rendered),
    image,
    excerpt,
  };
}

// ----------------------------------------------------------------
// /works/[category]  カテゴリー別実績一覧ページ
// ----------------------------------------------------------------
export default async function WorksCategoryPage({ params }: PageProps) {
  const { category } = await params;

  // カテゴリー情報と実績一覧を並列取得
  const [categoryData, worksData] = await Promise.all([
    worksRepository.getCategoryBySlug(category),
    worksRepository.getWorksByCategory(category),
  ]);

  if (!categoryData) notFound();

  const categoryName = categoryData.acf?.next_title || categoryData.name;
  const works = worksData.map((work) => toWorkCardData(work, category));

  return (
    <PageShell
      title={categoryName.toUpperCase()}
      parent={NAV_PATHS.WORKS}
      category={{ name: categoryName, slug: category }}
    >
      <div className="flex w-full flex-col gap-20 rounded-lg bg-white px-[10px] py-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-10 md:rounded-2xl md:px-5 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-[60px] lg:p-[60px_30px]">
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </PageShell>
  );
}

// ----------------------------------------------------------------
// SSG用: ビルド時にカテゴリーページを静的生成
// ----------------------------------------------------------------
export async function generateStaticParams() {
  const categories = await worksRepository.getAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}
