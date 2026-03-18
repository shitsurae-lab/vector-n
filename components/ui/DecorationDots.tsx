// components/ui/DecorationDots.tsx
"use client";
import { motion } from "framer-motion";
interface DecorationDotsProps {
  shape?: "rect" | "triangle"; // 外形（Maskで制御）
  className?: string; // 位置やサイズ用
  opacity?: number; // 濃淡用 (0〜1)
  rotate?: number; // 回転角度用
  dotSize?: string; // 密度の微調整用
  width?: string; //サイズ
  zIndex?: number;
}

export const DecorationDots = ({
  shape = "rect",
  className,
  opacity = 0.3,
  rotate = 15,
  dotSize = "8px 8px",
  width = "clamp(40px, 8.84vw + 6.85px, 120px)",
  zIndex = 50,
}: DecorationDotsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotate: rotate }} // 最初は透明で、少しだけ小さい
      whileInView={{ opacity: opacity, scale: 1 }} // 視界に入ったら本来の姿に
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.5,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`pointer-events-none ${className}`}
      style={{
        width: width,
        zIndex: zIndex,
        aspectRatio: "1 / 1",
        backgroundImage: `url('/assets/dot-pattern.svg')`,
        backgroundSize: dotSize,
        backgroundRepeat: "repeat",
        clipPath:
          shape === "triangle" ? "polygon(0 0, 100% 0, 0 100%)" : "none",
        position: "absolute",
      }}
    />
  );
};
