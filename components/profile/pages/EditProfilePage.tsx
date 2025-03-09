"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import { ImageUploader } from "../ImageUploader";
import { BasicInfoForm } from "../BasicInfoForm";
import { ProfileCategories } from "../ProfileCategories";
import { FormData } from "../types";
import RelationshipGoalsModal from "@/components/RelationshipGoalsModal";
import InterestsModal from "@/components/InterestsModal";
import ReligionModal from "@/components/ReligionModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useToast } from "../../ui/toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiChevronRight } from "react-icons/fi";
import { EducationFilter } from "@/components/filter/EducationFilter";
import { ZodiacFilter } from "@/components/filter/ZodiacFilter";
import { BloodGroupFilter } from "@/components/filter/BloodGroupFilter";

const basicsItems = [
  { key: "zodiac", label: "Zodiac", icon: "/filter/zodiac.svg" },
  { key: "blood", label: "Blood Group", icon: "/filter/blood-group.svg" },
  { key: "education", label: "Education", icon: "/filter/education.svg" },
];

const lifestyleItems = [
  { key: "pets", label: "Pets", icon: "/filter/pets.svg" },
  { key: "drinking", label: "Drinking Habits", icon: "/filter/drinking.svg" },
  { key: "smoking", label: "Smoking Habits", icon: "/filter/smoking.svg" },
  { key: "workout", label: "Workout", icon: "/filter/workout.svg" },
  { key: "diet", label: "Dietary Preferences", icon: "/filter/dietary.svg" },
  { key: "sleeping", label: "Sleeping Habits", icon: "/filter/sleeping.svg" },
];

const parseDOB = (dobString: string): string => {
  try {
    const [day, month, year] = dobString.split("/").map(Number);
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    return "";
  }
};

interface EditProfilePageProps {
  onBack: () => void;
}

