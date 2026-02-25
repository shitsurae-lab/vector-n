export const NAV_PATHS = {
  HOME: {
    label: "Home",
    path: "/",
  },
  WORKS: {
    label: "Works", // '制作実績' から英語に変えるとデザインが統一されます
    path: "works",
  },
  ABOUT: {
    label: "About",
    path: "about",
  },
  CONTACT: {
    label: "Contact",
    path: "contact",
  },
} as const; //as const で定数に

// 型を抽出
export type NavPath = (typeof NAV_PATHS)[keyof typeof NAV_PATHS];
