import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  const slideVariants = {
    enter: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-100%",
      opacity: 0,
    },
  };

  const slideTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <AnimatePresence initial={false} custom={activeSlide} mode="sync">
        <motion.div
          key={activeSlide}
          custom={activeSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[activeSlide].image}
              alt={slides[activeSlide].title}
              fill
              className="object-cover"
              priority={activeSlide === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
