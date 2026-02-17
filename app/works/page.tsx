import Link from 'next/link';
import Image from 'next/image';

import { fetchAllCategories } from '../features/works/api/works'; //
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '../../components/Breadcrumbs';

//ページ本体の関数Page(【async】を前につけて、通信待ちができるように定義します)

export default async function WorksTopPage() {
  const categories = await fetchAllCategories();
  return (
    // <main className='p-10'>
    //   <h1 className='text-2xl font-bold mb-6'>カテゴリー一覧</h1>
    //   <pre>{JSON.stringify(categories, null, 2)}</pre>
    // </main>
    <main className='max-w-6xl mx-auto p-10'>
      <Breadcrumbs />
      <h1 className='text-3xl font-bold mb-10'>制作実績カテゴリー</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {categories.map((cat) => (
          <Link href={`/works/${cat.slug}`} key={cat.id} className='group'>
            <Card className='overflow-hidden hover:shadow-lg transition-shadow border-none bg-slate-50 pt-0 h-full'>
              {/* カテゴリー画像 (term_image) */}
              <div className='relative aspect-4/3 bg-slate-200'>
                {cat.acf?.next_image ? (
                  <Image
                    src={cat.acf.next_image}
                    alt={cat.acf.term_title || cat.name}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full text-slate-400'>
                    No Image
                  </div>
                )}
              </div>

              <CardHeader>
                {/* term_title がなければ標準の name を出す */}
                <CardTitle className='text-xl'>
                  {cat.acf?.term_title || cat.name}
                </CardTitle>
              </CardHeader>
              {/* term_desc がなければ標準の description を出す */}
              <CardContent>
                <p className='text-sm text-muted-foreground line-clamp-2 mt-2'>
                  {cat.acf?.term_desc || cat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
