
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: firebase.firestore.Timestamp;
  unreadBy: string[];
  hiddenFor?: string[];
}
