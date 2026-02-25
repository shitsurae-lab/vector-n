import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  fetchCategoryBySlug,
  fetchWorksByCategory,
  WorkData,
} from "@/app/features/works/api/works";
import { WorksList } from "@/app/features/works/components/WorksList";
import Image from "next/image";
import { Category } from "../../features/works/api/works";
import { CategoryHero } from "@/app/features/works/components/CategoryHero";
import { NAV_PATHS } from "@/app/constants/config";
import { Metadata } from "next";

//①型の宣言
//「このページはURLから情報を読み取りますよ」と予告
type customPageProps = {
  params: Promise<{ category: string }>;
};
export async function generateMetadata(
  props: customPageProps,
): Promise<Metadata> {
  // Promiseを解決してslugを取得
  const { category } = await props.params;

  // データの取得
  const categoryData = await fetchCategoryBySlug(category);

  // 値を確定（ここでは変数として定義）
  const displayName =
    categoryData?.acf?.next_title || categoryData?.name || category;

  // Metadata オブジェクトを返す
  return {
    title: `${displayName}`,
  };
}

//②ページ本体の関数Page(【async】を前につけて、通信待ちができるように定義します)
//{params}はNext.jsが【自動で】渡してくれる「URLの情報は入った箱」として定義
export default async function Page({ params }: customPageProps) {
  //
  //③「予約券(Promise)」を実際の文字に交換する
  //URLの[category]の部分がcategoryという名前で取り出せます。
  const { category } = await params;

  //works.tsのfetchWorksByCategory関数を呼び出す
  // const works = await fetchWorksByCategory(category);
  // 作品一覧と、カテゴリー情報の両方をゲット！
  const [works, categoryData]: [WorkData[], Category | null] =
    await Promise.all([
      fetchWorksByCategory(category),
      fetchCategoryBySlug(category),
    ]);

  //④【重要】ターミナルで中身を確認 ※値が長い
  // console.log('--- [STEP1]窓口の確認 ---- \nURLから届いた値:', category, works);
  console.log(`カテゴリーデータ`, categoryData);
  console.log("ACF Data:", JSON.stringify(categoryData?.acf, null, 2));
  if (!categoryData) {
    return <main className="pt-40 text-center">Category not found.</main>;
  }
  const acf = categoryData?.acf;
  //画面に表示する
  return (
    <main className="mx-auto max-w-6xl px-6 md:px-16">
      {/* 修正ポイント：GSAPアニメーション付きのクライアントコンポーネントへ */}
      {acf?.next_image ? (
        <CategoryHero
          src={acf.next_image}
          subSrc={acf.next_image_sub}
          title={acf.next_title || categoryData?.name || category}
          subtitle={acf.mv_subtitle}
          desc={acf.term_desc}
          alt={acf.term_title || categoryData?.name || category}
        />
      ) : (
        <section className="relative right-1/2 left-1/2 -mr-[50vw] mb-12 -ml-[50vw] flex aspect-21/9 w-screen items-center justify-center bg-slate-200">
          <span className="font-bold tracking-widest text-slate-400 uppercase">
            {category}
          </span>
        </section>
      )}
      <Breadcrumbs
        parent={NAV_PATHS.WORKS}
        category={{ name: categoryData.name, slug: categoryData.slug }}
      />
      <section className="flex flex-col gap-15 pt-10 md:gap-20 md:pt-20">
        <div className="flex flex-col py-10">
          <h2 className="mb-8 text-center font-[family-name:var(--font-michroma)] text-2xl font-bold tracking-[0.5em] text-zinc-800 uppercase md:mb-12 md:text-3xl">
            {category}
          </h2>
          {acf?.next_desc && (
            <p className="word-break-loose max-w-prose text-center font-[family-name:var(--font-mixed)] text-sm leading-relaxed font-light tracking-widest break-keep text-zinc-500 md:text-base">
              {acf.next_desc}
            </p>
          )}
        </div>
        <WorksList works={works} category={category} />
      </section>
    </main>
  );
}
