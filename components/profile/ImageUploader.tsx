import { useRef } from "react";
import Image from "next/image";
import { FiX, FiPlus } from "react-icons/fi";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export const ImageUploader = ({
  images,
  onImagesChange,
  maxImages = 6,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && images.length < maxImages) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      onImagesChange([...images, imageUrl]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {[...Array(maxImages)].map((_, index) => {
        if (index < images.length) {
          return (
            <div key={index} className="relative h-[204px] w-full">
              <div className="relative h-full w-full rounded-lg overflow-hidden">
                <Image
                  src={images[index]}
                  alt={`Profile image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white"
                type="button"
              >
                <FiX size={16} />
              </button>
            </div>
          );
        }
        return (
          <button
            key={index}
            onClick={handleAddImage}
            type="button"
            className="flex items-center justify-center h-[204px] w-full rounded-lg bg-[#FAFAFA] border border-[#EEEEEE] hover:bg-gray-100 transition-colors"
          >
            <FiPlus size={24} className="text-gray-400" />
          </button>
        );
      })}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
