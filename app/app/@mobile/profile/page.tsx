"use client";
import React, { useState, useEffect } from "react";
import { Settings, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// CircularProgressBar component
const CircularProgressBar: React.FC<{ percentage: number }> = ({
  percentage,
}) => {
  const [progress, setProgress] = useState(0);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative h-16 w-16 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#FF5A5F"
          strokeWidth="4"
          fill="transparent"
          strokeOpacity="0.3"
        />
        <motion.circle
          cx="25"
          cy="25"
          r={radius}
          stroke="white"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fill="white"
          fontSize="12px"
          fontWeight="700"
        >
          {`${Math.round(progress)}%`}
        </text>
      </svg>
    </div>
  );
};

// Interest component
const Interest: React.FC<{ text: string; emoji: string }> = ({
  text,
  emoji,
}) => {
  return (
    <div className="flex items-center border border-[#E0E0E0] rounded-full py-2 px-5 space-x-2">
      <span>{emoji}</span>
      <span className="text-sm font-medium text-[#424242]">{text}</span>
    </div>
  );
};

// Carousel component
const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg">
      <div className="absolute inset-0">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Profile image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [showProfileCard, setShowProfileCard] = useState(true);

  // Sample data
  const profileImages = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  ];

  const interests = [
    { text: "Traveling", emoji: "✈️" },
    { text: "Photography", emoji: "📸" },
    { text: "Cooking", emoji: "🍳" },
    { text: "Reading", emoji: "📚" },
    { text: "Hiking", emoji: "🥾" },
  ];

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#212121]">Profile</h1>
        <button onClick={() => router.push("/home/settings")}>
          <Settings className="h-6 w-6 text-[#212121]" />
        </button>
      </div>

      {/* Profile Completion Card */}
      {showProfileCard && (
        <div className="bg-[#DD101E] rounded-lg p-4 mb-6 relative">
          <button
            className="absolute top-3 right-3 text-white"
            onClick={() => setShowProfileCard(false)}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-5">
            <CircularProgressBar percentage={15} />
            <div>
              <h3 className="text-white font-bold text-xl mb-1">
                Complete your profile
              </h3>
              <p className="text-white/90 text-xs font-normal">
                Complete your profile to experience the best dating experience
                and better matches!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Images Carousel */}
      <div className="mb-6">
        <ImageCarousel images={profileImages} />
      </div>

      {/* Profile Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#212121] mb-2">
          Precious (25)
        </h2>
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-[#424242]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              fill="currentColor"
            />
            <path
              d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-lg font-normal text-[#424242]">Man</span>
        </div>
      </div>

      {/* Interests */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#212121] mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <Interest key={index} text={interest.text} emoji={interest.emoji} />
          ))}
        </div>
      </div>

      {/* Relationship Goals */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#212121] mb-3">
          Relationship Goals
        </h3>
        <div className="flex flex-wrap gap-2">
          <div className="border border-[#E0E0E0] rounded-full py-2 px-5">
            <span className="text-sm font-medium text-[#424242]">
              Marriage 💍
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
