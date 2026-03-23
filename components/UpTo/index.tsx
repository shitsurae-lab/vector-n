"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import Image from "next/image";

export const UpTo = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState("/assets/loop.webp");
  const [isLaunching, setIsLaunching] = useState(false);

  //🚀発射中判定(scrollイベントから対象外にする)
  const launchingRef = useRef(false);

  // トップへ戻るアイコンの出現条件: Headerのロジックと完全に同期させる
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (launchingRef.current) return;

    const previous = scrollY.getPrevious() ?? 0;

    // Headerの hidden 条件と全く同じにする
    // 「100px以上 かつ 下方向」ならボタンを出す（＝Headerが消えるタイミング）
    if (latest > previous && latest > 100) {
      setIsVisible(true);
    } else {
      // それ以外（上方向、または100px以下）はボタンを隠す（＝Headerが出るタイミング）
      setIsVisible(false);
    }
  });

  const handleLaunch = () => {
    if (launchingRef.current) return;

    launchingRef.current = true;
    setIsLaunching(true);
    setImgSrc("/assets/action.webp");

    requestAnimationFrame(() => {
      setIsVisible(false);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    const ROCKET_DURATION = 0.7;

    setTimeout(() => {
      launchingRef.current = false;
      setIsLaunching(false);
      setIsVisible(false);
      setImgSrc("/assets/loop.webp");
    }, ROCKET_DURATION * 1000);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          // z-50のHeaderより前面、または同等に配置
          className="fixed right-6 bottom-6 z-50 cursor-pointer select-none"
          // --- 出現・消失アニメーション ---
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            isLaunching
              ? {
                  y: "-120vh",
                  opacity: 0,
                  transition: { duration: 0.7, ease: [0.45, 0, 0.55, 1] },
                }
              : { opacity: 0, scale: 0.5, y: 20 } // 通常時は下へ消える
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLaunch}
        >
          {/* Tailwindでサイズ制御。アスペクト比維持のため aspect-square */}
          <div className="relative aspect-square h-24 w-24 md:h-32 md:w-32">
            <Image
              src={imgSrc}
              alt="UP To"
              fill
              className="object-contain"
              unoptimized // アニメーションWebP必須
              priority
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
