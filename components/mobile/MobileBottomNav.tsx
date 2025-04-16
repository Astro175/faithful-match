// components/ui/mobile-bottom-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, MessageSquare, User } from "lucide-react";

const navItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/home/matches", label: "Matches", icon: Heart },
  { path: "/chats", label: "Chats", icon: MessageSquare },
  { path: "/home/profile", label: "Profile", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2 z-10">
      {navItems.map((item) => {
        const isActive =
          pathname === item.path || pathname.startsWith(`${item.path}/`);
        const IconComponent = item.icon;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center p-2 ${
              isActive ? "text-[#DD101E]" : "text-gray-500"
            }`}
          >
            <IconComponent size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
