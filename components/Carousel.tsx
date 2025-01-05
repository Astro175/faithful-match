"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// import { useMediaQuery } from "@/hooks/useMediaQuery";

interface CarouselProps {
  slides: Array<{
    title: string;
    subtitle: string;
    image: string;
  }>;
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

export const Carousel = ({ slides, activeSlide }: CarouselProps) => {
  return (
    <div className="absolute inset-0 -z-10">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            fill
            className="object-cover"
            priority={activeSlide === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
