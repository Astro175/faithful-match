import {
  collection,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Message } from "@/types";

/**
 * Get a Firestore query for all visible conversations of a user.
 */
export const getConversationsQuery = (userId: string) => {
  return query(
    collection(db, "conversations"),
    where("participants", "array-contains", userId),
    where("hiddenFor", "not-array-contains", userId),
    orderBy("lastMessageAt", "desc")
  );
};

/**
 * Remove a user ID from the unreadBy array — marks the conversation as read for them.
 */
export const markAsRead = async (conversationId: string, userId: string) => {
  const convoRef = doc(db, "conversations", conversationId);
  await updateDoc(convoRef, {
    unreadBy: arrayRemove(userId),
  });
};

/**
 * Send a message in a conversation.
 * Adds the message and updates the conversation metadata in a batch.
 */
export const sendMessage = async (
  conversationId: string,
  message: Omit<Message, "id" | "timestamp">,
  otherUserId: string
) => {
  const batch = writeBatch(db);

  // Reference to the messages subcollection
  const messagesRef = collection(
    db,
    `conversations/${conversationId}/messages`
  );
  const newMessageRef = doc(messagesRef);

  // Add the message
  batch.set(newMessageRef, {
    ...message,
    timestamp: serverTimestamp(),
  });

  // Update conversation metadata
  const convoRef = doc(db, "conversations", conversationId);
  batch.update(convoRef, {
    lastMessage: message.content,
    lastMessageAt: serverTimestamp(),
    unreadBy: arrayUnion(otherUserId),
  });

  await batch.commit();
  return newMessageRef.id;
};

/**
 * Hide a conversation from the current user's view (soft delete).
 */
export const hideConversation = async (
  conversationId: string,
  userId: string
) => {
  const convoRef = doc(db, "conversations", conversationId);
  await updateDoc(convoRef, {
    hiddenFor: arrayUnion(userId),
  });
};
