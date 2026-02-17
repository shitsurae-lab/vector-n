import {
  fetchWorkBySlug,
  fetchCategoryBySlug,
} from '@/app/features/works/api/works';
import { ProtectedContent } from '@/app/features/works/components/ProtectedContent';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function WorkDetailPage({ params }: PageProps) {
  // ① URLパラメータ（カテゴリーとスラッグ）を取得
  const { category, slug } = await params;

  // ② デコードしたスラッグで取得を試みる（日本語スラッグ対策）
  const decodedSlug = decodeURIComponent(slug);

  // ③ 作品データとカテゴリーデータを並列で取得
  // fetchWorkBySlug の戻り値は WorkData 型、fetchCategoryBySlug は Category 型
  const [work, categoryData] = await Promise.all([
    fetchWorkBySlug(slug),
    fetchCategoryBySlug(category),
  ]);

  // ③ データが見つからない場合は 404
  if (!work || !categoryData) {
    // 🔍 デバッグ用：何を探そうとして失敗したかコンソールに出す
    console.log(
      `❌ データが見つかりません: category=${category}, slug=${decodedSlug}`,
    );
    notFound();
  }

  return (
    // 左右突き抜けのヒーローエリアを正しく表示するため、
    // 親に余計な padding や max-width をつけない状態でコンポーネントを呼び出す
    <div className='min-h-screen bg-white'>
      <ProtectedContent
        slug={slug}
        categorySlug={category}
        initialWork={work}
      />
    </div>
  );
}
