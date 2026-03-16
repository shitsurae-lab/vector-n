"use client";

import Lottie from "lottie-react";
import { motion } from "framer-motion";
import logoAnimation from "@/public/data/data.json";

export default function LoadingScreen() {
  const easeQuart = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      // メイン画面へ切り替わる時のフェードアウト
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: easeQuart }}
      // 全画面固定・最前面・背景色の指定
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f8f6f3]"
    >
      {/* ロゴのサイズレスポンシブ対応 */}
      <div className="w-[320px] md:w-[480px]">
        <Lottie
          animationData={logoAnimation}
          loop={false}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </motion.div>
  );
}
