"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import Fire from '@/public/reactions/fire.svg';
import Heart from '@/public/reactions/heart.svg';
import HeartWhite from '@/public/reactions/heart-white.svg';
import Dislike from '@/public/reactions/dislike.svg';
import DislikeWhite from '@/public/reactions/dislike-white.svg';
import Refresh from '@/public/reactions/refresh.svg';

interface MatchCardProps {
  name: string;
  age: number;
  distance: string;
  images: string[];
  isOnline?: boolean;
}

const matchCards: MatchCardProps[] = [
  {
    name: "Lizzy",
    age: 23,
    distance: "4 miles away",
    images: ["/lizzy.png"],
    isOnline: true
  },
  {
    name: "Emma",
    age: 25,
    distance: "6 miles away",
    images: ["/emma.png"],
    isOnline: false
  },
  {
    name: "Sophie",
    age: 22,
    distance: "2 miles away",
    images: ["/sophie.png"],
    isOnline: true
  }
];

export function MatchCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reactions, setReactions] = useState({
    like: false,
    dislike: false,
    hot: false
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === matchCards.length - 1 ? 0 : prevIndex + 1
    );
    // Reset reactions when moving to next card
    setReactions({ like: false, dislike: false, hot: false });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? matchCards.length - 1 : prevIndex - 1
    );
    // Reset reactions when moving to previous card
    setReactions({ like: false, dislike: false, hot: false });
  };

  const handleReaction = (type: 'like' | 'dislike' | 'hot') => {
    setReactions(prev => ({
      like: type === 'like' ? true : false,
      dislike: type === 'dislike' ? true : false,
      hot: type === 'hot' ? true : false
    }));
  };

  const getAdjacentCards = () => {
    const totalCards = matchCards.length;
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    const nextIndex = (currentIndex + 1) % totalCards;
    return [prevIndex, nextIndex];
  };

  const [prevIndex, nextIndex] = getAdjacentCards();

  return (
    <div className="relative flex justify-center items-center h-[700px] w-full">
      <div className="flex items-center justify-center -space-x-[100px] mb-20">
        {/* Previous Card (Slightly Blurred, Left) */}
        <motion.div 
          key={`prev-${matchCards[prevIndex].name}`}
          initial={{ scale: 0.8, opacity: 0.8, x: -50 }}
          animate={{ scale: 0.8, opacity: 0.8, x: 0 }}
          exit={{ scale: 0.8, opacity: 0.8, x: -50 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            duration: 1 
          }}
          className="z-10 pointer-events-none"
        >
          <div className="w-[350px] h-[525px] rounded-3xl overflow-hidden relative filter blur-sm">
            <Image
              src={matchCards[prevIndex].images[0]}
              alt={matchCards[prevIndex].name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-4xl font-bold drop-shadow-md font-outfit">
                {matchCards[prevIndex].name}
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Current Card (Clear, Center) */}
        <motion.div 
        key={matchCards[currentIndex].name}
        initial={{ scale: 1, x: 0 }}
        animate={{ scale: 1, x: 0 }}
        exit={{ scale: 0.8, x: 50 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          duration: 1 
        }}
        className="z-20"
      >
        <div className="relative w-[400px] h-[600px] rounded-3xl overflow-hidden shadow-lg">
          <div className="relative w-full h-full">
            <Image
              src={matchCards[currentIndex].images[0]}
              alt={matchCards[currentIndex].name}
              fill
              className="object-cover"
            />
            
            {/* Reaction Labels */}
            {reactions.like && (
              <div 
                className="absolute top-[40%] right-[20px] border-3 border-[#DD101E] px-2 py-1 rounded-lg flex items-center gap-1 text-[#F75555] text-3xl font-outfit font-bold"
                style={{ borderWidth: '3px' }}
              >
                <AiOutlineLike color="#DD101E" size={30}/>
                LIKE!
              </div>
            )}

            {reactions.dislike && (
              <div 
                className="absolute bottom-[40%] right-[20px] border-3 border-[#DD101E] px-2 py-1 rounded-lg flex items-center gap-1 text-[#F75555] text-3xl font-outfit font-bold"
                style={{ borderWidth: '3px' }}
              >
                <BiDislike color="#DD101E" size={30}/>
                NOPE!
              </div>
            )}

            {reactions.hot && (
              <div 
                className="absolute top-[40%] right-[20px] border-3 border-[#F78532] px-2 py-1 rounded-lg flex items-center gap-1 font-outfit font-bold text-3xl text-[#F78532]"
                style={{ borderWidth: '3px' }}
              >
                <BsFire color="#F78532" size={30} />
                HOT!
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex items-center gap-2 text-white">
                <h2 className="text-4xl font-bold font-outfit">
                  {matchCards[currentIndex].name} ({matchCards[currentIndex].age})
                </h2>
                {matchCards[currentIndex].isOnline && (
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </div>
              <p className="text-white/80">{matchCards[currentIndex].distance}</p>
            </div>
          </div>
        </div>
      </motion.div>

        {/* Next Card (Slightly Blurred, Right) */}
        <motion.div 
          key={`next-${matchCards[nextIndex].name}`}
          initial={{ scale: 0.8, opacity: 0.8, x: 50 }}
          animate={{ scale: 0.8, opacity: 0.8, x: 0 }}
          exit={{ scale: 0.8, opacity: 0.8, x: 50 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            duration: 1 
          }}
          className="z-10 pointer-events-none"
        >
          <div className="w-[350px] h-[525px] rounded-3xl overflow-hidden relative filter blur-sm">
            <Image
              src={matchCards[nextIndex].images[0]}
              alt={matchCards[nextIndex].name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white ">
              <h3 className="text-4xl font-bold drop-shadow-md font-outfit">
                {matchCards[nextIndex].name}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-12 flex gap-4">
        <button 
          onClick={handlePrevious}
          className="w-12 h-12 rounded-full border-2 border-[#9E9E9E] flex items-center justify-center"
        >
          <HiChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border-2 border-[#9E9E9E] flex items-center justify-center"
        >
          <HiChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute bottom-0 flex gap-4">
        <button className="w-12 h-12 rounded-full bg-white border border-[#4AAF57] flex items-center justify-center">
          <Image src={Refresh} alt="Refresh" width={24} height={24} />
        </button>
        <button 
          onClick={() => handleReaction('dislike')}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            reactions.dislike ? 'bg-[#F75555]' : 'bg-white border border-[#F75555]'
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
          onClick={() => handleReaction('hot')}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            reactions.hot ? 'bg-[#F75555]' : 'bg-white border border-[#FF981F]'
          }`}
        >
          <BsFire color={reactions.hot ? 'white' : '#FF981F'}size={30}/>
        </button>
        <button 
          onClick={() => handleReaction('like')}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            reactions.like ? 'bg-[#F75555]' : 'bg-white border border-[#DD101E]'
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
    </div>
  );
}