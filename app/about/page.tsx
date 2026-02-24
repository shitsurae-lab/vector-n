import { fetchPageBySlug } from '@/app/features/works/api/works';
import { CategoryHero } from '@/app/features/works/components/CategoryHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FluffyContainer } from '@/components/FluffyContainer';
import { NAV_PATHS } from '../constants/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};
// 固定ページなので params は不要。async を忘れずに。
export default async function AboutPage() {
  // 1. 固定ページ「about」のデータを取得
  const pageData = await fetchPageBySlug('about');

  // データが見つからない場合のガード
  if (!pageData) {
    return null;
  }

  const { acf } = pageData;
  // データを配列化
  const sections = [
    { id: 'identity', data: acf.about_identity },
    { id: 'capabilities', data: acf.about_capabilities },
    { id: 'expertise', data: acf.about_expertise },
  ];

  return (
    <main className='max-w-6xl mx-auto px-6 md:px-16'>
      {/* CategoryHero に流し込む。ACF名は作成したものに合わせて調整してください */}
      <CategoryHero
        src={acf?.about_hero_main || ''}
        subSrc={acf?.about_hero_sub || ''}
        title={acf?.about_hero_title || pageData.title.rendered}
        subtitle={acf?.about_hero_subtitle || 'ABOUT US'}
        desc={acf?.about_hero_desc || ''}
        alt={pageData.title.rendered}
      />
      <Breadcrumbs parent={NAV_PATHS.ABOUT} />
      <div className='flex flex-col'>
        {sections.map((section, index) => {
          const item = section.data;
          if (!item) return null;

          return (
            <FluffyContainer
              key={section.id}
              index={index}
              num={(index + 1).toString().padStart(2, '0')}
              enTitle={item.next_title}
              jaTitle={item.next_ja_title}
              category={item.next_desc}
              imageHref={item.next_image}
              // link={`#${section.id}`}
              // ctaText='Read More'
            />
          );
        })}
      </div>
    </main>
  );
}
