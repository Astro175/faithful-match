"use client";

import { Button } from "../ui/button";
import { useState } from "react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function BloodGroupFilter({ selected, onSelect }: {
  selected: string[];
  onSelect: (values: string[]) => void;
}) {
  const [tempSelected, setTempSelected] = useState<string[]>(selected);

  return (
    <div className="grid grid-cols-2 gap-4">
      {bloodGroups.map((group) => (
        <Button
          key={group}
          variant="outline"
          className={`w-full ${
            tempSelected.includes(group)
              ? "bg-primary text-white"
              : "border-[#E0E0E0]"
          }`}
          onClick={() => {
            setTempSelected(prev => 
              prev.includes(group)
                ? prev.filter(g => g !== group)
                : [...prev, group]
            );
          }}
        >
          {group}
        </Button>
      ))}
      <div className="col-span-2 flex gap-4 mt-4">
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