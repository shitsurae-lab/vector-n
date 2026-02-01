/**
 * 補助関数：カテゴリーの「スラッグ」から「ID番号」を調べる
 * WP APIは「名前」で作品検索ができないため、この翻訳作業が必要
 */
//①関数の定義（予告）
//slug('wordPress'など)を受け取って、WPからデータをとってくる関数
const fetchCategoryIdBySlug = async (slug: string): Promise<number> => {
  // WPのURLを組み立てる
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement_cat?slug=${slug}`;
  // WPに「データをください」と通信
  const res = await fetch(url, { cache: 'no-store' });
  //届いた封筒を開けて、中身を取り出す
  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error(`Category not found : ${slug}`);
  }
  console.log(`🔍 スラッグ "${slug}" のIDは ${data[0].id} でした`);
  //data[0]のidを返す
  return data[0].id;
};

/**
 *メイン関数: 指定されたカテゴリーに属する「一覧」を取得
 */
export const fetchWorksByCategory = async (categorySlug: string) => {
  //🟢 STEP A: 補助関数で取得したカテゴリーIDを取得
  const categoryId = await fetchCategoryIdBySlug(categorySlug);

  // 🟢 STEP B: そのIDを使って、作品（achievement）の名簿にアクセスする
  // achievement_cat=15 と指定することで、そのカテゴリーの作品だけが届きます
  // _fields を使うと、必要なデータ（id, title, slugなど）だけに絞れて通信が軽くなります
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement?achievement_cat=${categoryId}&_embed&_fields=id,title,excerpt,content,slug,date,modified,acf,featured_media,_links,_embedded`;

  console.log(`📡 作品一覧を取得中... URL: ${url}`);

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  //⑤return data;とすることで
  //0. returnで終了
  //1. dataとして関数fetchWorkByCategoryに返る
  //2. 関数をexportしているので、`app/works/[category]/page.tsx`でインポートすることが可能
  return data;
};

/**
 * 作品詳細を1件取得する関数
 */
export const fetchWorkBySlug = async (slug: string) => {
  // slug(chat-toolなど)を使って、その記事1件だけを注文します
  // _embed を付けることで画像URLも一緒に届きます
  const url = `https://naname-lab.net/wp-json/wp/v2/achievement?slug=${slug}&_embed`;

  console.log(`📡 詳細データを取得中... URL: ${url}`);

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  // 検索結果は配列で届くので、最初の1件を返します。見つからなければ null

  return data && data.length > 0 ? data[0] : null;
};
