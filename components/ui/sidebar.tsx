"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Importing inactive icons
import { RiHome6Line } from "react-icons/ri";
import { PiStarFour } from "react-icons/pi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { RiFilterLine } from "react-icons/ri";

// Importing active icons
import { RiHome6Fill } from "react-icons/ri";
import { PiStarFourFill } from "react-icons/pi";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { BsBellFill } from "react-icons/bs";
import { RiFilterFill } from "react-icons/ri";

const menuItems = [
  {
    inactiveIcon: RiHome6Line,
    activeIcon: RiHome6Fill,
    label: "Home",
    href: "/home",
  },
  {
    inactiveIcon: PiStarFour,
    activeIcon: PiStarFourFill,
    label: "Matches",
    href: "/matches",
  },
  {
    inactiveIcon: HiOutlineChatBubbleOvalLeftEllipsis,
    activeIcon: HiChatBubbleOvalLeftEllipsis,
    label: "Chats",
    href: "/chats",
  },
  {
    inactiveIcon: IoPersonOutline,
    activeIcon: IoPerson,
    label: "Profile",
    href: "/profile",
  },
  {
    inactiveIcon: GoBell,
    activeIcon: BsBellFill,
    label: "Notifications",
    href: "/notifications",
  },
  {
    inactiveIcon: RiFilterLine,
    activeIcon: RiFilterFill,
    label: "Filter",
    href: "/home/filter",
  },
  {
    inactiveIcon: IoPersonOutline,
    activeIcon: IoPerson,
    label: "Settings",
    href: "/home/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r font-outfit">
      <div className="p-6">
        <Image
          src="/logo-red.png"
          alt="Faithful Match"
          width={120}
          height={40}
          className="mb-8"
        />
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = isActive ? item.activeIcon : item.inactiveIcon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-3 hover:bg-gray-50",
                isActive ? "text-primary bg-primary/10" : "text-[#9E9E9E]"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-primary font-bold" : "font-normal"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <Link href="/profile">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">@username</p>
              <p className="text-sm text-gray-500">Profile</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
