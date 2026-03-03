"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const MDN_EASE_QUART = [0.22, 1, 0.36, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname} // ページごとに確実にアニメーションをリセット
      initial={{ opacity: 0, y: 15 }} // 固定pxでイラストのシャープさを維持
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      style={{ willChange: "transform, opacity" }}
      transition={{
        duration: 0.6, // ページ遷移は少し速め（0.6s）がストレスフリー
        ease: MDN_EASE_QUART,
      }}
    >
      {children}
    </motion.div>
  );
}
