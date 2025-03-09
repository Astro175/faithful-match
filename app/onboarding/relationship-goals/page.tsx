"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OnboardingLayout } from "@/components/ui/onboardingLayout";
import { useOnboardingStore } from "@/store/onboarding-store";
import { toast } from "sonner";
import { RELATIONSHIP_GOALS } from "@/lib/constants";

export default function RelationshipGoalsPage() {
  const router = useRouter();
  const { relationshipGoal, setRelationshipGoal } = useOnboardingStore();
  const [selectedGoal, setSelectedGoal] = useState(relationshipGoal);

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleContinue = () => {
    if (!selectedGoal) {
      toast.error("Relationship Goal", {
        description: "Please select a relationship goal to continue",
      });
      return;
    }

    setRelationshipGoal(selectedGoal);
    router.push("/onboarding/distance");
  };

  return (
    <OnboardingLayout
      progress={80}
      title="Your relationship goals 💘"
      subtitle="Choose the type of relationship you're seeking on Faithful Match. Love, friendship, or something in between—it's your choice."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4">
          {RELATIONSHIP_GOALS.map((goal) => {
            const isSelected = selectedGoal === goal.title;

            return (
              <motion.div
                key={goal.title}
                className={`relative w-full cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/20 hover:border-muted-foreground/50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGoalSelect(goal.title)}
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 max-w-full">
                    {goal.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedGoal}
          className="w-full"
        >
          Continue
        </Button>
      </motion.div>
    </OnboardingLayout>
  );
}
