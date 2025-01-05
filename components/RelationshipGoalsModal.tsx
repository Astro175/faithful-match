"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Card, CardContent } from "./ui/card";

type Goal = {
  title: string;
  subtitle: string;
};

interface RelationshipGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (goal: string) => void;
  selectedGoal?: string;
}

const RelationshipGoalsModal: React.FC<RelationshipGoalsModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedGoal: initialGoal,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<string>(initialGoal || "");

  useEffect(() => {
    setSelectedGoal(initialGoal || "");
  }, [initialGoal]);

  const goals: Goal[] = [
    {
      title: "Dating 👩‍❤️‍👨",
      subtitle:
        "Seeking love and meaningful connections? Choose dating for genuine relationships.",
    },
    {
      title: "Friendship 🙌",
      subtitle:
        "Expand your social circle and make new friends. Opt for friendship today.",
    },
    {
      title: "Casual 😄",
      subtitle:
        "Looking for fun and relaxed encounters? Select casual for carefree connections.",
    },
    {
      title: "Serious Relationship 💍",
      subtitle:
        "Ready for commitment and a lasting partnership? Pick serious relationship.",
    },
    {
      title: "Open to Options 🌟",
      subtitle:
        "Explore various connections and keep your options open with this choice.",
    },
    {
      title: "Networking 🤝",
      subtitle:
        "Connect professionally and expand your network. Choose networking now.",
    },
    {
      title: "Exploration 🌍",
      subtitle:
        "Embark on a journey of discovery. Select exploration for new experiences.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[600px] max-w-[800px] px-16">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <X className="cursor-pointer" onClick={onClose} />
            <DialogTitle className="font-outfit font-bold">
              Relationship Goals
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          {goals.map((goal) => (
            <Card
              key={goal.title}
              className={`cursor-pointer transition-colors duration-200 ${
                selectedGoal === goal.title
                  ? "bg-primary border-primary"
                  : "border-[#EEEEEE] hover:border-primary"
              }`}
              onClick={() => setSelectedGoal(goal.title)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <h3
                    className={`font-outfit font-semibold ${
                      selectedGoal === goal.title ? "text-white" : ""
                    }`}
                  >
                    {goal.title}
                  </h3>
                  <p
                    className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                      selectedGoal === goal.title
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {goal.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          className="w-full bg-primary text-white mt-4"
          onClick={() => {
            onSelect(selectedGoal);
            onClose();
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RelationshipGoalsModal;
