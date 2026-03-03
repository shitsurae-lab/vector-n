// app/works/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:px-16">
      {/* ヒーローのスケルトン */}
      <Skeleton className="mb-20 aspect-[16/9] w-full rounded-2xl bg-zinc-200/60" />

      {/* カテゴリー一覧のスケルトン */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden border-none bg-zinc-50/50">
            <Skeleton className="aspect-4/3 w-full bg-zinc-200/40" />
            <CardHeader className="p-5">
              <Skeleton className="h-7 w-1/2 bg-zinc-200/60" />
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <Skeleton className="h-4 w-full bg-zinc-100" />
              <Skeleton className="mt-2 h-4 w-2/3 bg-zinc-100" />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
