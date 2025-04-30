// Location coordinates structure
export interface Location {
  longitude: number;
  latitude: number;
}

// Profile image structure
export interface ProfileImage {
  url: string;
  id: string;
}

// Full profile type definition
export interface Profile {
  _id: string;
  userId: string;
  user_name: string;
  firstName: string;
  lastName: string;
  location: Location;
  sex: string;
  relationship_goal: string;
  interests: string[];
  profile_img: ProfileImage;
  images: ProfileImage[];
  distance: number;
}

// Different like types for API actions
export enum LikeActionType {
  LIKE = "like",
  SUPER_LIKE = "superLike",
  DISLIKE = "dislike",
}

export interface LikeResponse {
  match: boolean;
  like: {
    likerId: string;
    likedId: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface DislikeResponse {
  success: boolean;
  message: string;
}
