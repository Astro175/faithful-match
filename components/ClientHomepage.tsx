"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { StoreButton } from "@/components/StoreButton";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { SignupModal } from "./SignUpModal";
import { LoginModal } from "./LoginModal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";

export function ClientHomepage() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const slides = [
    {
      title: "Discover Your Soulmate",
      subtitle:
        "Connect with people who are meant just for you, your soulmate awaits.",
      image: isMobile
        ? "/onboarding_image_mobile_one.png"
        : "/landing_image_one.png",
    },
    {
      title: "Love is One Swipe Away",
      subtitle: "Your next great romance is just a swipe away.",
      image: isMobile
        ? "/onboarding_image_mobile_two.png"
        : "/landing_image_two.png",
    },
    {
      title: "Redefine Your Love Life",
      subtitle:
        "Take control and redefine what love means to you with perfect matches.",
      image: isMobile
        ? "/onboarding_image_mobile_three.png"
        : "/landing_image_three.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleContinue = () => {
    if (isMobile) {
      router.push("/login");
    } else {
      setIsSignupModalOpen(true);
    }
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
        <Navbar
          onLogin={() => setIsLoginModalOpen(true)}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        {isMobile ? (
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
        ) : (
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
        )}
      </div>

      {!isMobile && (
        <>
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
        </>
      )}

      <Footer className={isMobile ? "hidden" : "block"} />
    </main>
  );
}
