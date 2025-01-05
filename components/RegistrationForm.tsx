"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import InterestsModal from "./InterestsModal";
import RelationshipGoalsModal from "./RelationshipGoalsModal";
import GenderOptionsModal from "./GenderOptionsModal";
import { Plus } from "lucide-react";
import PhotoUpload from "./PhotoUpload";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdKeyboardArrowRight } from "react-icons/md";

type Gender = "Man" | "Woman" | "Agender" | "Androgynous" | "Bigender" | "Demiman" | "Demiwoman" | "";

const RegistrationForm = () => {
  const [showGenderModal, setShowGenderModal] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [showGoalsModal, setShowGoalsModal] = useState<boolean>(false);
  const [showInterestsModal, setShowInterestsModal] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<Gender>("");

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  return (
    <main className="pt-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:justify-between ">
          <div className="w-full lg:w-[45%] space-y-6">
            {/* Previous form fields remain the same */}
            <div>
              <Label className="font-outfit font-bold text-base text-[#212121]">
                Your First Name
              </Label>
              <Input
                className="w-full bg-[#FAFAFA] font-outfit font-semibold text-base mt-2 text-[#212121] border-none"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <Label className="font-outfit font-bold text-[#212121]">
                Your Faithful Match Identity
              </Label>
              <Input
                className="w-full bg-[#FAFAFA] font-outfit font-semibold text-base mt-2 text-[#212121] border-none"
                placeholder="Enter your match identity"
              />
            </div>

            <div>
              <Label className="font-outfit font-bold">Your Birthday</Label>
              <div className="flex gap-4">
                <Input
                  className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                  placeholder="DD"
                />
                <Input
                  className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                  placeholder="MM"
                />
                <Input
                  className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                  placeholder="YYYY"
                />
              </div>
            </div>

            {/* Updated Gender Selection */}
            <div>
              <Label className="font-outfit font-bold">Gender</Label>
              <div className="flex gap-2 flex-wrap mt-2">
                <Button
                  variant="outline"
                  className={`py-4 font-outfit font-semibold px-8 rounded-full hover:bg-primary hover:text-white ${
                    selectedGender === "Man"
                      ? "bg-primary text-white"
                      : "border-[#E0E0E0]"
                  }`}
                  onClick={() => handleGenderSelect("Man")}
                >
                  Man
                </Button>
                <Button
                  variant="outline"
                  className={`py-2 font-outfit font-bold rounded-full px-8 hover:bg-primary hover:text-white ${
                    selectedGender === "Woman"
                      ? "bg-primary text-white"
                      : "border-[#E0E0E0]"
                  }`}
                  onClick={() => handleGenderSelect("Woman")}
                >
                  Woman
                </Button>
                <Button
                  variant="outline"
                  className="py-2 font-outfit rounded-full font-semibold px-8 border-[#E0E0E0]"
                  onClick={() => setShowGenderModal(true)}
                >
                  More Options <MdKeyboardArrowRight />
                </Button>
              </div>
            </div>

            <div>
              <Label className="font-outfit font-bold">
                Your Relationship Goals
              </Label>
              <Button
                variant="outline"
                className="w-full mt-2 rounded-full border-[#E0E0E0] font-outfit font-semibold"
                onClick={() => setShowGoalsModal(true)}
              >
                {selectedGoal ? (
                  selectedGoal
                ) : (
                  <>
                    <Plus className="mr-2" /> Add Relationship Goals
                  </>
                )}
              </Button>
            </div>

            <div>
              <Label className="font-outfit font-bold">Your Interests</Label>
              <Button
                variant="outline"
                className="w-full border-[#E0E0E0]"
                onClick={() => setShowInterestsModal(true)}
              >
                <Plus className="mr-2" /> Add Interests
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-[45%]">
            <PhotoUpload />
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button className="bg-primary px-8 py-4 rounded-lg">Sign Up</Button>
          <p className="font-outfit">
            Already have an account?{" "}
            <span className="text-primary cursor-pointer">Sign in</span>
          </p>
        </div>
      </div>

      {/* Modals */}
      <GenderOptionsModal
        isOpen={showGenderModal}
        onClose={() => setShowGenderModal(false)}
        onSelect={handleGenderSelect}
        selectedGender={selectedGender}
      />
      <RelationshipGoalsModal
        isOpen={showGoalsModal}
        onClose={() => setShowGoalsModal(false)}
        onSelect={(goal: string) => setSelectedGoal(goal)}
        selectedGoal={selectedGoal}
      />
      <InterestsModal
        isOpen={showInterestsModal}
        onClose={() => setShowInterestsModal(false)}
        onSelect={(interests: string[]) => console.log("Selected interests:", interests)}
      />
    </main>
  );
};

export default RegistrationForm;