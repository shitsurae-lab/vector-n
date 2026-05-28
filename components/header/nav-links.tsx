"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  // { name: "About", href: "/about" },
  { name: "Works", href: "/works" },
  { name: "Contact", href: "/contact" },
] as const;

export const NavLinks = ({
  pathname,
  onItemClick,
  className,
  variant = "horizontal",
}: {
  pathname: string;
  onItemClick?: () => void;
  className?: string;
  variant?: "horizontal" | "vertical" | "drawer";
}) => (
  <ul className={className}>
    {navItems.map((item) => {
      const isActive =
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

      return (
        <li key={item.name} className="list-none">
          {/* ── horizontal (PC/Tablet nav) ── */}
          {variant === "horizontal" && (
            <Link
              href={item.href}
              onClick={onItemClick}
              className={[
                "group font-zalando relative block py-1 font-medium uppercase no-underline",
                "text-[14px] font-normal transition-colors duration-150",
                isActive ? "text-[#333]" : "text-[#333] hover:text-[#333]",
              ].join(" ")}
            >
              {item.name}

              {/* アクティブ: 左から右へ常時表示 */}
              {isActive && (
                <motion.span
                  layoutId="nav-active-bar"
                  className="absolute right-0 bottom-[-2px] left-0 h-[1px] bg-[#333]"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              {/* 非アクティブ: hoverで中央から広がる */}
              {!isActive && (
                <span className="absolute right-0 bottom-[-2px] left-0 h-[1px] origin-center scale-x-0 bg-[#333] transition-transform duration-200 group-hover:scale-x-100" />
              )}
            </Link>
          )}

          {/* ── drawer (SPドロワー) ── */}
          {variant === "drawer" && (
            <Link
              href={item.href}
              onClick={onItemClick}
              className={[
                "font-zalando block py-4 text-lg font-medium uppercase no-underline",
                "text-[#333]",
              ].join(" ")}
            >
              {item.name}
            </Link>
          )}

          {/* ── vertical (既存の縦並び、後方互換) ── */}
          {variant === "vertical" && (
            <Link
              href={item.href}
              onClick={onItemClick}
              className="group relative block no-underline"
            >
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={[
                  "font-zalando text-[10px] uppercase transition-colors duration-500",
                  isActive
                    ? "font-bold tracking-[0.4em] text-[#333]"
                    : "tracking-[0.3em] text-[#333] group-hover:tracking-[0.4em] group-hover:text-[#2a2723]",
                ].join(" ")}
              >
                {item.name}
                {/* {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="ml-4 inline-block h-1 w-1 rounded-full bg-zinc-800 align-middle"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )} */}
              </motion.div>
            </Link>
          )}
        </li>
      );
    })}
  </ul>
);
