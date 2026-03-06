"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Works", href: "/works" },
  { name: "Contact", href: "/contact" },
];

export const NavLinks = ({
  pathname,
  onItemClick,
  className,
}: {
  pathname: string;
  onItemClick?: () => void;
  className?: string;
}) => (
  <ul className={className}>
    {navItems.map((item) => {
      const isActive =
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

      return (
        <li key={item.name} className="list-none">
          <Link
            href={item.href}
            onClick={onItemClick}
            className="group relative block no-underline"
          >
            <motion.div
              // ホバー時に少し左に動く演出（PCの右配置に合わせる）
              whileHover={{ x: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`font-[family-name:var(--font-michroma)] text-[10px] uppercase transition-colors duration-500 ${
                isActive
                  ? "font-bold tracking-[0.4em] text-[#2a2723]"
                  : "tracking-[0.3em] text-zinc-400 group-hover:tracking-[0.4em] group-hover:text-[#2a2723]"
              } `}
            >
              {item.name}

              {/* 現在地のインジケーター：ドットをzinc-800で表現 */}
              {isActive && (
                <motion.span
                  layoutId="activeDot"
                  className="ml-4 inline-block h-1 w-1 rounded-full bg-zinc-800 align-middle"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        </li>
      );
    })}
  </ul>
);
