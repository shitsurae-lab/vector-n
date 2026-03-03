// app/works/[category]/[slug]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 md:px-12">
      {/* パンくずのダミー */}
      <Skeleton className="mb-8 h-4 w-40 bg-zinc-100" />

      {/* メインイラストの大きな枠 (4:3 または 16:9) */}
      <Skeleton className="mb-12 aspect-[4/3] w-full rounded-2xl bg-zinc-200/60 md:aspect-[16/9]" />

      {/* タイトルと日付のダミー */}
      <div className="mb-10 space-y-4">
        <Skeleton className="h-4 w-24 bg-zinc-100" /> {/* Date */}
        <Skeleton className="h-12 w-3/4 bg-zinc-200/60" /> {/* Title */}
      </div>

      {/* 本文（文章）のダミー：数行の横棒で表現 */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full bg-zinc-100" />
        <Skeleton className="h-4 w-full bg-zinc-100" />
        <Skeleton className="h-4 w-4/5 bg-zinc-100" />
      </div>
    </main>
  );
}
