import { Timestamp } from "firebase/firestore";


export type ProfessionalDetails = {
  occupation: string;
  company?: string;
};

export type MatchedUser = {
  userId: string;
  fullName: string;
  profile_img: string;
  sex: string;
  dob: string;
  relationship_goal: string;
  interests: string[];
  professional: ProfessionalDetails;
  matchedAt: Timestamp;
};

export type Conversation = {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: Timestamp;
  unreadBy: string[];
  hiddenFor: string[];
};

export type Message = {
  id?: string;
  senderId: string;
  content: string;
  timestamp: Timestamp;
  readAt?:  Timestamp;
};
