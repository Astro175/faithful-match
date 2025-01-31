"use client";

import { useState } from "react";
import InterestsModal from "@/components/InterestsModal";
import RelationshipGoalsModal from "@/components/RelationshipGoalsModal";
import { ZodiacFilter } from "@/components/filter/ZodiacFilter";
import { BloodGroupFilter } from "@/components/filter/BloodGroupFilter";
import { EducationFilter } from "@/components/filter/EducationFilter";

import { Button } from "@/components/ui/button";

import { IoIosArrowForward } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function FilterScreen() {
  const [distance, setDistance] = useState(50);
  const [ageRange, setAgeRange] = useState([20, 30]);
  const [minPhotos, setMinPhotos] = useState(1);
  const [showMe, setShowMe] = useState("Everyone");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [hasBio, setHasBio] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const relationshipGoals = [
    "Dating 👩‍❤️‍👨",
    "Friendship 🙌",
    "Casual 😄",
    "Serious Relationship 💍",
    "Open to Options 🌟",
    "Networking 🤝",
    "Exploration 🌍",
  ];

  const basicsItems = [
    { key: "zodiac", label: "Zodiac", icon: "/filter/zodiac.svg" },
    { key: "education", label: "Education", icon: "/filter/education.svg" },
    { key: "family", label: "Family Plans", icon: "/filter/family-plans.svg" },
    { key: "vaccine", label: "COVID Vaccine", icon: "/filter/vaccine.svg" },
    {
      key: "personality",
      label: "Personality Type",
      icon: "/filter/personality.svg",
    },
    {
      key: "communication",
      label: "Communication Style",
      icon: "/filter/communication.svg",
    },
    { key: "love", label: "Love Style", icon: "/filter/love.svg" },
    { key: "blood", label: "Blood Group", icon: "/filter/blood-group.svg" },
  ];

  const lifestyleItems = [
    { key: "pets", label: "Pets", icon: "/filter/pets.svg" },
    { key: "drinking", label: "Drinking Habits", icon: "/filter/drinking.svg" },
    { key: "smoking", label: "Smoking Habits", icon: "/filter/smoking.svg" },
    { key: "workout", label: "Workout", icon: "/filter/workout.svg" },
    { key: "diet", label: "Dietary Preferences", icon: "/filter/dietary.svg" },
    {
      key: "social",
      label: "Social Media Presence",
      icon: "/filter/social.svg",
    },
    { key: "sleeping", label: "Sleeping Habits", icon: "/filter/sleeping.svg" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-xl border border-[#EEEEEE] pt-8 px-24 pb-24">
        {/* Distance Range */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-outfit font-bold text-[20px]">
                Distance Range
              </h3>
              <span className="font-outfit">{distance} miles</span>
            </div>
            <div className="relative h-1.5 w-full bg-[#EEEEEE] rounded-full flex items-center">
              <div
                className="absolute h-full bg-[#DD101E] rounded-full"
                style={{ width: `${distance}%` }}
              />
              <div
                className="absolute w-6 h-6 bg-white rounded-full border-[3px] border-[#DD101E]"
                style={{ left: `${distance}%`, transform: "translateX(-50%)" }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
          </div>
        </div>

        {/* Age Group */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-outfit font-bold text-[20px]">Age Group</h3>
            <span className="font-outfit">
              {ageRange[0]} - {ageRange[1]}
            </span>
          </div>
          <div className="relative h-8">
            {/* Background track */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 rounded-full bg-[#EEEEEE]"
              style={{
                background: `linear-gradient(to right, 
          #EEEEEE 0%, 
          #EEEEEE ${((ageRange[0] - 18) / 82) * 100}%, 
          #DD101E ${((ageRange[0] - 18) / 82) * 100}%, 
          #DD101E ${((ageRange[1] - 18) / 82) * 100}%, 
          #EEEEEE ${((ageRange[1] - 18) / 82) * 100}%, 
          #EEEEEE 100%)`,
              }}
            />

            {/* Minimum age input */}
            <input
              type="range"
              min="18"
              max="100"
              value={ageRange[0]}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), ageRange[1]);
                setAgeRange([value, ageRange[1]]);
              }}
              className="absolute w-full h-1.5 opacity-0 z-20 cursor-pointer"
            />

            {/* Maximum age input */}
            <input
              type="range"
              min="18"
              max="100"
              value={ageRange[1]}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), ageRange[0]);
                setAgeRange([ageRange[0], value]);
              }}
              className="absolute w-full h-1.5 opacity-0 z-30 cursor-pointer"
            />

            {/* Custom Thumbs */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-[5px] border-[#DD101E] bg-white shadow-sm"
              style={{ left: `${((ageRange[0] - 18) / 82) * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-[5px] border-[#DD101E] bg-white shadow-sm"
              style={{ left: `${((ageRange[1] - 18) / 82) * 100}%` }}
            />
          </div>
        </div>

        {/* Minimum Photos */}
        <div className="mb-12">
          <h3 className="font-outfit font-bold text-[20px] mb-4">
            Minimum Number of Photos
          </h3>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => setMinPhotos(num)}
                className={`py-2 px-5 rounded-lg border font-outfit font-semibold text-[16px] ${
                  minPhotos === num
                    ? "bg-[#DD101E] text-white border-[#DD101E]"
                    : "border-[#E0E0E0] text-[#212121]"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Show Me */}
        <div className="mb-12">
          <h3 className="font-outfit font-bold text-[20px] mb-4">Show Me</h3>
          <div className="flex gap-28">
            {["Men", "Women", "Everyone"].map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="relative w-5 h-5 border-2 border-[#DD101E] rounded-full">
                  <input
                    type="radio"
                    name="showMe"
                    checked={showMe === option}
                    onChange={() => setShowMe(option)}
                    className="opacity-0 absolute"
                  />
                  {showMe === option && (
                    <div className="absolute inset-0.5 bg-[#DD101E] rounded-full" />
                  )}
                </div>
                <span className="font-outfit">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Relationship Goals */}
        <div className="mb-12">
          <h3 className="font-outfit font-bold text-[20px] mb-4">
            Relationship Goals
          </h3>
          <div className="flex flex-wrap gap-4">
            {relationshipGoals.map((goal) => (
              <button
                key={goal}
                onClick={() =>
                  setSelectedGoal(goal === selectedGoal ? "" : goal)
                }
                className={`py-2 px-5 rounded-lg border font-outfit font-semibold text-[16px] ${
                  selectedGoal === goal
                    ? "bg-[#DD101E] text-white border-[#DD101E]"
                    : "border-[#E0E0E0] text-[#212121]"
                }`}
              >
                {goal.split(" ")[0]}
              </button>
            ))}
            <button
              onClick={() => setShowGoalsModal(true)}
              className="py-2 px-5 rounded-lg border border-[#E0E0E0] font-outfit font-semibold text-[16px] text-[#212121]"
            >
              +
            </button>
          </div>
        </div>

        {/* Has Bio */}
        <div className="mb-12 flex items-center gap-2">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hasBio}
              onChange={(e) => setHasBio(e.target.checked)}
              className="opacity-0 absolute"
            />
            <div
              className={`w-5 h-5 border-2 border-[#DD101E] rounded-sm flex items-center justify-center ${
                hasBio ? "bg-[#DD101E]" : "bg-white"
              }`}
            >
              {hasBio && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </label>
          <span className="font-outfit">Has a Bio</span>
        </div>

        {/* Interests */}
        <div className="mb-12">
          <h3 className="font-outfit font-bold text-[20px] mb-4">Interests</h3>
          <div className="flex flex-wrap gap-4">
            {selectedInterests.slice(0, 6).map((interest) => (
              <div
                key={interest}
                className="py-2 px-5 rounded-lg bg-[#DD101E] text-white font-outfit font-semibold text-[16px]"
              >
                {interest}
              </div>
            ))}
            <button
              onClick={() => setShowInterestsModal(true)}
              className="font-outfit font-semibold text-[18px] text-[#DD101E]"
            >
              See all interests
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#EEEEEE] p-6 mb-8">
          <h2 className="font-outfit font-bold text-[20px] text-[#212121] mb-4">
            Basics
          </h2>
          <div className="border-b border-[#EEEEEE] mb-6" />

          <div className="space-y-4">
            {basicsItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedCategory(item.key)}
                className="flex justify-between items-center w-full p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  <span className="font-outfit font-medium text-[18px] text-[#212121]">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-outfit font-medium text-[#9E9E9E]">
                    {filters[item.key]?.join(", ") || "Select"}
                  </span>
                  <IoIosArrowForward className="text-[#9E9E9E] w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#EEEEEE] p-6 mb-8">
          <h2 className="font-outfit font-bold text-[20px] text-[#212121] mb-4">
            Lifestyle
          </h2>
          <div className="border-b border-[#EEEEEE] mb-6" />

          <div className="space-y-4">
            {lifestyleItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedCategory(item.key)}
                className="flex justify-between items-center w-full p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  <span className="font-outfit font-medium text-[18px] text-[#212121]">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-outfit font-medium text-[#9E9E9E]">
                    {filters[item.key]?.join(", ") || "Select"}
                  </span>
                  <IoIosArrowForward className="text-[#9E9E9E] w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add Filter Modal */}
        <Dialog
          open={!!selectedCategory}
          onOpenChange={() => setSelectedCategory("")}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-outfit font-bold text-xl">
                {selectedCategory
                  ? [...basicsItems, ...lifestyleItems].find(
                      (i) => i.key === selectedCategory
                    )?.label
                  : "Filter Options"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {selectedCategory === "zodiac" && (
                <ZodiacFilter
                  selected={filters.zodiac || []}
                  onSelect={(values) =>
                    setFilters((prev) => ({ ...prev, zodiac: values }))
                  }
                />
              )}

              {selectedCategory === "blood" && (
                <BloodGroupFilter
                  selected={filters.blood || []}
                  onSelect={(values) =>
                    setFilters((prev) => ({ ...prev, blood: values }))
                  }
                />
              )}

              {selectedCategory === "education" && (
                <EducationFilter
                  selected={filters.education || []}
                  onSelect={(values) =>
                    setFilters((prev) => ({ ...prev, education: values }))
                  }
                />
              )}

              {/* Add similar conditionals for other categories */}

              {!["zodiac", "blood", "education"].includes(selectedCategory) && (
                <div className="flex gap-4 justify-end mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory("")}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setSelectedCategory("")}
                    className="bg-primary text-white"
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Modals */}
        <InterestsModal
          isOpen={showInterestsModal}
          onClose={() => setShowInterestsModal(false)}
          onSelect={(interests) => setSelectedInterests(interests)}
        />
        <RelationshipGoalsModal
          isOpen={showGoalsModal}
          onClose={() => setShowGoalsModal(false)}
          onSelect={setSelectedGoal}
          selectedGoal={selectedGoal}
        />
      </div>
    </div>
  );
}
