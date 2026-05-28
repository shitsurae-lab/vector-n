import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { type NavPath } from "@/app/constants/config";

// ----------------------------------------------------------------
// 型定義
// ----------------------------------------------------------------
// Breadcrumbs コンポーネントの Props をそのまま受け取る
// ----------------------------------------------------------------
type PageShellProps = {
  title: string;
  // Breadcrumbs に渡す props をそのまま定義
  parent?: NavPath;
  category?: {
    name: string;
    slug: string;
  };
  breadcrumbTitle?: string; // title は PageShell 側で使うので別名に
  children: React.ReactNode;
};

// ----------------------------------------------------------------
// PageShell コンポーネント
// ----------------------------------------------------------------
export default function PageShell({
  title,
  parent,
  category,
  breadcrumbTitle,
  children,
}: PageShellProps) {
  return (
    <main className="relative flex w-full flex-col items-center bg-[linear-gradient(to_bottom,#fdfbfb,#ebedee)] px-[10px] pt-[80px] pb-20 md:px-5 md:pt-[100px] lg:px-0 lg:pt-[120px]">
      {/* 左上 流体シェイプ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-0 h-[120px] w-[160px] md:h-[210px] md:w-[280px] lg:h-[300px] lg:w-[400px]"
      >
        <Image
          src="/assets/images/common/main-shape.svg"
          alt=""
          fill
          className="object-cover object-left-top"
        />
      </div>

      {/* パンくず */}
      <div className="relative z-10 w-full">
        <Breadcrumbs
          parent={parent}
          category={category}
          title={breadcrumbTitle}
        />
      </div>

      {/* main-container */}
      <div className="relative z-10 flex w-[355px] flex-col items-center pt-20 md:w-[728px] lg:w-full lg:max-w-[1140px]">
        {/* ページタイトル */}
        <div className="flex w-full flex-col items-center gap-6 pb-20">
          <h1 className="text-center font-sans text-2xl font-bold text-[#003366] lg:text-[30px]">
            {title}
          </h1>
          <div className="h-1 w-10 bg-[#F5CA22]" />
        </div>

        {children}
      </div>
    </main>
  );
}
