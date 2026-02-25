"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import he from "he";
import { WorkData } from "@/app/features/works/api/works"; // APIファイルから型をインポート
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Search, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Breadcrumbs } from "./Breadcrumbs";
import { NAV_PATHS } from "@/app/constants/config";
import { getCategoryFromWork } from "@/app/features/works/api/works";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  slug: string;
  categorySlug: string;
  initialWork: WorkData;
};

export const ProtectedContent = ({
  slug,
  categorySlug,
  initialWork,
}: Props) => {
  const [password, setPassword] = useState("");
  const [workData, setWorkData] = useState<WorkData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const categoryInfo = getCategoryFromWork(initialWork);

  // 初回読み込み時、もし最初から保護されていなければデータを表示
  useEffect(() => {
    if (!initialWork.content.protected) {
      setWorkData(initialWork);
    }
  }, [initialWork]);

  // パスワード認証
  const handleVerify = async () => {
    setLoading(true);
    setError(false);
    const url = `https://naname-lab.net/wp-json/wp/v2/achievement?slug=${slug}&password=${password.trim()}&_embed`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setWorkData(data[0] as WorkData);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workData) return;

    const sections = gsap.utils.toArray<HTMLElement>("section.story-section");

    sections.forEach((section) => {
      const elements = section.querySelectorAll(".animate-item");

      gsap.fromTo(
        elements,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2, // 0.2秒刻みで順番に発火
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // 画面の下から15%の位置に来たら開始
            toggleActions: "play none none none", // 1回だけ再生
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [workData]);

  // 🔓 認証成功後、または元々公開されている場合のレイアウト
  if (workData) {
    const detail = workData.acf?.work_detail;
    const title = he.decode(workData.title.rendered);
    const displayImage =
      workData.acf?.work_detail.next_api_image ||
      workData._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const subImages = [
      detail?.sub_image_01,
      detail?.sub_image_02,
      detail?.sub_image_03,
      detail?.sub_image_04,
    ].filter(Boolean);

    return (
      <div className="animate-in fade-in duration-700">
        {/* 1. ヒーローエリア (左右突き抜け) */}
        <section className="relative right-1/2 left-1/2 -mr-[50vw] mb-12 -ml-[50vw] w-screen border-b border-zinc-100 bg-zinc-50 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="mb-4 block text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
              {categorySlug}
            </span>
            <h1 className="mb-10 text-2xl leading-tight font-black text-zinc-900 md:text-4xl">
              {title}
            </h1>
            {displayImage && (
              <div className="mx-auto max-w-[880px] overflow-hidden rounded-xl bg-white shadow-2xl">
                <img
                  src={displayImage}
                  alt={title}
                  className="block h-auto w-full"
                />
              </div>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <Breadcrumbs
            parent={NAV_PATHS.WORKS}
            category={
              categoryInfo
                ? { name: categoryInfo.name, slug: categoryInfo.slug }
                : { name: "Works", slug: "works" }
            }
            title={initialWork.title.rendered}
          />

          {/* 3. スペック表 (shadcn/ui Table + レスポンシブ縦線) */}
          <section className="mb-24">
            <div className="overflow-hidden rounded-lg border border-zinc-200 shadow-sm">
              <Table>
                <TableBody>
                  {[
                    { label: "制作期間", value: detail?.period },
                    { label: "担当分野", value: detail?.role },
                    { label: "Design Tools", value: detail?.tools_design },
                    { label: "Coding Tools", value: detail?.tools_coding },
                    {
                      label: "URL",
                      value: detail?.site_url ? (
                        <a
                          href={detail.site_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-blue-600 transition-all hover:text-blue-800 hover:underline"
                        >
                          サイトを閲覧する
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                        </a>
                      ) : (
                        "非公開"
                      ),
                    },
                  ].map((spec, i) => (
                    <TableRow
                      key={i}
                      className="flex flex-col border-b last:border-0 hover:bg-transparent md:table-row"
                    >
                      <TableCell className="w-full border-zinc-200 bg-zinc-50/50 px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase md:w-[200px] md:border-r">
                        {spec.label}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm leading-relaxed whitespace-pre-wrap text-zinc-700">
                        {spec.value || "---"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 4. ストーリーセクション (パターンB) */}
          <div className="mb-32 space-y-40">
            {[
              {
                label: "Background",
                title: "なぜ、この制作が必要だったのか。",
                body: detail?.background,
              },
              {
                label: "Design",
                title: "誰に、何を届けるためのデザインか。",
                body: detail?.design_intent,
              },
              {
                label: "Intent",
                title: "デザインと実装を繋ぐ、論理の構築",
                body: detail?.creative_logic,
              },
              {
                label: "Result",
                title: "完成後に見えてきた新しい課題と手応え。",
                body: detail?.results,
              },
            ].map(
              (item, i) =>
                item.body && (
                  <section
                    key={i}
                    className="story-section mx-auto max-w-2xl text-center"
                  >
                    {/* ラベル: 繊細なラインで囲む */}
                    <div className="animate-item mb-6 flex items-center justify-center gap-4">
                      <div className="h-[1px] w-4 bg-zinc-200"></div>
                      <span className="zinc-200 text-[10px] font-bold tracking-[0.3em] uppercase">
                        {item.label}
                      </span>
                      <div className="h-[1px] w-4 bg-zinc-200"></div>
                    </div>

                    <h3 className="animate-item mb-8 text-xl font-bold tracking-tight text-zinc-900 md:text-2xl lg:text-3xl">
                      {item.title}
                    </h3>

                    {/* 本文: 左寄せにしつつ、読みやすさを追求 */}
                    <p className="animate-item text-left text-[15px] leading-[2] font-medium whitespace-pre-wrap text-zinc-500 lg:text-base">
                      {item.body}
                    </p>
                  </section>
                ),
            )}
          </div>

          {/* 5. サブ画像 */}
          {subImages.length > 0 && (
            <section className="mb-32 grid grid-cols-1 gap-8 md:grid-cols-2">
              {subImages.map((img, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-lg">
                      <img
                        src={img as string}
                        alt=""
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
                      />
                      {/* 虫眼鏡アイコンなどを出すと親切 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex flex-col items-center gap-2">
                          <ZoomIn className="animate-in zoom-in-75 h-8 w-8 text-white duration-300" />
                          <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                            View Image
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  {/* 拡大表示される中身 */}
                  <DialogContent className="flex max-h-[95vh] max-w-[95vw] items-center justify-center overflow-hidden border-none bg-transparent p-0 shadow-none">
                    <div className="relative max-h-[90vh] max-w-[90vw]">
                      <img
                        src={img as string}
                        alt=""
                        className="animate-in zoom-in-95 h-auto max-h-[90vh] w-full rounded-lg object-contain duration-300"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </section>
          )}

          {/* 6. 一覧へ*/}
          <section className="mt-20 border-t border-zinc-100 py-20 text-center">
            <Link
              href={`/works/${categorySlug}`}
              className="inline-block rounded-full bg-zinc-900 px-12 py-4 text-[10px] font-bold tracking-widest text-white uppercase shadow-xl transition-all hover:bg-black"
            >
              {categorySlug} の実績一覧へ
            </Link>
          </section>
        </div>
      </div>
    );
  }
  // 🔒 認証待ちの状態
  return (
    <div className="animate-in fade-in mx-auto max-w-4xl px-6 py-32 text-center duration-500">
      <div className="rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12">
        <p className="mb-6 text-4xl">🔒</p>
        <h2 className="mb-2 text-xl font-bold text-zinc-900">
          Protected Content
        </h2>
        <p className="mb-10 text-sm text-zinc-500">
          この実績の閲覧にはパスワードが必要です。
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full px-10 font-bold shadow-lg transition-transform hover:scale-105"
            >
              パスワードを入力して閲覧
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Authentication</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <Input
                type="password"
                placeholder="Enter password..."
                className="py-6 text-center focus-visible:ring-zinc-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              />
              {error && (
                <p className="text-center text-xs font-bold text-red-500">
                  パスワードが正しくありません。
                </p>
              )}
              <Button
                onClick={handleVerify}
                className="w-full py-6 font-bold"
                disabled={loading}
              >
                {loading ? "認証中..." : "閲覧する"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
