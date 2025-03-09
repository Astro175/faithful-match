"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { MatchProfileCarousel } from "./match-profile-carousel";
import { MatchActionButtons } from "./match-actions-buttons";
import { useMatchStore, type Match } from "@/store/match-store";

export function TinderCardDeck() {
  // Get state and actions from store
  const {
    matches,
    currentIndex,
    setCurrentIndex,
    likeMatch,
    dislikeMatch,
    markAsHot,
    refreshMatches,
  } = useMatchStore();

  // Local state for animations and UI
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [reactions, setReactions] = useState({
    like: false,
    dislike: false,
    hot: false,
  });

  // Handle edge cases
  if (matches.length === 0) {
    return (
      <div className="h-[700px] w-full flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">No matches found</h3>
          <p className="mb-6">
            Try adjusting your preferences or check back later
          </p>
          <button
            onClick={refreshMatches}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Calculate adjacent cards for the card deck effect
  const getAdjacentCards = () => {
    const totalCards = matches.length;
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    const nextIndex = (currentIndex + 1) % totalCards;
    return [prevIndex, nextIndex];
  };

  const [prevIndex, nextIndex] = getAdjacentCards();
  const currentMatch = matches[currentIndex];

  // Navigation handlers
  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((currentIndex + 1) % matches.length);
    resetReactions();
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((currentIndex - 1 + matches.length) % matches.length);
    resetReactions();
  };

  // Reaction handlers
  const handleLike = () => {
    setReactions({ like: true, dislike: false, hot: false });
    likeMatch(currentMatch.id);

    // Auto advance after reaction (optional)
    setTimeout(handleNext, 800);
  };

  const handleDislike = () => {
    setReactions({ like: false, dislike: true, hot: false });
    dislikeMatch(currentMatch.id);

    // Auto advance after reaction (optional)
    setTimeout(handleNext, 800);
  };

  const handleHot = () => {
    setReactions({ like: false, dislike: false, hot: true });
    markAsHot(currentMatch.id);

    // Auto advance after reaction (optional)
    setTimeout(handleNext, 800);
  };

  const resetReactions = () => {
    setReactions({ like: false, dislike: false, hot: false });
  };

  // Apply reactions from store when currentIndex changes
  useEffect(() => {
    const match = matches[currentIndex];
    if (match) {
      setReactions({
        like: !!match.liked,
        dislike: !!match.disliked,
        hot: !!match.hot,
      });
    }
  }, [currentIndex, matches]);

  return (
    <div className="relative flex justify-center items-center h-[700px] w-full">
      <div className="flex items-center justify-center -space-x-[100px] mb-20">
        {/* Previous Card (Blurred, Left) */}
        <motion.div
          key={`prev-${matches[prevIndex].id}`}
          initial={{
            scale: 0.8,
            opacity: 0.8,
            x: direction === "left" ? -80 : -50,
          }}
          animate={{ scale: 0.8, opacity: 0.8, x: 0 }}
          exit={{ scale: 0.8, opacity: 0.8, x: -50 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8,
          }}
          className="z-10 pointer-events-none"
        >
          <div className="w-[350px] h-[525px] rounded-3xl overflow-hidden relative filter blur-sm">
            <Image
              src={matches[prevIndex].profileImg}
              alt={matches[prevIndex].name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-4xl font-bold drop-shadow-md font-outfit">
                {matches[prevIndex].name}
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Current Card (Clear, Center) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={matches[currentIndex].id}
            initial={{
              scale: direction === "right" ? 0.8 : 1,
              opacity: direction === "right" ? 0 : 1,
              x: direction === "right" ? 80 : direction === "left" ? -80 : 0,
            }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{
              scale: 0.8,
              opacity: 0,
              x: direction === "right" ? -80 : 80,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.8,
            }}
            className="z-20"
          >
            <div className="relative w-[400px] h-[600px] rounded-3xl overflow-hidden shadow-lg">
              <MatchProfileCarousel
                images={currentMatch.images}
                name={currentMatch.name}
              />

              {/* Reaction Labels */}
              {reactions.like && (
                <div
                  className="absolute top-[40%] right-[20px] border-3 border-[#DD101E] px-2 py-1 rounded-lg flex items-center gap-1 text-[#F75555] text-3xl font-outfit font-bold"
                  style={{ borderWidth: "3px" }}
                >
                  <AiOutlineLike color="#DD101E" size={30} />
                  LIKE!
                </div>
              )}

              {reactions.dislike && (
                <div
                  className="absolute bottom-[40%] right-[20px] border-3 border-[#DD101E] px-2 py-1 rounded-lg flex items-center gap-1 text-[#F75555] text-3xl font-outfit font-bold"
                  style={{ borderWidth: "3px" }}
                >
                  <BiDislike color="#DD101E" size={30} />
                  NOPE!
                </div>
              )}

              {reactions.hot && (
                <div
                  className="absolute top-[40%] right-[20px] border-3 border-[#F78532] px-2 py-1 rounded-lg flex items-center gap-1 font-outfit font-bold text-3xl text-[#F78532]"
                  style={{ borderWidth: "3px" }}
                >
                  <BsFire color="#F78532" size={30} />
                  HOT!
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-2 text-white">
                  <h2 className="text-4xl font-bold font-outfit">
                    {currentMatch.name}
                  </h2>
                  <span className="text-2xl">{currentMatch.age}</span>
                </div>
                <p className="text-white/80">
                  {currentMatch.distance}{" "}
                  {currentMatch.distance === 1 ? "mile" : "miles"} away
                </p>
                <div className="flex gap-2 mt-2">
                  {currentMatch.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-white/20 text-white rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Card (Blurred, Right) */}
        <motion.div
          key={`next-${matches[nextIndex].id}`}
          initial={{
            scale: 0.8,
            opacity: 0.8,
            x: direction === "right" ? 80 : 50,
          }}
          animate={{ scale: 0.8, opacity: 0.8, x: 0 }}
          exit={{ scale: 0.8, opacity: 0.8, x: 50 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8,
          }}
          className="z-10 pointer-events-none"
        >
          <div className="w-[350px] h-[525px] rounded-3xl overflow-hidden relative filter blur-sm">
            <Image
              src={matches[nextIndex].profileImg}
              alt={matches[nextIndex].name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-4xl font-bold drop-shadow-md font-outfit">
                {matches[nextIndex].name}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <MatchActionButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        onRefresh={refreshMatches}
        onLike={handleLike}
        onDislike={handleDislike}
        onHot={handleHot}
        reactions={reactions}
      />
    </div>
  );
}
