// app/location/location-client.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { OnboardingLayout } from "@/components/ui/onboardingLayout";
import { useOnboardingStore } from "@/store/onboarding-store";
import { toast } from "sonner";
import { FiMapPin } from "react-icons/fi";

export default function LocationClient() {
  const router = useRouter();
  const { setLocation } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAllowLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      toast.error("Geolocation not supported", {
        description: "Your browser does not support geolocation.",
      });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success - store the location
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationEnabled: true,
        });

        toast.success("Location enabled", {
          description: "Your location has been successfully enabled.",
        });

        // Redirect to the next page or home page
        router.push("/onboarding-complete");
        setIsLoading(false);
      },
      (error) => {
        // Error - handle different error cases
        let errorMessage = "There was an error accessing your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission was denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get location timed out.";
            break;
        }

        toast.error("Location error", {
          description: errorMessage,
        });

        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <OnboardingLayout
      progress={100}
      title=""
      subtitle=""
      showBackButton={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-8 pt-8"
      >
        {/* Circular container with location icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="w-32 h-32 flex items-center justify-center rounded-full border border-solid border-[#EEEEEE] p-8"
        >
          <FiMapPin size={64} className="text-destructive" />
        </motion.div>

        {/* Title and subtitle */}
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[32px] font-bold text-[#212121]"
          >
            Enable Location
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-gray-500 max-w-md"
          >
            You need to enable location to be able to use the Faithful Match
            app.
          </motion.p>
        </div>

        {/* Custom button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAllowLocation}
          disabled={isLoading}
          className="mt-8 px-8 py-3 bg-destructive text-white rounded-md font-medium text-lg hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Allow Location"
          )}
        </motion.button>
      </motion.div>
    </OnboardingLayout>
  );
}
