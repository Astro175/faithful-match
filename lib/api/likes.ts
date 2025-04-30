import { LikeResponse, DislikeResponse, Profile } from "@/types/profiles";
export const handleLike = async (
  likerId: string,
  likedId: string
): Promise<LikeResponse> => {
  const url = `http://localhost:4000/api/likes/like?likerId=${likerId}&likedId=${likedId}`;
  const res = await fetch(url, { method: "POST" });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Like failed");
  }

  return res.json();
};

export const handleDislike = async (
  dislikerId: string,
  dislikedId: string
): Promise<DislikeResponse> => {
  const url = `http://localhost:4000/api/likes/dislike?dislikerId=${dislikerId}&dislikedId=${dislikedId}`;
  const res = await fetch(url, { method: "POST" });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Dislike failed");
  }

  return res.json();
};
export const undoDislike = async (
  dislikerId: string,
  dislikedId: string
): Promise<Profile> => {
  const url = `http://localhost:4000/api/likes/undo-dislike?dislikerId=${dislikerId}&dislikedId=${dislikedId}`;
  const res = await fetch(url, { method: "POST" });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to undo dislike");
  }

  return res.json();
};
