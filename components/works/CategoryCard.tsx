import Image from "next/image";
import Link from "next/link";
import he from "he";
import { Category } from "@/app/features/works/api/types";

export default function CategoryCard({ category }: { category: Category }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const title = category.acf?.next_title || category.name;
  const excerpt = category.acf?.next_desc || category.description || "";
  const image =
    category.acf?.term_image_api ||
    category.acf?.next_image || // フォールバック
    "";

  return (
    <Link
      href={`${basePath}/works/${category.slug}`}
      className="group block aspect-[5/7] w-full overflow-hidden rounded-lg border border-[#e8e8e8] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:border-0 lg:shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]"
    >
      {/* カード画像 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-[#d9d9d9]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 767px) 335px, (max-width: 1139px) 332px, 340px"
          />
        ) : (
          <div className="h-full w-full bg-[#ebedee]" />
        )}
      </div>

      {/* カードテキスト */}
      <div className="flex flex-col gap-5 px-5 pt-5 pb-10">
        <h2 className="text-left font-sans text-base leading-normal font-bold text-[#333] md:text-lg">
          {title}
        </h2>
        <div>
          <p className="mb-4 min-h-20 font-sans text-sm leading-normal font-normal text-[#333]">
            {he.decode(excerpt)}
          </p>
          <span className="flex justify-end font-sans text-sm text-[#003366] transition-colors duration-200 group-hover:text-[#F5CA22]">
            more
          </span>
        </div>
      </div>
    </Link>
  );
}
