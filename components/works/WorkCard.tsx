import Image from "next/image";
import Link from "next/link";
import he from "he";

// ----------------------------------------------------------------
// 型定義
// ----------------------------------------------------------------
export type WorkCardData = {
  slug: string;
  category: string;
  title: string;
  image: string;
  excerpt: string;
};

// ----------------------------------------------------------------
// WorkCard コンポーネント
// ----------------------------------------------------------------
// Zeplin:
//   PC:  340×454  shadow  rounded-8px  no border
//   Tab: 332×442  border #e8e8e8  rounded-8px
//   SP:  335×448  border #e8e8e8  rounded-8px
//
//   card-photo: aspect-[4/3] で全bp統一
//   card-text:  gap-20px  padding: 20px 20px 40px（全bp共通）
//   card-title: PC/Tab 18px bold / SP 16px bold  color #333
//   p:          14px  color #333
//   more:       14px  color #003366 → hover: #F5CA22
//
// basePath:
//   NEXT_PUBLIC_BASE_PATH で制御
//   開発中（/test配下）: NEXT_PUBLIC_BASE_PATH="/test"
//   本番:                NEXT_PUBLIC_BASE_PATH=""
// ----------------------------------------------------------------
export default function WorkCard({ work }: { work: WorkCardData }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <Link
      href={`${basePath}/works/${work.category}/${work.slug}`}
      className="group block aspect-[5/7] w-full overflow-hidden rounded-lg border border-[#e8e8e8] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:border-0 lg:shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]"
    >
      {/* カード画像 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-[#d9d9d9]">
        {work.image ? (
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1440px) 33vw, 400px"
            quality={85}
          />
        ) : (
          <div className="h-full w-full bg-[#ebedee]" />
        )}
      </div>

      {/* カードテキスト */}
      <div className="flex flex-col gap-5 px-5 pt-5 pb-10">
        <h2 className="text-left font-sans text-base leading-normal font-bold text-[#333] md:text-lg">
          {work.title}
        </h2>
        <div>
          <p className="mb-4 min-h-20 font-sans text-sm leading-normal font-normal text-[#333]">
            {he.decode(work.excerpt)}
          </p>
          <span className="flex justify-end font-sans text-sm text-[#003366] transition-colors duration-200 group-hover:text-[#F5CA22]">
            more
          </span>
        </div>
      </div>
    </Link>
  );
}
