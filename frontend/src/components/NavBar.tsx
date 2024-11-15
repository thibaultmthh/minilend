"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const navItems = [
  { icon: "🏠", label: "Home", href: "/" },
  { icon: "💰", label: "Deposit", href: "/deposit" },
  { icon: "🎁", label: "Prizes", href: "/prizes" },
  { icon: "👤", label: "Profile", href: "/profile" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center space-y-1 ${
              pathname === item.href ? "text-blue-400" : "text-white/60"
            }`}
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
