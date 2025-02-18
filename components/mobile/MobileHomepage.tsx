"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MobileNavbar } from "./MobileNavbar";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

export function MobileHomepage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const slides = [
    {
      title: "Discover Your Soulmate",
      subtitle:
        "Connect with people who are meant just for you, your soulmate awaits.",
      image: "/onboarding_image_mobile_one.png",
    },
    {
      title: "Love is One Swipe Away",
      subtitle: "Your next great romance is just a swipe away.",
      image: "/onboarding_image_mobile_two.png",
    },
    {
      title: "Redefine Your Love Life",
      subtitle:
        "Take control and redefine what love means to you with perfect matches.",
      image: "/onboarding_image_mobile_three.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleContinue = () => {
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Carousel
        slides={slides}
        activeSlide={activeSlide}
        onSlideChange={setActiveSlide}
      />

      <div className="relative h-full">
        <MobileNavbar
          onLogin={handleLogin}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <div className="fixed bottom-8 left-4 right-4 z-10">
          <motion.h1
            key={slides[activeSlide].title}
            className="font-outline font-bold text-[45px] leading-tight text-white mb-2 max-w-[290px] text-center"
          >
            {slides[activeSlide].title}
          </motion.h1>

          <motion.p
            key={`subtitle-${activeSlide}`}
            className="font-outfit font-normal text-base text-white mb-6 max-w-[]"
          >
            {slides[activeSlide].subtitle}
          </motion.p>

          <div className="flex justify-between items-center">
            <button
              onClick={handleContinue}
              className="bg-primary text-white py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors font-outline font-semibold text-lg"
            >
              Continue
            </button>

            <div className="flex gap-2">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    index === activeSlide ? "bg-primary" : "bg-white"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer className="hidden" />
    </main>
  );
}
