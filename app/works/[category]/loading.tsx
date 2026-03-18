import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="relative w-screen overflow-hidden bg-[#f8f6f3]">
      {/* 形状定義用のSVG（CategoryHeroと同じマスクを再現） */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="loading-fluid-mask" clipPathUnits="objectBoundingBox">
            <path d="M0,0.322 V0 H1 V0.322 C1,0.706 0.714,1 0.511,1 C0.316,1 0,0.847 0,0.322 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* --- FV: CategoryHero のスケルトン --- */}
      <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[80svh] max-h-[900px] w-screen bg-gradient-to-b from-[#eceae7] via-[#f8f6f3] to-[#f8f6f3] md:h-[70vh] lg:h-svh">
        <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col px-6 md:px-12">
          {/* --- メインビジュアルエリア --- */}
          <div className="relative mr-auto ml-0 aspect-[4/3] w-full md:aspect-[4/3] lg:aspect-[16/9] lg:max-w-[80vw] xl:max-w-[1080px]">
            {/* メイン画像の大きなプレースホルダー */}
            <Skeleton
              className="h-full w-full bg-zinc-200/60 shadow-inner"
              style={{ clipPath: "url(#loading-fluid-mask)" }}
            />
            {/* 右下の丸いサブ画像 */}
            <Skeleton className="absolute -right-4 -bottom-30 z-40 aspect-square w-[40vw] max-w-[280px] rounded-full bg-zinc-300/50 shadow-2xl md:-right-6 md:-bottom-20 md:w-[22vw] lg:-right-2 lg:-bottom-15 lg:w-[18vw]" />
          </div>

          {/* --- テキストレイヤー（左下のタイトル部分） --- */}
          <div className="absolute bottom-[20%] left-6 z-30 w-[calc(100%-80px)] sm:bottom-[24%] sm:w-[calc(100%-40px)] md:bottom-[8%] md:left-20 md:w-[calc(100%-160px)]">
            {/* サブタイトル（細長い帯イメージ） */}
            <Skeleton className="mb-4 h-6 w-40 bg-zinc-300/40" />

            {/* メインタイトル（大きな太い塊） */}
            <div className="space-y-4">
              <Skeleton className="h-14 w-[85%] bg-zinc-300/60 md:h-24 md:w-[70%]" />
              <Skeleton className="h-14 w-[60%] bg-zinc-300/60 md:h-24 md:w-[40%]" />
            </div>
          </div>
        </div>

        {/* --- Scroll Down Indicator --- */}
        <div className="absolute right-6 bottom-10 left-auto z-50 flex flex-col items-end gap-4 sm:bottom-8 md:bottom-10 lg:bottom-40">
          <Skeleton className="h-16 w-[1px] bg-zinc-300" />
        </div>
      </section>

      {/* --- FV直下のパンくず等のエリア --- */}
      <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-12">
        <Skeleton className="h-5 w-48 bg-zinc-200/50" />
      </div>
      {/* カードリストの枠（6個分） */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card
            key={i}
            className="flex h-full flex-col overflow-hidden border-none bg-zinc-50/50"
          >
            {/* 画像部分 */}
            <Skeleton className="aspect-video w-full bg-zinc-200/60" />

            <CardHeader className="p-4 pb-2">
              <Skeleton className="mb-2 h-3 w-20 bg-zinc-200/40" /> {/* 日付 */}
              <Skeleton className="h-6 w-3/4 bg-zinc-200/60" /> {/* タイトル */}
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <Skeleton className="h-4 w-full bg-zinc-200/40" />{" "}
              {/* 抜粋1行目 */}
              <Skeleton className="mt-2 h-4 w-2/3 bg-zinc-200/40" />{" "}
              {/* 抜粋2行目 */}
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-3 w-24 bg-zinc-200/60" /> {/* Read More */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
