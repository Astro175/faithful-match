"use client";

import React from "react";
import Image from "next/image";
import { IoMdMail } from "react-icons/io";
import { Footer } from "@/components/Footer";

const SupportPage = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:faithfulmatch@gmail.com";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="p-[3em] flex justify-center">
        <Image
          src="/logo-red.png"
          alt="Faithful Match Logo"
          width={140}
          height={130}
          priority
        />
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-[5em] max-w-[680px]">
        <h1 className="text-foreground text-2xl mb-4 font-bold">Support</h1>

        <p className="text-foreground text-lg font-outfit mb-8">
          Kindly reach us via our Email and we will respond to your message
          within 72hrs.
        </p>

        <button
          onClick={handleEmailClick}
          className="w-full border border-[#EEEEEE] rounded-[8px] p-6 flex items-center gap-[18px] hover:bg-gray-50 transition-colors"
        >
          <IoMdMail className="w-[20px] h-[20px] text-[#DD101E]" />
          <span className="text-foreground font-[700] font-outfit text-lg">
            faithfulmatch@gmail.com
          </span>
        </button>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SupportPage;
