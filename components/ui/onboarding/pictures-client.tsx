// app/pictures/pictures-client.tsx

"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OnboardingLayout } from "@/components/ui/onboardingLayout";
import { useOnboardingStore } from "@/store/onboarding-store";
import { toast } from "sonner";
import { FiPlus, FiX } from "react-icons/fi";

export default function PicturesClient() {
  const router = useRouter();
  const { pictures, addPicture, removePicture } = useOnboardingStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Create an array of 6 slots
  const pictureSlots = Array(6)
    .fill(null)
    .map((_, index) => pictures[index] || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if we already have 6 pictures
    if (pictures.length >= 6) {
      toast.error("Maximum pictures", {
        description: "You can only upload up to 6 pictures.",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload only image files.",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Convert file to base64 string
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Add the base64 string to our store
          addPicture(event.target.result as string);
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        toast.error("Upload failed", {
          description: "There was an error uploading your image.",
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);

      // Reset the file input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Upload failed", {
        description: "There was an error uploading your image.",
      });
      setIsUploading(false);
    }
  };

  const handleSelectSlot = (index: number) => {
    if (pictures[index]) return;

    // If we already have 6 pictures, show error
    if (pictures.length >= 6) {
      toast.error("Maximum pictures", {
        description: "You can only upload up to 6 pictures.",
      });
      return;
    }

    // Otherwise, trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleContinue = () => {
    if (pictures.length === 0) {
      toast.error("No pictures selected", {
        description: "Please upload at least one picture to continue.",
      });
      return;
    }

    router.push("/onboarding/location");
  };

  return (
    <OnboardingLayout
      progress={90}
      title="Show your best self 📸"
      subtitle="Upload up to six of your best photos to make a fantastic first impression. Let your personality shine."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Picture grid - refactored with exact dimensions */}
        <div className="grid grid-cols-3 gap-4" style={{ gap: "16px" }}>
          {pictureSlots.map((picture, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              {picture ? (
                // Picture is selected - show the image
                <div
                  className="relative rounded-lg overflow-hidden"
                  style={{ height: "200px", width: "115px" }}
                >
                  <Image
                    src={picture}
                    alt={`Your picture ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removePicture(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    aria-label="Remove picture"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                // Empty slot - show the + button
                <button
                  onClick={() => handleSelectSlot(index)}
                  disabled={isUploading}
                  className="flex items-center justify-center bg-[#FAFAFA] border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ height: "200px", width: "115px" }}
                >
                  {isUploading ? (
                    <div className="animate-spin h-6 w-6 border-2 border-gray-500 border-t-transparent rounded-full" />
                  ) : (
                    <FiPlus size={24} className="text-gray-400" />
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="pt-6">
          <Button
            onClick={handleContinue}
            className="w-full rounded-full"
            style={{ padding: "16px" }}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
}
