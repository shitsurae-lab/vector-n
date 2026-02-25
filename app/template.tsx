// app/template.tsx
"use client";

import { motion } from "framer-motion";

// 高級感を出すためのイージング設定
const MDN_EASE_QUART = [0.22, 1, 0.36, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "2%" }} // 文字列で指定してカクつき防止
      animate={{ opacity: 1, y: 0 }}
      style={{ willChange: "transform, opacity" }} // GPU加速
      transition={{
        duration: 0.8,
        ease: MDN_EASE_QUART,
      }}
    >
      {children}
    </motion.div>
  );
}
