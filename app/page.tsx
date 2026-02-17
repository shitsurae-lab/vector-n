import { fetchAllCategories, fetchAboutPage } from './features/works/api/works';
import { CapsuleSection } from './features/works/components/CapsuleSection';
import { MainVisualSlider } from './features/works/components/MainVisualSlider';
import { FluffyContainer } from '@/components/FluffyContainer';

export default async function WorksTopPage() {
  // 1. カテゴリー一覧と、Aboutページ（固定ページ）のデータを同時に取得
  const [categories, aboutData] = await Promise.all([
    fetchAllCategories(),
    fetchAboutPage(),
  ]);

  // スライダー用に画像を抽出（画像があるカテゴリーだけを対象にする）
  const sliderImages = categories
    .filter((cat) => cat.acf?.term_image_api)
    .map((cat) => ({
      src: cat.acf?.next_image || '',
      subSrc: cat.acf?.next_image_sub || '',
      alt: cat.name || '',
      title: cat.acf?.mv_title || '',
      subtitle: cat.acf?.mv_subtitle || '',
    }));

  // --- CapsuleSection（Aboutデータ）用データの整形 ---
  const acfAbout = aboutData?.acf;
  const capsuleItems = acfAbout
    ? [
        {
          id: 'identity',
          enTitle: acfAbout.about_identity?.next_title || 'IDENTITY',
          jaTitle: acfAbout.about_identity?.next_ja_title || 'アイデンティティ',
          image: acfAbout.about_identity?.next_image || '',
        },
        {
          id: 'capabilities',
          enTitle: acfAbout.about_capabilities?.next_title || 'CAPABILITIES',
          jaTitle:
            acfAbout.about_capabilities?.next_ja_title || 'ケイパビリティ',
          image: acfAbout.about_capabilities?.next_image || '',
        },
        {
          id: 'expertise',
          enTitle: acfAbout.about_expertise?.next_title || 'EXPERTISE',
          jaTitle: acfAbout.about_expertise?.next_ja_title || 'エキスパート',
          image: acfAbout.about_expertise?.next_image || '',
        },
      ]
    : [];

  // 2. FluffyContainer用：特定のスラッグだけで絞り込み
  const targetSlugs = [
    'wordpress',
    'woocommerce',
    'website-building',
    'design',
  ];

  const filteredCategories = categories.filter((cat) =>
    targetSlugs.includes(cat.slug),
  );

  return (
    <main className='max-w-6xl mx-auto'>
      {/* スライダーを表示 */}
      {sliderImages.length > 0 && <MainVisualSlider images={sliderImages} />}
      {/* END スライダーを表示 */}
      {/* 2. Capsule Section (Aboutページからのデータを表示) */}
      {capsuleItems.length > 0 && <CapsuleSection items={capsuleItems} />}
      {/* fluffyコンテナーを表示 */}
      {filteredCategories.map((cat, index) => (
        <FluffyContainer
          key={cat.id}
          index={index}
          num={(index + 1).toString().padStart(2, '0')}
          enTitle={cat.acf?.next_title || cat.slug}
          jaTitle={cat.name}
          category={cat.acf?.next_desc || ''}
          link={`/works/${cat.slug}/`}
          imageHref={cat.acf!.next_image!} // ここで props に imageHref を渡します
          ctaText={cat.acf?.next_cta || 'View More'}
        />
      ))}
    </main>
  );
}
