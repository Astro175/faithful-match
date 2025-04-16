"use client";

import React from "react";
import Image from "next/image";
import { BsFire } from "react-icons/bs";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import Heart from "@/public/reactions/heart.svg";
import Dislike from "@/public/reactions/dislike.svg";
import Refresh from "@/public/reactions/refresh.svg";

interface MatchActionButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onRefresh: () => void;
  onLike: () => void;
  onDislike: () => void;
  onHot: () => void;
}

export const MatchActionButtons: React.FC<MatchActionButtonsProps> = ({
  onPrevious,
  onNext,
  onRefresh,
  onLike,
  onDislike,
  onHot,
}) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Navigation Buttons */}
      <button
        onClick={onPrevious}
        className="w-12 h-12 rounded-full border-2 border-[#9E9E9E] flex items-center justify-center transition-transform hover:scale-110"
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>

      {/* Reaction Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onRefresh}
          className="w-12 h-12 rounded-full bg-white border border-[#4AAF57] flex items-center justify-center transition-transform hover:scale-110"
        >
          <Image src={Refresh} alt="Refresh" width={24} height={24} />
        </button>
        <button
          onClick={onDislike}
          className="w-12 h-12 rounded-full bg-white border border-[#F75555] flex items-center justify-center transition-transform hover:scale-110"
        >
          <Image src={Dislike} alt="Dislike" width={24} height={24} />
        </button>
        <button
          onClick={onHot}
          className="w-12 h-12 rounded-full bg-white border border-[#FF981F] flex items-center justify-center transition-transform hover:scale-110"
        >
          <BsFire color="#FF981F" size={24} />
        </button>
        <button
          onClick={onLike}
          className="w-12 h-12 rounded-full bg-white border border-[#DD101E] flex items-center justify-center transition-transform hover:scale-110"
        >
          <Image src={Heart} alt="Like" width={24} height={24} />
        </button>
      </div>

      <button
        onClick={onNext}
        className="w-12 h-12 rounded-full border-2 border-[#9E9E9E] flex items-center justify-center transition-transform hover:scale-110"
      >
        <HiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
