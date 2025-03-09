// app/interests/interests-client.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OnboardingLayout } from "@/components/ui/onboardingLayout";
import { useOnboardingStore } from "@/store/onboarding-store";
import { SearchInput } from "./search-input";
import { InterestButton } from "./interest-button";
import { INTERESTS } from "@/lib/constants";
import { toast } from "sonner";

export default function InterestsClient() {
  const router = useRouter();
  const { interests, addInterest, removeInterest } = useOnboardingStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter interests based on search
  const filteredInterests = INTERESTS.filter((interest) =>
    interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      removeInterest(interest);
    } else {
      if (interests.length >= 5) {
        toast.error("Maximum interests", {
          description: "You can only select up to 5 interests.",
        });
        return;
      }
      addInterest(interest);
    }
  };

  const handleContinue = () => {
    if (interests.length === 0) {
      toast.error("No interests selected", {
        description: "Please select at least one interest to continue.",
      });
      return;
    }

    router.push("/onboarding/pictures");
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <OnboardingLayout
      progress={60}
      title="Discover like-minded people 🤗"
      subtitle="Share your interests, passions, and hobbies. We'll connect you with people who share your enthusiasm."
    >
      <div className="space-y-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search Interest…"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-2.5"
        >
          <AnimatePresence>
            {filteredInterests.map((interest) => (
              <motion.div
                key={interest}
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
              >
                <InterestButton
                  interest={interest}
                  isSelected={interests.includes(interest)}
                  onClick={() => toggleInterest(interest)}
                  disabled={
                    interests.length >= 5 && !interests.includes(interest)
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="pt-4">
          <Button onClick={handleContinue} className="w-full rounded-full py-6">
            Continue ({interests.length}/5)
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
