import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
  fetchCategoryBySlug,
  fetchWorksByCategory,
  WorkData,
} from '@/app/features/works/api/works';
import { WorksList } from '@/app/features/works/components/WorksList';
import Image from 'next/image';
import { Category } from '../../features/works/api/works';
import { CategoryHero } from '@/app/features/works/components/CategoryHero';
import { NAV_PATHS } from '@/app/constants/config';

//①型の宣言
//「このページはURLから情報を読み取りますよ」と予告
type pageProps = {
  params: Promise<{ category: string }>;
};

//②ページ本体の関数Page(【async】を前につけて、通信待ちができるように定義します)
//{params}はNext.jsが【自動で】渡してくれる「URLの情報は入った箱」として定義
export default async function Page({ params }: pageProps) {
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

  if (!categoryData) {
    return <main className='pt-40 text-center'>Category not found.</main>;
  }
  const acf = categoryData?.acf;
  //画面に表示する
  return (
    // (とりあえず確認)
    //   <main style={{ padding: '40px' }}>
    //     <h1>カテゴリー：{category}の一覧ページ</h1>
    //     <pre>{JSON.stringify(works, null, 2)}</pre>
    //     <p>
    //       指定したカテゴリーは<strong>{category}</strong>です
    //     </p>
    //   </main>
    <main className='max-w-6xl mx-auto px-6 md:px-16'>
      {/* 修正ポイント：GSAPアニメーション付きのクライアントコンポーネントへ */}
      {acf?.next_image ? (
        <CategoryHero
          src={acf.next_image}
          subSrc={acf.next_image_sub}
          title={category}
          subtitle={acf.mv_subtitle}
          desc={acf.term_desc}
          alt={acf.term_title || categoryData?.name || category}
        />
      ) : (
        <section className='relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen aspect-21/9 mb-12 bg-slate-200 flex items-center justify-center'>
          <span className='text-slate-400 font-bold uppercase tracking-widest'>
            {category}
          </span>
        </section>
      )}
      <Breadcrumbs
        parent={NAV_PATHS.WORKS}
        category={{ name: categoryData.name, slug: categoryData.slug }}
      />

      <h2 className='text-3xl font-bold mb-10 capitalize'>{category}</h2>

      <WorksList works={works} category={category} />
    </main>
  );
}
