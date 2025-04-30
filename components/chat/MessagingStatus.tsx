
"use client";
import { useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export function MessageStatus({
  conversationId,
  userId,
}: {
  conversationId: string;
  userId: string;
}) {
  useEffect(() => {
    const conversationRef = doc(db, "conversations", conversationId);
    updateDoc(conversationRef, {
      [`readBy.${userId}`]: new Date(),
    });
  }, [conversationId, userId]);

  return null;
}
