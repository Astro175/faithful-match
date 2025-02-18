"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DesktopNavbar } from "./DesktopNavbar";
import { StoreButton } from "@/components/StoreButton";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { SignupModal } from "../SignUpModal";
import { LoginModal } from "../LoginModal";

export function DesktopHomepage() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Discover Your Soulmate",
      subtitle:
        "Connect with people who are meant just for you, your soulmate awaits.",
      image: "/landing_image_one.png",
    },
    {
      title: "Love is One Swipe Away",
      subtitle: "Your next great romance is just a swipe away.",
      image: "/landing_image_two.png",
    },
    {
      title: "Redefine Your Love Life",
      subtitle:
        "Take control and redefine what love means to you with perfect matches.",
      image: "/landing_image_three.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleContinue = () => {
    setIsSignupModalOpen(true);
  };

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Carousel
        slides={slides}
        activeSlide={activeSlide}
        onSlideChange={setActiveSlide}
      />

      <div className="relative h-full">
        <DesktopNavbar onLogin={handleOpenLogin} />

        <div className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-32">
          <h1 className="font-outline font-bold text-4xl md:text-6xl text-white mb-6 mt-32 max-w-[450px]">
            {slides[activeSlide].title}
          </h1>

          <p className="font-outfit font-light text-lg md:text-[1.75em] text-white mb-8 max-w-[450px]">
            {slides[activeSlide].subtitle}
          </p>

          <button
            onClick={handleContinue}
            className="bg-primary text-white py-4 px-12 rounded-full mb-12 hover:bg-opacity-90 transition-colors font-outline font-semibold"
          >
            Sign Up
          </button>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <StoreButton type="apple" />
            <StoreButton type="android" />
          </div>

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

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
        onOpenLogin={handleOpenLogin}
      />

      <Footer className="block" />
    </main>
  );
}
