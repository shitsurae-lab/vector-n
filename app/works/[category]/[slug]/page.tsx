import { NAV_PATHS } from '@/app/constants/config';
import { fetchWorkBySlug } from '@/app/features/works/api/works';
import he from 'he';
import Image from 'next/image';
import Link from 'next/link';
type PageProps = {
  //paramsの中にcagegoryとslugが入ります。
  params: Promise<{ category: string; slug: string }>;
};
export default async function WorkDetailPage({ params }: PageProps) {
  //①予約券(Promise)からURLの情報を解凍する
  const { category, slug } = await params;

  //②詳細データをWPからとってくる
  const work = await fetchWorkBySlug(slug);

  //もしも記事がなければ404
  if (!work) return <div>投稿がみつかりませんでした</div>;

  const isProtected = work.content.protected;
  //画像の取得
  const mainImage = work._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const altText =
    work._embedded?.['wp:featuredmedia']?.[0]?.alt_text ||
    he.decode(work.title.rendered);

  return (
    <article className='max-w-4xl mx-auto p-10'>
      {/* メインビジュアルエリア */}
      <div className='relative w-full aspect-video mb-10 overflow-hidden rounded-xl bg-gray-100'>
        {mainImage ? (
          <Image
            src={mainImage}
            alt={altText}
            fill
            priority // 💡 詳細ページのトップ画像なので、最優先で読み込む設定
            className='object-cover'
          />
        ) : (
          <div className='flex items-center justify-center h-full text-gray-400'>
            No Image
          </div>
        )}
      </div>

      {/* 🍞 パンくずリスト */}
      <nav className='flex gap-2 text-sm text-gray-500 mb-6'>
        <Link href='/' className='hover:underline'>
          HOME
        </Link>
        <span>/</span>
        <Link
          href={`/${NAV_PATHS.WORKS.path}/${category}`}
          className='hover:underline capitalize'
        >
          {category}
        </Link>
        <span>/</span>
        <span className='text-gary-900 truncate'>
          {he.decode(work.title.rendered)}
        </span>
      </nav>
      {/* 投稿日 */}
      <time className='text-gray-500 text-sm'>
        {new Date(work.date).toLocaleDateString('ja-JP').replace(/\//g, '.')}
      </time>

      {/* タイトル */}
      <h1 className='text-4xl font-bold mt-2 mb-8'>
        {he.decode(work.title.rendered)}
      </h1>

      {/* 本文エリア */}
      <div className='prose max-w-none'>
        {isProtected ? (
          <div className='bg-slate-100 p-10 text-center rounded-lg border-2 border-dashed'>
            <p className='text-2xl mb-4'>🔒</p>
            <p>この実績はパスワードで保護されています。</p>
            <p className='text-sm text-gray-500 mt-2'>
              閲覧には別途パスワードが必要です。
            </p>
          </div>
        ) : (
          // 普通の投稿ならWPのHTMLを流し込む。🌟CSSはglobal.cssに記述
          <div
            className='wpCustomContent'
            dangerouslySetInnerHTML={{ __html: work.content.rendered }}
          />
        )}
      </div>
    </article>
  );
}
