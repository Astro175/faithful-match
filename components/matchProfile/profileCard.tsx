"use client";
import Image from "next/image";
import { Profile } from "@/types/profiles";
import { useLikeProfile } from "@/hooks/useLike";
import { useDislikeProfile } from "@/hooks/useDislike";

export default function ProfileCard({
  profile,
  userId,
}: {
  profile: Profile;
  userId: string;
}) {
  const likeMutation = useLikeProfile(userId);
  const dislikeMutation = useDislikeProfile(userId);

  // Generate initials for fallback avatar
  const getInitials = () => {
    const firstNameInitial = profile.firstName?.[0]?.toUpperCase() || "";
    const lastNameInitial = profile.lastName?.[0]?.toUpperCase() || "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

  const handleLike = () =>
    profile.userId && likeMutation.mutate(profile.userId);
  const handleDislike = () =>
    profile.userId && dislikeMutation.mutate(profile.userId);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Main Profile Image with Fallback */}
      <div className="relative aspect-square w-full">
        {profile.profile_img?.url ? (
          <Image
            src={profile.profile_img.url}
            alt={`${profile.firstName}'s profile`}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-2xl font-bold rounded-lg">
            <span>{getInitials()}</span>
          </div>
        )}
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-2 p-4">
        {profile.images.map((image) => (
          <div key={image.id} className="relative aspect-square">
            {image.url ? (
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md text-gray-400">
                <span>📸</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Profile Info */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">
          {profile.firstName}, {Math.floor(profile.distance)}
        </h2>
        <p className="text-gray-600">{profile.relationship_goal}</p>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 p-4 border-t border-gray-100">
        <button
          onClick={handleDislike}
          disabled={dislikeMutation.isPending}
          className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Dislike profile"
        >
          {dislikeMutation.isPending ? "Disliking..." : "Dislike"}
        </button>

        <button
          onClick={handleLike}
          disabled={likeMutation.isPending}
          className="flex-1 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Like profile"
        >
          {likeMutation.isPending ? "Liking..." : "Like"}
        </button>
      </div>

      {/* Error display */}
      {(likeMutation.error || dislikeMutation.error) && (
        <div className="p-4 bg-red-50 text-red-600 text-sm">
          {likeMutation.error?.message || dislikeMutation.error?.message}
        </div>
      )}
    </div>
  );
}
