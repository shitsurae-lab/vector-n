import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 md:px-16">
      {/* ヒーローセクションの枠 */}
      <Skeleton className="my-12 aspect-21/9 w-full rounded-xl bg-zinc-200/60" />

      {/* タイトルエリアの枠 */}
      <div className="flex flex-col items-center py-10">
        <Skeleton className="mb-4 h-10 w-48 bg-zinc-200/60" />
        <Skeleton className="h-4 w-64 bg-zinc-200/40" />
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
    </main>
  );
}
