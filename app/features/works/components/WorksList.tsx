import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import he from 'he'; // タイトルの特殊文字変換用

// 型の定義
type Work = {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string; //タイトル文字列
  };
  excerpt: { rendered: string };
  content: {
    protected: boolean;
  };
  _embedded: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
};

type WorkListProps = {
  works: Work[];
  category: string;
};

export const WorksList = ({ works, category }: WorkListProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {works.map((work) => {
        // パスワード保護の判定
        const isProtected = work.content.protected;

        // アイキャッチ画像URLの取得（階層が深いので安全に取り出す）
        const thumbnail = work._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        const altText =
          work._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '';

        // 日付を「2026.01.28」の形式に整形
        const formattedDate = new Date(work.date)
          .toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\//g, '.');
        return (
          <Card
            key={work.id}
            className='overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow'
          >
            {/* b. 実際の画像（アイキャッチ画像）を表示 */}
            <div className='relative aspect-video bg-gray-100'>
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={altText}
                  fill
                  className={`object-cover ${isProtected ? 'blur-md' : ''}`}
                />
              ) : (
                <div className='flex items-center justify-center h-full text-gray-400'>
                  No Image
                </div>
              )}
              {isProtected && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/10'>
                  <span className='text-2xl'>🔒</span>
                </div>
              )}
            </div>

            <CardHeader className='p-4 pb-2'>
              <div className='text-xs text-gray-500 mb-1'>{formattedDate}</div>
              <CardTitle className='text-lg leading-tight'>
                <Link
                  href={`/works/${category}/${work.slug}`}
                  className='hover:underline'
                >
                  {he.decode(work.title.rendered)}
                </Link>
              </CardTitle>
            </CardHeader>

            {/* a. <CardContent>はexcerpt（抜粋）に */}
            <CardContent className='p-4 pt-0 flex-grow'>
              <div className='text-sm text-gray-600 line-clamp-3'>
                {isProtected ? (
                  <p>この投稿はパスワードで保護されています</p>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: work.excerpt.rendered }}
                  />
                )}
              </div>
            </CardContent>

            <CardFooter className='p-4 pt-0'>
              <Link
                href={`/works/${category}/${work.slug}`}
                className='text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800'
              >
                {isProtected ? 'View with Password' : 'Read More →'}
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
