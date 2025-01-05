"use client";

import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface GenderOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (gender: string) => void;
  selectedGender: string | null;
}

const GenderOptionsModal: React.FC<GenderOptionsModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedGender,
}) => {
  const genderOptions = [
    "Agender",
    "Androgynous",
    "Bigender",
    "Demiman",
    "Demiwoman",
  ];

  // Local state for modal selection
  const [modalSelection, setModalSelection] = useState<string | null>(
    selectedGender
  );

  // Update modal selection when selectedGender prop changes
  useEffect(() => {
    setModalSelection(selectedGender);
  }, [selectedGender]);

  const handleOK = () => {
    if (modalSelection) {
      onSelect(modalSelection);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <X className="cursor-pointer" onClick={onClose} />
            <DialogTitle className="font-outfit font-bold">
              More Options
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-2">
          {genderOptions.map((option) => (
            <Button
              key={option}
              variant="outline"
              className={`w-full font-outfit font-bold py-4 rounded-full justify-start hover:bg-primary hover:text-white ${
                modalSelection === option
                  ? "bg-primary text-white"
                  : "border-[#E0E0E0]"
              }`}
              onClick={() => setModalSelection(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Button className="w-full bg-primary text-white" onClick={handleOK}>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenderOptionsModal;
