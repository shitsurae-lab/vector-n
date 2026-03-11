import { motion } from "framer-motion";
// モバイル用ハンバーガーメニュー・コンポーネント
//1. shadcn/ui の Sheet (Radix UI) と状態を同期。
//2. Lucideのデザイン性を維持しつつ、SVGのパスを framer-motion で制御。
//3. 三本線の状態（Menu）から X への形状変化をアニメーション化。

export const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      <svg
        className="size-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* 上段の線:
          開閉時に始点(x1, y1)と終点(x2, y2)を移動させ、45度の角度をつける */}
        <motion.line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          animate={
            isOpen
              ? { x1: 6, x2: 18, y1: 6, y2: 18 }
              : { x1: 3, x2: 21, y1: 6, y2: 6 }
          }
          transition={{ duration: 0.3 }}
        />
        {/*  中段の線: 開閉時に不透明度(opacity)を操作し、中央に収束させながら消去する */}
        <motion.line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          animate={
            isOpen
              ? { opacity: 0, x1: 12, x2: 12 }
              : { opacity: 1, x1: 3, x2: 21 }
          }
          transition={{ duration: 0.3 }}
        />
        {/* 下の線 上段と逆方向の角度（-45度）をつけて交差させる */}
        <motion.line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
          animate={
            isOpen
              ? { x1: 6, x2: 18, y1: 18, y2: 6 }
              : { x1: 3, x2: 21, y1: 18, y2: 18 }
          }
          transition={{ duration: 0.3 }}
        />
      </svg>
    </div>
  );
};
