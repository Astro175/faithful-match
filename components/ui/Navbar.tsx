"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-16 bg-white border-b-2 border-[#F5F5F5] flex-row-reverse">
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-[#FAFAFA] rounded-lg">
          <CiSearch className="ml-4 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-[#FAFAFA] py-2 px-4 rounded-lg focus:outline-none w-full"
          />
        </div>
        
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
      </div>

      <Button 
        className="bg-primary text-white px-4 font-outfit font-semibold flex items-center gap-2"
      >
        <AiFillStar className="text-white" size={20} />
        UPGRADE
      </Button>
    </nav>
  );
}