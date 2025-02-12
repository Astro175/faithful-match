"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FiChevronRight, FiMapPin, FiLock, FiLoader } from "react-icons/fi";

// Custom debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Cache implementation
const locationCache = {
  cache: {},
  CACHE_DURATION: 24 * 60 * 60 * 1000,

  set: function (query, results) {
    this.cache[query] = {
      results,
      timestamp: Date.now(),
    };

    try {
      const cacheData = JSON.stringify(this.cache);
      localStorage.setItem("locationCache", cacheData);
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
  },

  get: function (query) {
    const cacheEntry = this.cache[query];
    if (!cacheEntry) return null;

    if (Date.now() - cacheEntry.timestamp > this.CACHE_DURATION) {
      delete this.cache[query];
      return null;
    }

    return cacheEntry.results;
  },

  init: function () {
    try {
      const savedCache = localStorage.getItem("locationCache");
      if (savedCache) {
        this.cache = JSON.parse(savedCache);
      }
    } catch (e) {
      console.warn("Failed to load from localStorage:", e);
    }
  },
};

// Initialize cache from localStorage
locationCache.init();

export default function DiscoveryPreferences() {
  const [location, setLocation] = useState("Current Location");
  const [global, setGlobal] = useState(false);
  const [showMe, setShowMe] = useState("Women");
  const [distanceUnit, setDistanceUnit] = useState<"km" | "mi">("mi");
  const [distanceRange, setDistanceRange] = useState(200);
  const [ageRange, setAgeRange] = useState<[number, number]>([20, 25]);
  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const searchCities = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    const cachedResults = locationCache.get(query);
    if (cachedResults) {
      setSuggestions(cachedResults);
      return;
    }

    setIsLoading(true);
    setError("");

    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < 1000) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 - timeSinceLastRequest)
      );
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1&featuretype=city`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }

      const data = await response.json();

      const formattedResults = data.map((result) => ({
        id: result.place_id,
        name: result.name,
        fullName: `${result.name}, ${
          result.address.state || result.address.country
        }`,
        coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
        address: result.address,
      }));

      locationCache.set(query, formattedResults);
      setSuggestions(formattedResults);
      setLastRequestTime(Date.now());
    } catch (err) {
      setError("Failed to fetch city suggestions. Please try again.");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce((query) => searchCities(query), 300);

  const handleLocationSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleLocationSelect = (location) => {
    if (!isPremium) {
      return;
    }
    setLocation(location.fullName);
    setShowLocationModal(false);
    setSearchQuery("");
    setSuggestions([]);
  };

  const convertDistance = (value: number) => {
    return distanceUnit === "mi" ? value : Math.round(value * 0.621371);
  };

  return (
    <div className="max-w-[380px] mx-auto p-4">
      <h1 className="font-outfit text-[#212121] text-2xl text-center mb-8 font-bold">
        Discovery Preferences
      </h1>

      {/* Location Section */}
      <div
        className="mb-8 cursor-pointer"
        onClick={() => setShowLocationModal(true)}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-outfit font-semibold text-[#212121] text-lg">
            Location
          </span>
          <div className="flex items-center gap-2">
            <span className="font-outfit text-[#616161]">{location}</span>
            <FiChevronRight className="text-[#616161]" />
          </div>
        </div>
        <p className="font-outfit text-[#616161] text-base">
          Change your location to find Faithful Match members in other cities.
        </p>
      </div>

      {/* Global Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-outfit font-semibold text-[#212121] text-lg">
            Go Global
          </span>
          <Switch
            checked={global}
            onCheckedChange={setGlobal}
            style={{ backgroundColor: global ? "#DD101E" : "#E0E0E0" }}
          />
        </div>
        <p className="font-outfit text-[#616161] text-base">
          Going global will allow you to see people from all over the world.
        </p>
      </div>

      {/* Show Me Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-outfit font-semibold text-[#212121] text-lg">
            Show Me
          </span>
          <div
            className="flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <span className="font-outfit text-[#212121] font-semibold text-lg">
              {showMe}
            </span>
            <FiChevronRight className="text-[#616161]" />
          </div>
        </div>
      </div>

      {/* Show Distances In Section */}
      <div className="mb-8">
        <h3 className="font-outfit font-semibold text-[#212121] text-lg mb-4">
          Show Distances In
        </h3>
        <div className="flex gap-4">
          {(["km", "mi"] as const).map((unit) => (
            <button
              key={unit}
              onClick={() => setDistanceUnit(unit)}
              className={`w-1/2 py-2 px-5 rounded-full font-semibold font-outfit text-base ${
                distanceUnit === unit
                  ? "bg-[#DD101E] text-white"
                  : "border border-[#E0E0E0] text-[#212121]"
              }`}
            >
              {unit.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Range Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-outfit font-semibold text-[#212121] text-lg">
            Distance Range
          </h3>
          <span className="font-outfit font-medium text-xl">
            {convertDistance(distanceRange)} {distanceUnit}
          </span>
        </div>
        <Slider
          value={[distanceRange]}
          max={distanceUnit === "mi" ? 250 : 400}
          onValueChange={(value) => setDistanceRange(value[0])}
          className="w-full"
        />
        <p className="font-outfit text-[#616161] text-base mt-2">
          Set the maximum distance for potential matches.
        </p>
      </div>

      {/* Age Range Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-outfit font-semibold text-[#212121] text-lg">
            Age Range
          </h3>
          <span className="font-outfit">
            {ageRange[0]}-{ageRange[1]}
          </span>
        </div>
        <Slider
          value={ageRange}
          min={18}
          max={100}
          step={1}
          onValueChange={(value) => setAgeRange(value as [number, number])}
          minStepsBetweenThumbs={1}
          className="w-full"
        />
        <p className="font-outfit text-[#616161] text-base mt-2">
          Define the preferred age range for potential matches.
        </p>
      </div>

      {/* Location Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-outfit font-bold text-xl flex items-center gap-2">
              <FiMapPin /> Change Location
            </DialogTitle>
          </DialogHeader>

          {!isPremium && (
            <div className="bg-[#FEE2E2] border border-[#DD101E] p-3 rounded-lg flex items-center gap-2">
              <FiLock className="text-[#DD101E]" />
              <p className="font-outfit text-[#212121] text-sm">
                Location change is a premium feature. Upgrade to change your
                location and match with people anywhere!
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => handleLocationSearch(e.target.value)}
                className="w-full p-2 border rounded-lg font-outfit"
              />
              {isLoading && (
                <FiLoader className="absolute right-3 top-3 animate-spin text-gray-400" />
              )}
            </div>

            {error && <p className="text-red-500 font-outfit">{error}</p>}

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {suggestions.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleLocationSelect(city)}
                  disabled={!isPremium}
                  className={`w-full p-3 text-left rounded-lg font-outfit ${
                    isPremium
                      ? "hover:bg-gray-100 active:bg-gray-200"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-[#616161]" />
                    <span>{city.fullName}</span>
                  </div>
                </button>
              ))}
            </div>

            {!isPremium && (
              <button
                className="w-full bg-[#DD101E] text-white py-3 rounded-lg font-outfit hover:bg-[#BB0000]"
                onClick={() => setIsPremium(true)}
              >
                Upgrade to Premium
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Show Me Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-outfit font-bold text-xl">
              Show Me
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {["Men", "Women", "Everyone"].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setShowMe(option);
                  setShowModal(false);
                }}
                className={`w-full p-3 rounded-lg font-outfit text-left ${
                  showMe === option
                    ? "bg-[#DD101E] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
