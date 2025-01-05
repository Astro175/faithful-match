"use client";

import { useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const InterestsModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const interests = [
    "Travel ✈️",
    "Cooking 🍳",
    "Hiking 🏞️",
    "Yoga 🧘",
    "Gaming 🎮",
    "Movies 🎥",
    "Photography 📷",
    "Music 🎵",
    "Pets 🐱",
    "Painting 🎨",
    "Art 🎨",
    "Fitness 💪",
    "Reading 📖",
    "Dancing 💃",
    "Sports 🏀",
    "Board Games 🎲",
    "Technology 📱",
    "Fashion 👗",
    "Motorcycling 🏍️",
    "Science 🔬",
    "History 📜",
    "Nature 🌿",
    "Adventure 🌄",
    "Gardening 🌻",
    "Foodie 🍽️",
    "Writing ✍️",
    "Poetry 📝",
    "Astronomy 🔭",
    "Sustainable Living 🌱",
    "Film Production 🎬",
    "Meditation 🧘‍♂️",
    "Comedy 😄",
    "Volunteering 🤝",
    "DIY Projects 🛠️",
    "Art History 🏛️",
    "Philosophy 🧠",
    "Snowboarding 🏂",
    "Wine Tasting 🍷",
    "Collectibles 🎩",
    "Sailing ⛵",
    "Karaoke 🎤",
    "Surfing 🏄",
    "Scuba Diving 🌊",
    "Skydiving 🪂",
    "Pottery 🏺",
    "Wildlife Conservation 🦁",
    "Ghost Hunting 👻",
    "Geocaching 🌐",
    "Stand-up Comedy 🎙️",
    "Motor Racing 🏁",
    "Paranormal Investigation 🕵️‍♂️",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-8">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <X className="cursor-pointer" onClick={onClose} />
            <DialogTitle className="font-outfit font-bold text-2xl">
              Interests
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 mt-4">
          {interests.map((interest) => (
            <Button
              key={interest}
              variant="outline"
              className={`p-2 text-sm border ${
                selectedInterests.includes(interest)
                  ? "bg-primary text-white"
                  : "border-[#E0E0E0] text-black hover:bg-primary hover:text-white"
              }`}
              onClick={() => {
                setSelectedInterests((prev) =>
                  prev.includes(interest)
                    ? prev.filter((i) => i !== interest)
                    : [...prev, interest]
                );
              }}
            >
              {interest}
            </Button>
          ))}
        </div>
        <Button
          className="w-full bg-primary text-white mt-4"
          onClick={() => {
            onSelect(selectedInterests);
            onClose();
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InterestsModal;
