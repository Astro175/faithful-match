"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OnboardingLayout } from "@/components/ui/onboardingLayout";
import { useOnboardingStore } from "@/store/onboarding-store";
import { CakeIcon } from "lucide-react";
import { toast } from "sonner";

export default function BirthdatePage() {
  const router = useRouter();
  const { birthdate, setBirthdate } = useOnboardingStore();

  const [localBirthdate, setLocalBirthdate] = useState({
    month: birthdate.month || "",
    day: birthdate.day || "",
    year: birthdate.year || "",
  });

  const handleInputChange = (
    field: "month" | "day" | "year",
    value: string
  ) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setLocalBirthdate((prev) => ({ ...prev, [field]: numericValue }));
  };

  const validateBirthdate = () => {
    const { month, day, year } = localBirthdate;

    if (!month || !day || !year) {
      toast.error("Incomplete Birthdate", {
        description: "Please fill in all fields",
      });
      return false;
    }

    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const yearNum = parseInt(year);

    if (monthNum < 1 || monthNum > 12) {
      toast.error("Invalid Month", {
        description: "Month must be between 1 and 12",
      });
      return false;
    }

    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum < 1 || dayNum > daysInMonth) {
      toast.error("Invalid Day", {
        description: `Day must be between 1 and ${daysInMonth}`,
      });
      return false;
    }

    const currentYear = new Date().getFullYear();
    if (yearNum > currentYear - 18) {
      toast.error("Age Restriction", {
        description: "You must be at least 18 years old",
      });
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateBirthdate()) {
      setBirthdate(localBirthdate);
      router.push("/onboarding/gender");
    }
  };

  return (
    <OnboardingLayout
      progress={40}
      title="Let's celebrate you 🎂"
      subtitle="Tell us your birthdate. Your profile does not display your birthdate, only your age."
    >
      {/* Ensures full height and button at bottom */}
      <div className="flex flex-col min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-grow space-y-4"
        >
          <div className="flex justify-center mb-6">
            <CakeIcon
              size={100}
              className="text-primary/60 animate-bounce"
              strokeWidth={1}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="MM"
              maxLength={2}
              value={localBirthdate.month}
              onChange={(e) => handleInputChange("month", e.target.value)}
              className="text-center text-lg font-bold h-12"
            />
            <Input
              placeholder="DD"
              maxLength={2}
              value={localBirthdate.day}
              onChange={(e) => handleInputChange("day", e.target.value)}
              className="text-center text-lg font-bold h-12"
            />
            <Input
              placeholder="YYYY"
              maxLength={4}
              value={localBirthdate.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
              className="text-center text-lg font-bold h-12"
            />
          </div>
        </motion.div>

        {/* Button wrapper to keep it at bottom */}
        <div className="pb-64vxdrg">
          <Button onClick={handleContinue} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
