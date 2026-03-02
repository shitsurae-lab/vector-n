// components/header/nav-links.tsx
"use client";

import Link from "next/link";

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
      const isActive = pathname === item.href;
      return (
        <li key={item.name}>
          <Link
            href={item.href}
            onClick={onItemClick}
            className={`font-michroma text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.3em] ${isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-60"} `}
          >
            {item.name}
            {isActive && (
              <span className="bg-primary ml-2 inline-block h-1 w-1 rounded-full" />
            )}
          </Link>
        </li>
      );
    })}
  </ul>
);
