"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);

  // マウス座標の管理
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 滑らかな追従設定
  const springConfig = { damping: 35, stiffness: 250, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // ホバー対象の判定（aタグ、buttonタグ、または任意に指定した要素）
      const target = e.target as HTMLElement;
      const isTarget =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[data-cursor="hover"]');

      setIsHovering(!!isTarget);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] rounded-full"
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        width: 12,
        height: 12,
        //backgroundColor: "#d1cfcc", // 背景より少し濃い色で馴染ませる
        backgroundColor: "#62510E", //Hades
        mixBlendMode: "difference", // 黒文字や濃い色のボタンの上で白く反転
      }}
      animate={{
        scale: isHovering ? 4.5 : 1,
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
    />
  );
}
