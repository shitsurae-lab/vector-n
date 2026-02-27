// app/features/works/components/OpeningProvider.tsx

"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

export default function OpeningProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 初期値を false にしておき、マウント後に必要なら true に変えるアプローチ
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited_vector_n");

    if (visited) {
      // 警告回避：setTimeout(0) または requestAnimationFrame で次フレームに回す
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      // 初回訪問：ロゴアニメの完了に合わせて待つ
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("visited_vector_n", "true");
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
}
