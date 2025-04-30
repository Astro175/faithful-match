

"use client"; 

import { Card } from "@/components/ui/card"; 
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"; 
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from "@/lib/firebase/config"; 
import { Conversation, MatchedUser } from "@/types"; 
import Image from "next/image"; 

// Main component to display each conversation preview
export const ConversationItem = ({
  conversation,
  currentUserId,
}: {
  conversation: Conversation;
  currentUserId: string;
}) => {
  const [matchedUser, setMatchedUser] = useState<MatchedUser>();

  // Get the other user's ID (exclude the current user's ID from the participants array)
  const otherUserId = conversation.participants.find(
    (id) => id !== currentUserId
  )!;

  // Fetch matched user data in real-time using Firestore onSnapshot
  useEffect(() => {
    const userRef = doc(
      db,
      `users/${currentUserId}/matchedUsers/${otherUserId}`
    );

    // Listen for real-time changes to this matched user's profile
    return onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        setMatchedUser(snap.data() as MatchedUser);
      }
    });
  }, [currentUserId, otherUserId]);

  return (
    <Card className="p-4 hover:bg-accent cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12">
          {matchedUser?.profile_img && (
            <Image
              src={matchedUser.profile_img}
              alt={matchedUser.fullName}
              fill
              className="rounded-full object-cover"
              sizes="48px"
            />
          )}
        </div>

        <div className="flex-1">
          {/* Top row: full name + last message date */}
          <div className="flex justify-between">
            <h4 className="font-semibold">{matchedUser?.fullName}</h4>
            <span className="text-sm text-muted-foreground">
              {conversation.lastMessageAt?.toDate().toLocaleDateString()}
            </span>
          </div>

          {/* Bottom row: last message + unread indicator */}
          <div className="flex justify-between">
            <p className="text-sm truncate">{conversation.lastMessage}</p>

            {/* Show unread dot if the conversation has not been read by the current user */}
            {conversation.unreadBy.includes(currentUserId) && (
              <span className="h-2 w-2 bg-primary rounded-full" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
