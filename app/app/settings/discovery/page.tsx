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

// ========= Types =========

type DistanceUnit = "mi" | "km";
type GenderPreference = "Men" | "Women" | "Everyone";

type OSMAddress = {
  state?: string;
  country?: string;
  [key: string]: string | undefined;
};

type OSMApiResponse = {
  place_id: number;
  name: string;
  lat: string;
  lon: string;
  address: OSMAddress;
}[];

type CitySuggestion = {
  id: number;
  name: string;
  fullName: string;
  coordinates: [number, number];
  address: OSMAddress;
};

// ========= Debounce Helper =========

function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// ========= Local Cache =========

const locationCache = {
  cache: {} as Record<string, { results: CitySuggestion[]; timestamp: number }>,
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours

  set(query: string, results: CitySuggestion[]) {
    this.cache[query] = { results, timestamp: Date.now() };
    try {
      localStorage.setItem("locationCache", JSON.stringify(this.cache));
    } catch (err) {
      console.warn("Failed to store cache in localStorage", err);
    }
  },

  get(query: string): CitySuggestion[] | null {
    const cached = this.cache[query];
    if (!cached) return null;
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      delete this.cache[query];
      return null;
    }
    return cached.results;
  },

  init() {
    try {
      const saved = localStorage.getItem("locationCache");
      if (saved) {
        const parsed = JSON.parse(saved) as typeof this.cache;
        this.cache = parsed;
      }
    } catch (err) {
      console.warn("Failed to load cache from localStorage", err);
    }
  },
};

locationCache.init();

// ========= Main Component =========

export default function DiscoveryPreferences() {
  const [location, setLocation] = useState("Current Location");
  const [global, setGlobal] = useState(false);
  const [showMe, setShowMe] = useState<GenderPreference>("Women");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("mi");
  const [distanceRange, setDistanceRange] = useState(200);
  const [ageRange, setAgeRange] = useState<[number, number]>([20, 25]);
  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const convertDistance = (val: number) =>
    distanceUnit === "mi" ? val : Math.round(val * 0.621371);

  const searchCities = async (query: string) => {
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
      await new Promise((res) => setTimeout(res, 1000 - timeSinceLastRequest));
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1&featuretype=city`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch city suggestions");
      }

      const data: OSMApiResponse = await res.json();

      const formatted: CitySuggestion[] = data.map((entry) => ({
        id: entry.place_id,
        name: entry.name,
        fullName: `${entry.name}, ${
          entry.address.state || entry.address.country
        }`,
        coordinates: [parseFloat(entry.lon), parseFloat(entry.lat)],
        address: entry.address,
      }));

      locationCache.set(query, formatted);
      setSuggestions(formatted);
      setLastRequestTime(Date.now());
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(
          e.message || "Failed to fetch city suggestions. Please try again."
        );
      } else {
        setError("Failed to fetch city suggestions. Please try again.");
      }
    }
  };

  const debouncedSearch = debounce(searchCities, 300);

  const handleLocationSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleLocationSelect = (city: CitySuggestion) => {
    if (!isPremium) return;
    setLocation(city.fullName);
    setSearchQuery("");
    setSuggestions([]);
    setShowLocationModal(false);
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

      {/* Distance Units */}
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

      {/* Distance Range */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <h3 className="font-outfit font-semibold text-lg text-[#212121]">
            Distance Range
          </h3>
          <span className="font-outfit font-medium text-xl">
            {convertDistance(distanceRange)} {distanceUnit}
          </span>
        </div>
        <Slider
          value={[distanceRange]}
          max={distanceUnit === "mi" ? 250 : 400}
          onValueChange={(v) => setDistanceRange(v[0])}
          className="w-full"
        />
      </div>

      {/* Age Range */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <h3 className="font-outfit font-semibold text-lg text-[#212121]">
            Age Range
          </h3>
          <span className="font-outfit">
            {ageRange[0]} - {ageRange[1]}
          </span>
        </div>
        <Slider
          value={ageRange}
          min={18}
          max={100}
          step={1}
          onValueChange={(v) => setAgeRange(v as [number, number])}
          minStepsBetweenThumbs={1}
          className="w-full"
        />
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
              <p className="font-outfit text-sm text-[#212121]">
                Location change is a premium feature. Upgrade to match with
                people anywhere!
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
                      ? "hover:bg-gray-100"
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
                onClick={() => setIsPremium(true)}
                className="w-full bg-[#DD101E] text-white py-3 rounded-lg font-outfit hover:bg-[#BB0000]"
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
            {(["Men", "Women", "Everyone"] as const).map((option) => (
              <button
                key={option}
                onClick={() => {
                  setShowMe(option);
                  setShowModal(false);
                }}
                className={`w-full p-3 text-left rounded-lg font-outfit ${
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
