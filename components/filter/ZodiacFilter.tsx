"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", 
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export function ZodiacFilter({ selected }: {
  selected: string[];
  onSelect: (values: string[]) => void;
}) {
  const [tempSelected, setTempSelected] = useState<string[]>(selected);

  return (
    <div className="grid grid-cols-2 gap-4">
      {zodiacSigns.map((sign) => (
        <Button
          key={sign}
          variant="outline"
          className={`w-full ${
            tempSelected.includes(sign)
              ? "bg-primary text-white"
              : "border-[#E0E0E0]"
          }`}
          onClick={() => {
            setTempSelected(prev => 
              prev.includes(sign)
                ? prev.filter(s => s !== sign)
                : [...prev, sign]
            );
          }}
        >
          {sign}
        </Button>
      ))}
    </div>
  );
}