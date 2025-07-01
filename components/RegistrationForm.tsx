"use client";

import React, { useState, createContext } from "react";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import InterestsModal from "./InterestsModal";
import RelationshipGoalsModal from "./RelationshipGoalsModal";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, MapPin } from "lucide-react";
import PhotoUpload from "./PhotoUpload";
import LocationModal from "./LocationModal";
import { uploadImagesToCloudinary } from "@/utils/cloudinary";
import { createProfileAction } from "@/app/actions/profile-registration";
import { useRouter } from "next/navigation";

interface LocationContextType {
  location: { lat: number; lng: number } | null;
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
});

type Sex = "male" | "female" | "";

type FormData = {
  firstName: string;
  matchIdentity: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  sex: Sex;
  relationshipGoal: string;
  interests: string[];
};

type RegistrationFormProps = {
  userId: string | undefined;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ userId }) => {
  const router = useRouter();
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const currentSex = watch("sex");

  const handleSexSelect = (sex: Sex) => {
    setValue("sex", sex);
  };

  const handleInterestSelect = (interests: string[]) => {
    setSelectedInterests(interests);
    setValue("interests", interests);
  };

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
    setValue("relationshipGoal", goal);
  };

  const removeInterest = (interest: string) => {
    const updatedInterests = selectedInterests.filter((i) => i !== interest);
    setSelectedInterests(updatedInterests);
    setValue("interests", updatedInterests);
  };

  const handleImagesChange = (files: File[]) => {
    setImageFiles(files);
    setUploadError(null);
  };

  const onSubmit = async (data: FormData) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      let imageUrls: string[] = [];

      if (imageFiles.length > 0) {
        const uploadResult = await uploadImagesToCloudinary(
          imageFiles,
          "dating-profiles"
        );

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload images");
        }

        imageUrls = uploadResult.urls || [];
      }

      const formData = new FormData();

      if (userId) {
        formData.append("userId", userId);
      }
      formData.append("visibility", "everyone");
      formData.append("userName", data.matchIdentity);
      formData.append("firstName", data.firstName);

      const dob = new Date(
        `${data.birthYear}-${data.birthMonth}-${data.birthDay}`
      );
      formData.append("dob", dob.toISOString());

      formData.append("sex", data.sex);
      formData.append("relationshipGoal", data.relationshipGoal);

      if (location) {
        formData.append("longitude", location.lng.toString());
        formData.append("latitude", location.lat.toString());
      }

      formData.append("interests", selectedInterests.join(","));

      if (imageUrls.length > 0) {
        formData.append("images", imageUrls.join(","));
      }

      const result = await createProfileAction(formData);

      if (result.success) {
        router.push("/app");
      } else {
        setUploadError(result.error || "Failed to create profile");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setUploadError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-16 px-4 md:px-8 lg:px-32"
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:justify-between">
            <div className="w-full lg:w-[45%] space-y-6">
              <div>
                <Label className="font-outfit font-bold text-base text-[#212121]">
                  Your First Name
                </Label>
                <Input
                  {...register("firstName", { required: true })}
                  className="w-full bg-[#FAFAFA] font-outfit font-semibold text-base mt-2 text-[#212121] border-none"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              {/* Username */}
              <div>
                <Label className="font-outfit font-bold text-[#212121]">
                  Your Username
                </Label>
                <Input
                  {...register("matchIdentity", { required: true })}
                  className="w-full bg-[#FAFAFA] font-outfit font-semibold text-base mt-2 text-[#212121] border-none"
                  placeholder="Enter your match identity"
                />
                {errors.matchIdentity && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              {/* Birthday */}
              <div>
                <Label className="font-outfit font-bold">Your Birthday</Label>
                <div className="flex gap-4">
                  <Input
                    {...register("birthDay", { required: true })}
                    className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                    placeholder="DD"
                  />
                  <Input
                    {...register("birthMonth", { required: true })}
                    className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                    placeholder="MM"
                  />
                  <Input
                    {...register("birthYear", { required: true })}
                    className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                    placeholder="YYYY"
                  />
                </div>
                {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                  <span className="text-red-500 text-sm">
                    All date fields are required
                  </span>
                )}
              </div>

              {/* Location Display */}
              {location && (
                <div>
                  <Label className="font-outfit font-bold">Your Location</Label>
                  <div className="flex items-center mt-2 p-3 bg-gray-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm text-gray-600">
                      Location detected ({location.lat.toFixed(2)},{" "}
                      {location.lng.toFixed(2)})
                    </span>
                  </div>
                </div>
              )}

              {/* Sex */}
              <div>
                <Label className="font-outfit font-bold">Sex</Label>
                <div className="flex gap-2 flex-wrap mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className={`py-4 font-outfit font-semibold px-8 rounded-full hover:bg-primary hover:text-white ${
                      currentSex === "male"
                        ? "bg-primary text-white"
                        : "border-[#E0E0E0]"
                    }`}
                    onClick={() => handleSexSelect("male")}
                  >
                    Male
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={`py-2 font-outfit font-bold rounded-full px-8 hover:bg-primary hover:text-white ${
                      currentSex === "female"
                        ? "bg-primary text-white"
                        : "border-[#E0E0E0]"
                    }`}
                    onClick={() => handleSexSelect("female")}
                  >
                    Female
                  </Button>
                </div>
                {errors.sex && (
                  <span className="text-red-500 text-sm">
                    Please select your sex
                  </span>
                )}
              </div>

              {/* Relationship Goals */}
              <div>
                <Label className="font-outfit font-bold">
                  Your Relationship Goals
                </Label>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {selectedGoal && (
                    <div className="bg-primary text-white px-4 py-2 rounded-full inline-flex items-center gap-2 font-outfit font-semibold">
                      {selectedGoal}
                      <X
                        className="h-4 w-4 cursor-pointer"
                        onClick={() => handleGoalSelect("")}
                      />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-[#E0E0E0] font-outfit font-semibold whitespace-nowrap"
                    onClick={() => setShowGoalsModal(true)}
                  >
                    <Plus className="mr-2" /> Add Relationship Goals
                  </Button>
                </div>
                {errors.relationshipGoal && (
                  <span className="text-red-500 text-sm">
                    Please select a relationship goal
                  </span>
                )}
              </div>

              {/* Interests */}
              <div>
                <Label className="font-outfit font-bold">Your Interests</Label>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {selectedInterests.map((interest) => (
                    <div
                      key={interest}
                      className="bg-primary text-white px-4 py-2 rounded-full inline-flex items-center gap-2 font-outfit font-semibold"
                    >
                      {interest}
                      <X
                        className="h-4 w-4 cursor-pointer"
                        onClick={() => removeInterest(interest)}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-[#E0E0E0] font-outfit font-semibold whitespace-nowrap"
                    onClick={() => setShowInterestsModal(true)}
                  >
                    <Plus className="mr-2" /> Add Interests
                  </Button>
                </div>
                {errors.interests && (
                  <span className="text-red-500 text-sm">
                    Please select at least one interest
                  </span>
                )}
              </div>
            </div>

            <div className="w-full lg:w-[45%]">
              <PhotoUpload onImagesChange={handleImagesChange} />
            </div>
          </div>

          {/* Upload Error Display */}
          {uploadError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
              {uploadError}
            </div>
          )}

          <div className="mt-8 flex flex-col items-center gap-4">
            <Button
              type="submit"
              disabled={isUploading}
              className="bg-primary px-16 py-6 rounded-full font-outfit font-semibold"
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Profile...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
            <p className="font-outfit mb-8">
              Already have an account?{" "}
              <span className="text-primary cursor-pointer">Sign in</span>
            </p>
          </div>
        </div>

        {/* Modals */}
        <RelationshipGoalsModal
          isOpen={showGoalsModal}
          onClose={() => setShowGoalsModal(false)}
          onSelect={handleGoalSelect}
          selectedGoal={selectedGoal}
        />
        <InterestsModal
          isOpen={showInterestsModal}
          onClose={() => setShowInterestsModal(false)}
          onSelect={handleInterestSelect}
        />
        {!location && (
          <LocationModal locationContext={{ location, setLocation }} />
        )}
      </form>
    </LocationContext.Provider>
  );
};

export default RegistrationForm;
