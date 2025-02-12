"use client";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import InterestsModal from "./InterestsModal";
import RelationshipGoalsModal from "./RelationshipGoalsModal";
import GenderOptionsModal from "./GenderOptionsModal";
import { Plus } from "lucide-react";
import PhotoUpload from "./PhotoUpload";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdKeyboardArrowRight } from "react-icons/md";
import { X } from "lucide-react";
import ProfileRegistrationModal from "./profileRegistrationSuccessModal";
import { CrossIcon, LocateIcon, MapPin } from "lucide-react";
import { Loader2 } from "lucide-react";

const LocationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get precise geolocation
  const getGeolocation = () => {
    setIsLoading(true);
    setErrorMessage("");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsModalOpen(false);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setErrorMessage(
            "Unable to retrieve your location. Using approximate location instead."
          );
          getApproximateLocation();
        }
      );
    } else {
      getApproximateLocation();
    }
  };

  const getApproximateLocation = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setLocation({
        lat: data.latitude,
        lng: data.longitude,
      });
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(
        "Could not determine your location. Matches may be less accurate."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getGeolocation();
    }
  }, []);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-fit p-4 rounded-full mx-auto">
            <MapPin className="h-8 w-8 text-primary mx-auto" />
          </div>
          <h2 className="font-outfit text-2xl font-bold">
            Help Us Find Your Faithful Matches
          </h2>
          <p className="text-gray-600">
            To connect you with nearby Christian singles, we need access to your
            location. Your privacy is important - we only use this to suggest
            matches in your area.
          </p>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <div className="flex flex-col gap-3">
          <Button
            onClick={getGeolocation}
            disabled={isLoading}
            className="w-full py-6 rounded-full font-semibold gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Detecting Location...
              </>
            ) : (
              <>
                <LocateIcon className="h-5 w-5" />
                Share Precise Location
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={getApproximateLocation}
            disabled={isLoading}
            className="w-full py-6 rounded-full font-semibold"
          >
            Use Approximate Location
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          We'll use your IP address to estimate your location. Matches may be
          less accurate.
        </p>
      </div>
    </div>
  );
};

type Gender =
  | "Man"
  | "Woman"
  | "Agender"
  | "Androgynous"
  | "Bigender"
  | "Demiman"
  | "Demiwoman"
  | "";

type FormData = {
  firstName: string;
  matchIdentity: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: Gender;
  relationshipGoal: string;
  interests: string[];
};

const RegistrationForm = () => {
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const currentGender = watch("gender");

  const handleGenderSelect = (gender: Gender) => {
    setValue("gender", gender);
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form submitted with data:", data);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-16 px-32">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:justify-between">
          <div className="w-full lg:w-[45%] space-y-6">
            {/* First Name */}
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

            {/* Match Identity */}
            <div>
              <Label className="font-outfit font-bold text-[#212121]">
                Your Username
              </Label>
              <Input
                {...register("matchIdentity", { required: true })}
                className="w-full bg-[#FAFAFA] font-outfit font-semibold text-base mt-2 text-[#212121] border-none"
                placeholder="Enter your match identity"
              />
            </div>

            {/* Birthday */}
            <div>
              <Label className="font-outfit font-bold">Your Birthday</Label>
              <div className="flex gap-4">
                <Input
                  {...register("birthDay")}
                  className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                  placeholder="DD"
                />
                <Input
                  {...register("birthMonth")}
                  className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                  placeholder="MM"
                />
                <Input
                  {...register("birthYear")}
                  className="py-6 px-4 max-w-16 bg-[#FAFAFA] border-none"
                  placeholder="YYYY"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <Label className="font-outfit font-bold">Gender</Label>
              <div className="flex gap-2 flex-wrap mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className={`py-4 font-outfit font-semibold px-8 rounded-full hover:bg-primary hover:text-white ${
                    currentGender === "Man"
                      ? "bg-primary text-white"
                      : "border-[#E0E0E0]"
                  }`}
                  onClick={() => handleGenderSelect("Man")}
                >
                  Man
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`py-2 font-outfit font-bold rounded-full px-8 hover:bg-primary hover:text-white ${
                    currentGender === "Woman"
                      ? "bg-primary text-white"
                      : "border-[#E0E0E0]"
                  }`}
                  onClick={() => handleGenderSelect("Woman")}
                >
                  Woman
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="py-2 font-outfit rounded-full font-semibold px-8 border-[#E0E0E0]"
                  onClick={() => setShowGenderModal(true)}
                >
                  More Options <MdKeyboardArrowRight />
                </Button>
              </div>
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
            </div>
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
            </div>
          </div>

          <div className="w-full lg:w-[45%]">
            <PhotoUpload />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary px-16 py-6 rounded-full font-outfit font-semibold"
          >
            {isSubmitting ? "Updating..." : "Sign Up"}
          </Button>
          <p className="font-outfit mb-8">
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
        selectedGender={currentGender}
      />
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
      <ProfileRegistrationModal isOpen={showSuccessModal} />
      {!location && <LocationModal />}
    </form>
  );
};

export default RegistrationForm;
