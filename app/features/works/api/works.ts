// // features/works/api/works.ts

// // ① slug から タームID を取得する
// async function fetchCategoryIdBySlug(slug: string): Promise<number> {
//   const url = `https://naname-lab.net/wp-json/wp/v2/achievement_cat?slug=${slug}`;

//   console.log('📡 category fetch url:', url);

//   const res = await fetch(url, {
//     cache: 'no-store', // 毎回最新
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch category');
//   }

//   const data = await res.json();

//   // slug が存在しない場合
//   if (!data || data.length === 0) {
//     throw new Error('Category not found');
//   }

//   // ★ ここが重要：id を取り出す
//   return data[0].id;
// }

// // ② タームIDを使って works を取得する
// export async function fetchWorksByCategory(categorySlug: string) {
//   // slug → ID
//   const categoryId = await fetchCategoryIdBySlug(categorySlug);

//   const url =
//     `https://naname-lab.net/wp-json/wp/v2/achievement` +
//     `?achievement_cat=${categoryId}` +
//     `&_fields=id,title,acf,featured_media`;

//   console.log('📡 works fetch url:', url);

//   const res = await fetch(url, {
//     next: { revalidate: 60 }, // キャッシュ（任意）
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch works');
//   }

//   const data = await res.json();

//   console.log('📦 works response:', data);

//   return data;
// }

/**
 * 補助関数：カテゴリーの「スラッグ」から「ID番号」を調べる
 * WP APIは「名前」で作品検索ができないため、この翻訳作業が必要です
 */

const fetchCategoryIdBySlug = async (slug: string): Promise<number> => {
  // WPのURLを組み立てる
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement_cat?slug=${categorySlug}`;

  // WPに「データをください」と通信
  const res = await fetch(url, { cache: 'no-store' });

  //届いた封筒を開けて、中身を取り出す
  const data = await res.json();

  console.log(
    ` --- [STEP2]WPからの返信確認 \n 届いたデータの件数: ${data.length} \n データの中身: ${JSON.stringify(data, null, 2)}`,
  );
  //data[0]のidを返す
  return data[0].id;
};

//①関数の定義（予告）
//categorySlug('wordPress'など)を受け取って、WPからデータをとってくる関数
export const fetchWorksByCategory = async (categorySlug: string) => {
  //⑤return data;とすることで
  //0. returnで終了
  //1. dataとして関数fetchWorkByCategoryに返る
  //2. 関数をexportしているので、`app/works/[category]/page.tsx`でインポートすることが可能
  return data;
};

//ステップ 2：WPから生データを取ってくる ↑↑↑
//1は終わったので、確認後、** 2. page.tsxからこの関数を呼び出すから
