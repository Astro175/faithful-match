"use client";

import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

type DistanceUnit = "km" | "miles";
type GenderPreference = "Males" | "Females" | "Everyone";

// Conversion constants
const MILES_TO_KM = 1.60934;
const KM_TO_MILES = 0.621371;

const DiscoveryPreferencesPage = () => {
  // State for different preferences
  const [isGlobalEnabled, setIsGlobalEnabled] = useState<boolean>(false);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("miles");
  const [distanceRange, setDistanceRange] = useState<number>(50);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 35]);
  const [showMePreference, setShowMePreference] =
    useState<GenderPreference>("Everyone");

  // Mock modal functionality
  const [isShowMeModalOpen, setIsShowMeModalOpen] = useState<boolean>(false);

  // Handle unit conversion when distance unit changes
  useEffect(() => {
    if (distanceUnit === "km") {
      // Convert from miles to kilometers
      setDistanceRange(Math.round(distanceRange * MILES_TO_KM));
    } else {
      // Convert from kilometers to miles
      setDistanceRange(Math.round(distanceRange * KM_TO_MILES));
    }
  }, [distanceUnit]);

  // Handle unit conversion without the effect loop
  const handleUnitChange = (newUnit: DistanceUnit) => {
    if (newUnit === distanceUnit) return;

    if (newUnit === "km") {
      // Convert from miles to kilometers
      setDistanceRange(Math.round(distanceRange * MILES_TO_KM));
    } else {
      // Convert from kilometers to miles
      setDistanceRange(Math.round(distanceRange * KM_TO_MILES));
    }

    setDistanceUnit(newUnit);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4">
          <FiArrowLeft size={24} color="#212121" />
        </Link>
        <h1 className="text-2xl font-bold text-center flex-1 text-[#212121]">
          Discovery Preferences
        </h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>

      {/* Location Router */}
      <Link
        href="/change-location"
        className="flex justify-between items-center mb-4 cursor-pointer"
      >
        <div>
          <h2 className="text-xl font-semibold text-[#212121]">Location</h2>
          <p className="text-base font-normal text-[#616161]">
            Change your location to find Faithful Match members in other cities.
          </p>
        </div>
        <MdKeyboardArrowRight size={24} color="#212121" />
      </Link>

      {/* Go Global Toggle */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={() => setIsGlobalEnabled(!isGlobalEnabled)}
      >
        <div>
          <h2 className="text-xl font-semibold text-[#212121]">Go Global</h2>
          <p className="text-base font-normal text-[#616161]">
            Going global will allow you to see people from all over the world.
          </p>
        </div>
        <Switch
          checked={isGlobalEnabled}
          onCheckedChange={setIsGlobalEnabled}
        />
      </div>

      {/* Show Me Preference */}
      <div
        className="flex justify-between items-center mb-6 cursor-pointer"
        onClick={() => setIsShowMeModalOpen(true)}
      >
        <h2 className="text-xl font-semibold text-[#212121]">Show Me</h2>
        <div className="flex items-center">
          <span className="text-[#212121] mr-2 font-semibold text-base">
            {showMePreference}
          </span>
          <MdKeyboardArrowRight size={24} color="#212121" />
        </div>
      </div>

      {/* Show Distances In Section */}
      <div className="border border-[#EEEEEE] rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold text-[#212121] mb-3">
          Show Distances in
        </h2>
        <div className="flex gap-3">
          <button
            className={`py-2 px-5 rounded-full font-semibold w-full border border-[#E0E0E0] ${
              distanceUnit === "km"
                ? "bg-[#DD101E] text-white"
                : "text-[#212121]"
            }`}
            onClick={() => handleUnitChange("km")}
          >
            Km.
          </button>
          <button
            className={`py-2 px-5 rounded-full font-semibold w-full border border-[#E0E0E0] ${
              distanceUnit === "miles"
                ? "bg-[#DD101E] text-white"
                : "text-[#212121]"
            }`}
            onClick={() => handleUnitChange("miles")}
          >
            Mi.
          </button>
        </div>
      </div>

      {/* Distance Range Section */}
      <div className="border border-[#EEEEEE] font-semibold rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-[#212121]">
            Distance Range
          </h2>
          <span className="text-[#212121]">
            {distanceRange} {distanceUnit}
          </span>
        </div>
        <Slider
          value={[distanceRange]}
          max={distanceUnit === "km" ? 160 : 100}
          step={1}
          onValueChange={(value) => setDistanceRange(value[0])}
          className="mb-2"
        />
        <p className="text-base font-normal text-[#616161]">
          Set the maximum distance for potential matches.
        </p>
      </div>

      {/* Age Range Section */}
      <div className="border border-[#EEEEEE] rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-[#212121]">Age Range</h2>
          <span className="text-[#212121]">
            {ageRange[0]}-{ageRange[1]}
          </span>
        </div>
        <div className="mb-2">
          <Slider
            value={ageRange}
            min={18}
            max={65}
            step={1}
            minStepsBetweenThumbs={1}
            onValueChange={(value) => setAgeRange([value[0], value[1]])}
          />
        </div>
        <p className="text-base font-normal text-[#616161]">
          Define the preferred age range for potential matches.
        </p>
      </div>

      {/* Show Me Modal (simplified) */}
      {isShowMeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80">
            <h2 className="text-xl font-semibold text-[#212121] mb-4">
              Show Me
            </h2>
            <div className="flex flex-col gap-3">
              {["Males", "Females", "Everyone"].map((option) => (
                <button
                  key={option}
                  className={`py-2 px-5 rounded-full border border-[#E0E0E0] ${
                    showMePreference === option
                      ? "bg-[#DD101E] text-white"
                      : "text-[#212121]"
                  }`}
                  onClick={() => {
                    setShowMePreference(option as GenderPreference);
                    setIsShowMeModalOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="mt-4 py-2 px-5 rounded-full border border-[#E0E0E0] w-full"
              onClick={() => setIsShowMeModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryPreferencesPage;
