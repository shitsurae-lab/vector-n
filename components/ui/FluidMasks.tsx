// components/UI/FluidMasks.tsx
"use client";

// 今回の「深いU字」
export const FluidMaskPrimary = () => (
  <svg
    width="0"
    height="0"
    className="pointer-events-none absolute"
    aria-hidden="true"
  >
    <defs>
      <clipPath id="fluid-mask-mv" clipPathUnits="objectBoundingBox">
        {/* 新しい「深いU字」形状の正規化パス */}
        <path d="M0,0.322 V0 H1 V0.322 C1,0.706 0.714,1 0.511,1 C0.316,1 0,0.847 0,0.322 Z" />
      </clipPath>
    </defs>
  </svg>
);

// 以前の「流体シェイプ」（バックアップ用）
export const FluidMaskLegacy = () => (
  <svg
    width="0"
    height="0"
    className="pointer-events-none absolute"
    aria-hidden="true"
  >
    <defs>
      <clipPath id="fluid-mask-mv" clipPathUnits="objectBoundingBox">
        <path
          transform="scale(0.00105, 0.00155)"
          d="M119.624 588C14.1239 497.646 -37.8762 170 31.6616 0H824.124C920.624 25.5 950.124 90 950.124 146C950.124 226 880.942 337.14 726.162 389C653.624 413.304 539.124 529.5 457.124 588C353.124 662.195 202.624 659.084 119.624 588Z"
        />
      </clipPath>
    </defs>
  </svg>
);
