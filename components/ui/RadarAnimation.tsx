"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const RadarAnimation = () => {
  const [rotation, setRotation] = useState(0);

  // Continuously rotate the radar beam
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[300px] h-[300px] relative">
      {/* Radar circles */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-red-500/30 left-1/2 top-1/2"
          style={{
            width: `${i * 25}%`,
            height: `${i * 25}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Center dot */}
      <motion.div
        className="absolute w-4 h-4 bg-red-500 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Radar beam */}
      <motion.div
        className="absolute w-[150px] h-1 bg-gradient-to-r from-red-500 to-transparent origin-left top-1/2 left-1/2"
        style={{
          transform: `translateY(-50%) rotate(${rotation}deg)`,
        }}
      />

      {/* Radar dots (simulating detection) */}
      {[...Array(5)].map((_, i) => {
        const angle = Math.random() * 360;
        const distance = 30 + Math.random() * 100;
        const x = Math.cos((angle * Math.PI) / 180) * distance;
        const y = Math.sin((angle * Math.PI) / 180) * distance;

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 2 + Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
