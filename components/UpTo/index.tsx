"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

export const UpTo = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // 💡 クリックされた（発射中）かどうかのステート
  const [isLaunching, setIsLaunching] = useState(false);
  const launchingRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (launchingRef.current) return;
    if (latest < 120) {
      setIsVisible(false);
      return;
    }
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const handleLaunch = () => {
    if (launchingRef.current) return;

    launchingRef.current = true;
    setIsLaunching(true); // 🚀 ここで発射モードをONにする

    requestAnimationFrame(() => {
      setIsVisible(false);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    const ROCKET_DURATION = 1.2;

    setTimeout(() => {
      launchingRef.current = false;
      setIsLaunching(false); // 頂上に着いたらOFFに戻す
      setIsVisible(false);
    }, ROCKET_DURATION * 1000);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed right-6 bottom-6 z-50 cursor-pointer select-none"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            isLaunching
              ? {
                  y: "-120vh",
                  opacity: 0,
                  transition: { duration: 1.2, ease: [0.45, 0, 0.55, 1] },
                }
              : { opacity: 0, scale: 0.5, y: 20 }
          }
          //ホバーアニメーションは、デバイスがhover可能で、且つ発射可能な状態のとき有効
          whileHover={
            typeof window !== "undefined" &&
            window.matchMedia("(hover: hover)").matches &&
            !isLaunching
              ? "hover"
              : undefined
          }
          whileTap={{ scale: 0.9 }}
          onClick={handleLaunch}
        >
          {/* サイズ制御用のコンテナ */}
          <div className="relative aspect-square h-24 w-24 md:h-32 md:w-32">
            {/* 1. 通常時の画像（loop.webp） */}
            {/* 発射中でないときだけ表示 */}
            {!isLaunching && (
              <motion.div
                className="absolute inset-0"
                // ホバーされたらじわっと消す
                variants={{
                  hover: {
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.6 },
                  },
                }}
              >
                <Image
                  src="/assets/images/common/loop.webp"
                  alt="UP To Loop"
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </motion.div>
            )}

            {/* 2. hover時の画像（launch.webp） */}
            {/* 発射中でないときだけ表示 */}
            {!isLaunching && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.95 }}
                variants={{
                  hover: {
                    opacity: 1,
                    scale: 1.05,
                    // 💡 左右（x）と上下（y）に細かく動かす（0.5 = 0.5px）
                    x: [0, -0.5, 0.5, -0.5, 0.5, 0],
                    y: [0, 0.5, -0.5, 0.5, -0.5, 0],
                    transition: {
                      duration: 0.5, // じわっと切り替わる全体の時間
                      // 震える動き（x, y）の設定
                      x: { repeat: Infinity, duration: 0.15, ease: "linear" },
                      y: { repeat: Infinity, duration: 0.15, ease: "linear" },
                      opacity: { duration: 0.5 }, // 不透明度だけは0.5秒かけてじわっと変える
                      scale: { duration: 0.5 },
                    },
                  },
                }}
              >
                <Image
                  src="/assets/images/common/launch.webp"
                  alt="UP To Hover"
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </motion.div>
            )}

            {/* 3. クリック（発射）時の画像（back-to-top.webp） */}
            {/* 発射中だけ出現させて、そのまま上に飛ばす */}
            {isLaunching && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 1, scale: 1.1 }}
              >
                <Image
                  src="/assets/images/common/back-to-top.webp"
                  alt="UP To Launch"
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
