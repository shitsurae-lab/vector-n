import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* --- Header Section Skeleton --- */}
      <section className="mx-auto max-w-4xl px-6 pt-48 pb-10 text-center flex flex-col items-center">
        {/* "Ready to start...?" の部分 */}
        <Skeleton className="mb-4 h-3 w-40 bg-zinc-200/60" />
        
        {/* "Contact" タイトル部分 */}
        <Skeleton className="mb-8 h-10 w-64 bg-zinc-300/60 md:mb-12 md:h-12" />
        
        {/* 説明テキスト部分（2行分） */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-72 bg-zinc-200/40 md:w-80" />
          <Skeleton className="mx-auto h-5 w-48 bg-zinc-200/40" />
        </div>
      </section>

      {/* --- Breadcrumbs Skeleton --- */}
      <div className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen mb-12">
        <div className="mx-auto max-w-2xl px-6">
          <Skeleton className="h-4 w-32 bg-zinc-200/40" />
        </div>
      </div>

      {/* --- ContactForm Skeleton --- */}
      <div className="mx-auto max-w-2xl space-y-8 pb-20">
        {/* 名前、メール、件名、内容など 4つの入力フィールドを想定 */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20 bg-zinc-200/60" /> {/* ラベル */}
            <Skeleton className="h-12 w-full bg-zinc-100/80 rounded-md" /> {/* 入力枠 */}
          </div>
        ))}
        {/* 送信ボタン */}
        <Skeleton className="mx-auto h-14 w-full max-w-[200px] bg-zinc-300/60 rounded-full" />
      </div>
    </main>
  );
}
