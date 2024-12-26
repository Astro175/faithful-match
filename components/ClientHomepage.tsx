"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StoreButton } from "@/components/StoreButton";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { SignupModal } from "./SignUpModal";
import { LoginModal } from "./LoginModal";

export function ClientHomepage() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleOpenLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Carousel />
      <div className="relative">
        <Navbar onLogin={handleOpenLogin} />

        <div className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-32">
          <h1 className="font-outline font-bold text-4xl md:text-6xl text-white mb-6">
            Redefine Your <br /> Love Life
          </h1>
          <p className="font-outfit font-light text-lg md:text-[1.75em] text-white mb-8 max-w-2xl">
            Take control and redefine what love means to you with perfect
            matches
          </p>
          <button
            onClick={() => setIsSignupModalOpen(true)}
            className="bg-primary text-white py-4 px-12 rounded-full mb-12 hover:bg-opacity-90 transition-colors font-outline font-semibold"
          >
            Sign Up
          </button>

          <div className="flex flex-col md:flex-row gap-4">
            <StoreButton type="apple" />
            <StoreButton type="android" />
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
        onOpenSignup={handleOpenSignup}
      />

      <Footer />
    </main>
  );
}
