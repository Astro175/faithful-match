// app/onboarding/distance/components/distance-slider.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DistanceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function DistanceSlider({ value, onChange }: DistanceSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [animatePin, setAnimatePin] = useState(false);

  const minDistance = 1;
  const maxDistance = 100;

  // Calculate percentage for positioning
  const getPositionFromValue = (val: number) => {
    return ((val - minDistance) / (maxDistance - minDistance)) * 100;
  };

  // Calculate value from position percentage
  const getValueFromPosition = (position: number) => {
    const percent = Math.min(Math.max(position, 0), 100);
    return Math.round(
      ((maxDistance - minDistance) * percent) / 100 + minDistance
    );
  };

  // Handle slider click or drag
  const updateValueFromEvent = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    const newValue = getValueFromPosition(position);

    onChange(newValue);
  };

  // Direct click on track handler
  const handleTrackClick = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if ("clientX" in e) {
      updateValueFromEvent(e.clientX);
    } else if (e.touches && e.touches[0]) {
      updateValueFromEvent(e.touches[0].clientX);
    }
    setAnimatePin(true);
    setTimeout(() => setAnimatePin(false), 500);
  };

  // Start dragging handler
  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setIsDragging(true);
    setAnimatePin(true);

    // Initial position update
    if ("clientX" in e) {
      updateValueFromEvent(e.clientX);
    } else if (e.touches && e.touches[0]) {
      updateValueFromEvent(e.touches[0].clientX);
    }
  };

  // Mouse move handler for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateValueFromEvent(e.clientX);
    }
  };

  // Touch move handler for dragging
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches && e.touches[0]) {
      updateValueFromEvent(e.touches[0].clientX);
    }
  };

  // End dragging
  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => setAnimatePin(false), 300);
  };

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  const position = getPositionFromValue(value);

  return (
    <div className="relative w-full h-20">
      {/* Slider container */}
      <div className="absolute top-6 w-full h-2">
        {/* Background track */}
        <div
          ref={sliderRef}
          className="absolute w-full h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Colored track portion */}
          <motion.div
            className="absolute h-full bg-[#DD101E] rounded-full left-0"
            animate={{ width: `${position}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Thumb handle */}
        <motion.div
          className="absolute top-1/2 w-8 h-8 -mt-4 -ml-4 bg-white rounded-full border-4 border-[#DD101E] shadow-md flex items-center justify-center cursor-grab z-10"
          animate={{
            left: `${position}%`,
            scale: animatePin ? 1.1 : 1,
            boxShadow: animatePin
              ? "0px 0px 10px rgba(221, 16, 30, 0.5)"
              : "0px 0px 5px rgba(0, 0, 0, 0.2)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          whileTap={{ cursor: "grabbing", scale: 1.2 }}
        >
          <motion.div
            className="w-2 h-2 bg-[#DD101E] rounded-full"
            animate={{
              scale: animatePin ? [1, 1.5, 1] : 1,
            }}
            transition={{ repeat: animatePin ? Infinity : 0, duration: 1 }}
          />
        </motion.div>
      </div>

      {/* Distance markers */}
      <div className="absolute w-full flex justify-between pt-10 text-xs text-gray-500">
        <span>{minDistance} km</span>
        <span>{maxDistance} km</span>
      </div>
    </div>
  );
}
