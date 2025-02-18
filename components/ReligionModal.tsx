// src/components/ReligionModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const RELIGIONS = [
  "Christianity",
  "Islam",
  "Hinduism",
  "Buddhism",
  "Secular/Atheist/Agnostic",
  "Chinese Traditional Religion",
  "Sikhism",
  "Diasporic Religions",
  "Spiritism",
  "Judaism",
  "Bahá'í",
  "Jainism",
  "Shinto",
  "Cao Dai",
  "Other",
];

interface ReligionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (religion: string) => void;
  selectedReligion?: string;
}

const ReligionModal: React.FC<ReligionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedReligion: initialReligion,
}) => {
  const [selectedReligion, setSelectedReligion] = useState<string>(
    initialReligion || ""
  );

  useEffect(() => {
    setSelectedReligion(initialReligion || "");
  }, [initialReligion]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[600px] max-w-[800px] px-16">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <X className="cursor-pointer" onClick={onClose} />
            <DialogTitle className="font-outfit font-bold">
              Religion
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          {RELIGIONS.map((religion) => (
            <Card
              key={religion}
              className={`cursor-pointer transition-colors duration-200 ${
                selectedReligion === religion
                  ? "bg-primary border-primary"
                  : "border-[#EEEEEE] hover:border-primary"
              }`}
              onClick={() => setSelectedReligion(religion)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <h3
                    className={`font-outfit font-semibold ${
                      selectedReligion === religion ? "text-white" : ""
                    }`}
                  >
                    {religion}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          className="w-full bg-primary text-white mt-4"
          onClick={() => {
            onSelect(selectedReligion);
            onClose();
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReligionModal;
