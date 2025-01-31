// EducationFilter.tsx
"use client";

import { Button } from "../ui/button";
import { useState } from "react";

const educationLevels = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Associate Degree",
  "Professional Certification",
  "Some College",
  "Other"
];

export function EducationFilter({ selected, onSelect }: {
  selected: string[];
  onSelect: (values: string[]) => void;
}) {
  const [tempSelected, setTempSelected] = useState<string[]>(selected);

  return (
    <div className="grid gap-4">
      {educationLevels.map((level) => (
        <Button
          key={level}
          variant="outline"
          className={`w-full text-left justify-start ${
            tempSelected.includes(level)
              ? "bg-primary text-white"
              : "border-[#E0E0E0]"
          }`}
          onClick={() => {
            setTempSelected(prev => 
              prev.includes(level)
                ? prev.filter(l => l !== level)
                : [...prev, level]
            );
          }}
        >
          {level}
        </Button>
      ))}
      <div className="flex gap-4 mt-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setTempSelected([])}
        >
          Clear
        </Button>
        <Button
          className="w-full bg-primary text-white"
          onClick={() => onSelect(tempSelected)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}