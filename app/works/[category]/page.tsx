// app/works/[category]/page.tsx
// import { fetchWorksByCategory } from '@/app/features/works/api/works';
// import { WorksList } from '@/app/features/works/components/WorksList';

// type pageProps = {
//   params: Promise<{ category: string }>;
// };
// export default async function Page({ params }: pageProps) {
//   const { category } = await params; //ここでcategory = 'design'になる
//   const works = await fetchWorksByCategory(category); //designを渡す

//   return <WorksList works={works} />;
// }

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

  //④【重要】ターミナルで中身を確認
  console.log('--- 窓口の確認 ---- \nURLから届いた値:', category);

  //画面に表示する(とりあえず確認)
  return (
    <main style={{ padding: '40px' }}>
      <h1>カテゴリー一覧ページ</h1>
      <p>
        指定したカテゴリーは<strong>{category}</strong>です
      </p>
    </main>
  );
}
