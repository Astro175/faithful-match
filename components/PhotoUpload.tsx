"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useState, ChangeEvent } from "react";

interface PhotoUploadProps {
  onImagesChange: (files: File[]) => void;
}

interface PhotoData {
  file: File;
  preview: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImagesChange }) => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && photos.length < 6) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const newPhotos = [
            ...photos,
            { file, preview: e.target.result as string },
          ];
          setPhotos(newPhotos);
          onImagesChange(newPhotos.map((p) => p.file));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onImagesChange(newPhotos.map((p) => p.file));
  };

  return (
    <div className="w-full">
      <h2 className="font-outfit font-bold text-base">Profile photos</h2>
      <p className="font-outfit font-normal">
        Upload up to six of your best photos to make a fantastic first
        impression. Let your personality shine.
      </p>
      <div className="grid grid-cols-3 gap-4 py-6 px-2 bg-white mt-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="aspect-square relative bg-[#FAFAFA] rounded-lg border border-dashed border-[#EEEEEE] object-center"
          >
            {photos[index] ? (
              <>
                <Image
                  src={photos[index].preview}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  width={200}
                  height={200}
                />
                <button
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow"
                  onClick={() => removePhoto(index)}
                  type="button"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <label className="w-full h-full flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
                <Plus size={24} className="text-gray-400" />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUpload;
