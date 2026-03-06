import {
  fetchWorkBySlug,
  fetchCategoryBySlug,
} from "@/app/features/works/api/works";
import { ProtectedContent } from "@/components/ProtectedContent";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import he from "he";

type customPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: customPageProps): Promise<Metadata> {
  const { category, slug } = await params;

  // 1. 記事データを取得
  const work = await fetchWorkBySlug(slug);

  // 2. ACFのオブジェクトを変数に入れる
  const acf = work?.acf;

  // 3. 文字列として取り出す（エラー回避のポイント）
  // acf 自体ではなく、その中の「どの文字を使うか」を指定する
  const rawTitle = work?.title?.rendered || slug;
  const decodedTitle = he.decode(rawTitle);
  const displayTitle = `制作実績：${decodedTitle}`;

  // もしACFの中に特別なタイトル設定（例: project_name）があればそれを使う
  // const displayTitle = acf?.project_name || work?.title?.rendered || slug;

  return {
    title: displayTitle,
  };
}

export default async function WorkDetailPage({ params }: customPageProps) {
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
    <div className="min-h-screen bg-white">
      <ProtectedContent
        slug={slug}
        categorySlug={category}
        initialWork={work}
      />
    </div>
  );
}
