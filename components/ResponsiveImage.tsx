import { getImageProps } from "next/image";

type ImageSet = {
  pc: string;
  tablet: string;
  mobile: string;
  alt: string;
};

// components/ResponsiveImage.tsx

export default function ResponsiveImage({
  images,
  className,
}: {
  images: ImageSet;
  className?: string;
}) {
  const common = { alt: images.alt, priority: true };

  // 各サイズの定義
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: images.pc,
    width: 1366,
    height: 650,
  });

  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    src: images.tablet,
    width: 768,
    height: 464,
  });

  // mobileをベース（フォールバック）にする
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: images.mobile,
    width: 375,
    height: 210,
  });

  return (
    <picture className={className}>
      {/* 1366px以上 */}
      <source media="(min-width: 1366px)" srcSet={desktop} />
      {/* 768px〜1365px */}
      <source media="(min-width: 768px)" srcSet={tablet} />
      {/* それ以下（モバイル） */}
      <img
        {...rest}
        srcSet={mobile}
        // classNameの競合を防ぐため、w-fullを基本に外部からのclassNameを結合
        className={`block h-auto w-full ${className}`}
      />
    </picture>
  );
}
