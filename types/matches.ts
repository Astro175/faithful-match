export interface Match {
    _id: string;
    userId: string;
    user_name: string;
    firstName: string;
    lastName: string;
    location: {
      longitude: number;
      latitude: number;
    };
    sex: string;
    relationship_goal: string;
    interests: string[];
    profile_img: {
      url: string;
      id: string;
    };
    images: Array<{
      url: string;
      id: string;
    }>;
    distance: number;
    distanceScore: number;
    goalsScore: number;
    interestScore: number;
    totalScore: number;
  }
  
  export interface LikeResponse {
    match: boolean;
    like: {
      likerId: string;
      likedId: string;
      status: "pending" | "matched";
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
    message: string;
  }
  
  export interface DislikeResponse {
    dislike: {
      likerId: string;
      likedId: string;
      status: "dislike";
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
    message: string;
  }