"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  indicatePercentage?: boolean;
}

export function Progress({
  value,
  className,
  indicatePercentage = false,
}: ProgressProps) {
  return (
    <div className={cn("w-full relative", className)}>
      <div className="h-[12px] bg-gray-200 rounded-full overflow-hidden w-5/6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          className="h-full bg-primary rounded-full"
        />
      </div>

      {indicatePercentage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 text-xs text-gray-500 mt-1"
        >
          {value}% Complete
        </motion.div>
      )}
    </div>
  );
}
