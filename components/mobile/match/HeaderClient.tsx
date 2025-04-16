"use client";

import { useState } from "react";
import { GoBell } from "react-icons/go";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function NotificationButtonClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200">
          <GoBell size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <div className="py-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            {/* Placeholder for notifications */}
            <p className="text-gray-500">No new notifications</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function FilterButtonClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState(50);
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [showMe, setShowMe] = useState("females");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [hasBio, setHasBio] = useState(false);

  const interests = [
    { text: "Traveling", emoji: "✈️" },
    { text: "Photography", emoji: "📸" },
    { text: "Cooking", emoji: "🍳" },
    { text: "Reading", emoji: "📚" },
    { text: "Hiking", emoji: "🥾" },
    { text: "Movies", emoji: "🎬" },
    { text: "Music", emoji: "🎵" },
    { text: "Sports", emoji: "⚽" },
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAgeRangeChange = (newValues: number[]) => {
    setAgeRange(newValues);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200">
          <SlidersHorizontal size={20} />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="py-6 px-4 max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">Filters</h2>

          {/* Distance Range */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Distance</label>
              <span className="text-sm">{distance} miles</span>
            </div>
            <div className="px-1">
              <style jsx global>{`
                .distance-slider [role="slider"] {
                  background-color: #dd101e;
                  border-color: #dd101e;
                }
                .distance-slider [data-orientation="horizontal"] {
                  height: 6px;
                }
                .distance-slider
                  [data-orientation="horizontal"]
                  > span:first-child {
                  background: linear-gradient(
                    to right,
                    #dd101e 0%,
                    #dd101e ${distance}%,
                    #e5e7eb ${distance}%,
                    #e5e7eb 100%
                  );
                }
              `}</style>
              <Slider
                className="distance-slider"
                defaultValue={[distance]}
                max={100}
                step={1}
                onValueChange={(values) => setDistance(values[0])}
              />
            </div>
          </div>

          {/* Age Range Slider - Tinder Style */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Age Range</label>
              <span className="text-sm">
                {ageRange[0]} - {ageRange[1]}
              </span>
            </div>
            <div className="px-1">
              <style jsx global>{`
                .age-slider [role="slider"] {
                  background-color: #dd101e;
                  border-color: #dd101e;
                  width: 16px;
                  height: 16px;
                }
                .age-slider [data-orientation="horizontal"] {
                  height: 6px;
                }
                .age-slider [data-orientation="horizontal"] > span:first-child {
                  background: linear-gradient(
                    to right,
                    #e5e7eb 0%,
                    #e5e7eb ${((ageRange[0] - 18) / (50 - 18)) * 100}%,
                    #dd101e ${((ageRange[0] - 18) / (50 - 18)) * 100}%,
                    #dd101e ${((ageRange[1] - 18) / (50 - 18)) * 100}%,
                    #e5e7eb ${((ageRange[1] - 18) / (50 - 18)) * 100}%,
                    #e5e7eb 100%
                  );
                }
              `}</style>
              <Slider
                className="age-slider"
                defaultValue={ageRange}
                min={18}
                max={50}
                step={1}
                onValueChange={handleAgeRangeChange}
              />
            </div>
          </div>

          {/* Show Me Section */}
          <div className="space-y-4 mb-8">
            <label className="text-sm font-medium">Show Me</label>
            <RadioGroup
              value={showMe}
              onValueChange={setShowMe}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="males"
                  id="males"
                  className="text-[#DD101E] border-gray-300 focus:ring-[#DD101E]"
                />
                <Label htmlFor="males">Males</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="females"
                  id="females"
                  className="text-[#DD101E] border-gray-300 focus:ring-[#DD101E]"
                />
                <Label htmlFor="females">Females</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="others"
                  id="others"
                  className="text-[#DD101E] border-gray-300 focus:ring-[#DD101E]"
                />
                <Label htmlFor="others">Others</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Interests */}
          <div className="space-y-4 mb-8">
            <label className="text-sm font-medium">Interests</label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest.text}
                  onClick={() => toggleInterest(interest.text)}
                  className={`flex items-center border rounded-full py-2 px-5 transition-colors ${
                    selectedInterests.includes(interest.text)
                      ? "bg-[#DD101E] text-white border-[#DD101E]"
                      : "border-[#E0E0E0] text-[#424242]"
                  }`}
                >
                  <span className="mr-2">{interest.emoji}</span>
                  <span className="text-sm font-medium">{interest.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Has Bio */}
          <div className="flex items-center space-x-2 mb-8">
            <Checkbox
              id="hasBio"
              checked={hasBio}
              onCheckedChange={(checked) => setHasBio(checked as boolean)}
              className="data-[state=checked]:bg-[#DD101E] data-[state=checked]:border-[#DD101E]"
            />
            <label
              htmlFor="hasBio"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Has a Bio
            </label>
          </div>

          {/* Apply Button */}
          <button className="w-full bg-[#DD101E] text-white py-3 rounded-lg font-medium hover:bg-[#c80d19] transition-colors">
            Apply Filters
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
