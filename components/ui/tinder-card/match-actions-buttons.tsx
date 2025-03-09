"use client";

import React from "react";
import Image from "next/image";
import { BsFire } from "react-icons/bs";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import Heart from "@/public/reactions/heart.svg";
import HeartWhite from "@/public/reactions/heart-white.svg";
import Dislike from "@/public/reactions/dislike.svg";
import DislikeWhite from "@/public/reactions/dislike-white.svg";
import Refresh from "@/public/reactions/refresh.svg";

interface MatchActionButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onRefresh: () => void;
  onLike: () => void;
  onDislike: () => void;
  onHot: () => void;
  reactions: {
    like: boolean;
    dislike: boolean;
    hot: boolean;
  };
}

export const MatchActionButtons: React.FC<MatchActionButtonsProps> = ({
  onPrevious,
  onNext,
  onRefresh,
  onLike,
  onDislike,
  onHot,
  reactions,
}) => {
  return (
    <>
      {/* Navigation Buttons */}
      <div className="absolute bottom-12 flex gap-4">
        <button
          onClick={onPrevious}
          className="w-12 h-12 rounded-full border-2 border-[#9E9E9E] flex items-center justify-center transition-transform hover:scale-110"
        >
          <HiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          className="w-12 h-12 rounded-full border-2 border-[#9E9E9E] flex items-center justify-center transition-transform hover:scale-110"
        >
          <HiChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Reaction Buttons */}
      <div className="absolute bottom-0 flex gap-4">
        <button
          onClick={onRefresh}
          className="w-12 h-12 rounded-full bg-white border border-[#4AAF57] flex items-center justify-center transition-transform hover:scale-110"
        >
          <Image src={Refresh} alt="Refresh" width={24} height={24} />
        </button>
        <button
          onClick={onDislike}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
            reactions.dislike
              ? "bg-[#F75555]"
              : "bg-white border border-[#F75555]"
          }`}
        >
          <Image
            src={reactions.dislike ? DislikeWhite : Dislike}
            alt="Dislike"
            width={24}
            height={24}
          />
        </button>
        <button
          onClick={onHot}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
            reactions.hot ? "bg-[#F75555]" : "bg-white border border-[#FF981F]"
          }`}
        >
          <BsFire color={reactions.hot ? "white" : "#FF981F"} size={24} />
        </button>
        <button
          onClick={onLike}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
            reactions.like ? "bg-[#F75555]" : "bg-white border border-[#DD101E]"
          }`}
        >
          <Image
            src={reactions.like ? HeartWhite : Heart}
            alt="Like"
            width={24}
            height={24}
          />
        </button>
      </div>
    </>
  );
};