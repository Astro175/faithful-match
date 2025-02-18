"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2, LocateIcon, MapPin } from "lucide-react";

interface LocationContextType {
  location: { lat: number; lng: number } | null;
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
}

interface LocationModalProps {
  locationContext: LocationContextType;
}

const LocationModal: React.FC<LocationModalProps> = ({ locationContext }) => {
  const { location, setLocation } = locationContext;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get precise geolocation
  const getGeolocation = () => {
    setIsLoading(true);
    setErrorMessage("");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsModalOpen(false);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setErrorMessage(
            "Unable to retrieve your location. Using approximate location instead."
          );
          getApproximateLocation();
        }
      );
    } else {
      getApproximateLocation();
    }
  };

  const getApproximateLocation = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setLocation({
        lat: data.latitude,
        lng: data.longitude,
      });
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(
        "Could not determine your location. Matches may be less accurate."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getGeolocation();
    }
  }, []);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-fit p-4 rounded-full mx-auto">
            <MapPin className="h-8 w-8 text-primary mx-auto" />
          </div>
          <h2 className="font-outfit text-2xl font-bold">
            Help Us Find Your Faithful Matches
          </h2>
          <p className="text-gray-600">
            To connect you with nearby Christian singles, we need access to your
            location. Your privacy is important - we only use this to suggest
            matches in your area.
          </p>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <div className="flex flex-col gap-3">
          <Button
            onClick={getGeolocation}
            disabled={isLoading}
            className="w-full py-6 rounded-full font-semibold gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Detecting Location...
              </>
            ) : (
              <>
                <LocateIcon className="h-5 w-5" />
                Share Precise Location
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={getApproximateLocation}
            disabled={isLoading}
            className="w-full py-6 rounded-full font-semibold"
          >
            Use Approximate Location
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          We&apos;ll use your IP address to estimate your location. Matches may
          be less accurate.
        </p>
      </div>
    </div>
  );
};

export default LocationModal;