export function EditProfilePage({ onBack }: EditProfilePageProps) {
  const { profile, fetchUserProfile } = useUserStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showReligionModal, setShowReligionModal] = useState(false);

  const [images, setImages] = useState<string[]>(profile?.images || []);
  const [selectedGoal, setSelectedGoal] = useState(
    profile?.attributes?.relationshipGoal || ""
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    profile?.attributes?.interests || []
  );
  const [selectedReligion, setSelectedReligion] = useState(
    profile?.attributes?.religion || ""
  );

  const [formData, setFormData] = useState<FormData>({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    dob: parseDOB(profile?.dob || ""),
    sex: profile?.sex || "",
    pronouns: "",
    height: profile?.attributes?.height?.toString() || "",
    weight: profile?.attributes?.weight?.toString() || "",
    jobTitle: profile?.professionalDetails?.occupation || "",
    company: "",
    school: "",
    city: "",
    bio: profile?.attributes?.bio || "",
  });

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
    setShowFilterModal(true);
  };
  const handleSave = async () => {
    if (!profile?.userId) {
      toast({
        title: "Error",
        description: "User ID is missing",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/profiles/modify?clerkId=${profile.userId}`,
        {
          ...formData,
          images,
          attributes: {
            ...profile?.attributes,
            height: parseFloat(formData.height),
            weight: parseFloat(formData.weight),
            bio: formData.bio,
            relationshipGoal: selectedGoal,
            interests: selectedInterests,
            religion: selectedReligion,
          },
          professionalDetails: {
            ...profile?.professionalDetails,
            occupation: formData.jobTitle,
          },
        }
      );

      if (response.status === 200) {
        await fetchUserProfile(profile.userId);
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        onBack();
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          type="button"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="font-outfit font-bold text-2xl text-foreground">
          Edit Profile
        </h1>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <h2 className="font-outfit font-semibold text-lg mb-4">
            Profile Photos
          </h2>
          <ImageUploader images={images} onImagesChange={setImages} />
        </div>

        <div className="lg:col-span-2">
          <BasicInfoForm formData={formData} onChange={handleFormChange} />
        </div>
      </div>

      {/* Additional Fields */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            Company
          </label>
          <Input
            name="company"
            value={formData.company}
            onChange={(e) => handleFormChange("company", e.target.value)}
            className="py-[18px] px-5 text-lg"
          />
        </div>

        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            School
          </label>
          <Input
            name="school"
            value={formData.school}
            onChange={(e) => handleFormChange("school", e.target.value)}
            className="py-[18px] px-5 text-lg"
          />
        </div>

        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            City
          </label>
          <Input
            name="city"
            value={formData.city}
            onChange={(e) => handleFormChange("city", e.target.value)}
            className="py-[18px] px-5 text-lg"
            placeholder="Search for your city..."
          />
        </div>

        <div>
          <label className="block font-outfit font-semibold text-foreground mb-2">
            About Me
          </label>
          <Textarea
            name="bio"
            value={formData.bio}
            onChange={(e) => handleFormChange("bio", e.target.value)}
            className="py-[18px] px-5 text-lg min-h-[150px]"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      {/* Relationship Goals Section */}
      <div
        onClick={() => setShowGoalsModal(true)}
        className="p-4 border border-[#EEEEEE] rounded-xl cursor-pointer mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-outfit font-bold text-xl">
            Relationship Goals
          </span>
          <FiChevronRight />
        </div>
        {selectedGoal ? (
          <Button
            variant="outline"
            className="py-2 px-5 rounded-xl border border-[#E0E0E0] text-foreground"
          >
            {selectedGoal}
          </Button>
        ) : (
          <p className="text-gray-400">Click to select a goal</p>
        )}
      </div>

      {/* Interests Section */}
      <div
        onClick={() => setShowInterestsModal(true)}
        className="p-4 border border-[#EEEEEE] rounded-xl cursor-pointer mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-outfit font-bold text-xl">Interests</span>
          <FiChevronRight />
        </div>
        {selectedInterests.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <Button
                key={interest}
                variant="outline"
                className="py-2 px-5 rounded-xl border border-[#E0E0E0] text-foreground"
              >
                {interest}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Click to select your interests</p>
        )}
      </div>

      {/* Categories */}
      <ProfileCategories
        title="Basics"
        items={basicsItems}
        onItemClick={handleCategoryClick}
        profile={profile}
      />

      <ProfileCategories
        title="Lifestyle"
        items={lifestyleItems}
        onItemClick={handleCategoryClick}
        profile={profile}
      />

      {/* Action buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6 py-3"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Modals */}
      <RelationshipGoalsModal
        isOpen={showGoalsModal}
        onClose={() => setShowGoalsModal(false)}
        onSelect={(goal) => setSelectedGoal(goal)}
        selectedGoal={selectedGoal}
      />

      <InterestsModal
        isOpen={showInterestsModal}
        onClose={() => setShowInterestsModal(false)}
        onSelect={(interests) => setSelectedInterests(interests)}
        selectedInterests={selectedInterests}
      />

      <ReligionModal
        isOpen={showReligionModal}
        onClose={() => setShowReligionModal(false)}
        onSelect={(religion) => setSelectedReligion(religion)}
        selectedReligion={selectedReligion}
      />

      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-outfit font-bold text-xl">
              {selectedCategory
                ? [...basicsItems, ...lifestyleItems].find(
                    (i) => i.key === selectedCategory
                  )?.label
                : "Filter Options"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedCategory === "zodiac" && (
              <ZodiacFilter
                selected={[profile?.personaDetails?.zodiac_sign || ""]}
                onSelect={(values) => {
                  // Handle zodiac selection
                  setShowFilterModal(false);
                }}
              />
            )}
            {selectedCategory === "blood" && (
              <BloodGroupFilter
                selected={[profile?.attributes?.blood_type || ""]}
                onSelect={(values) => {
                  // Handle blood group selection
                  setShowFilterModal(false);
                }}
              />
            )}
            {selectedCategory === "education" && (
              <EducationFilter
                selected={[profile?.professionalDetails?.occupation || ""]}
                onSelect={(values) => {
                  // Handle education selection
                  setShowFilterModal(false);
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
