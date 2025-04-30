import { useEffect } from "react";
import { db } from "@/lib/firebase/config";
import {
  doc,
  onDisconnect,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export function usePresence(userId: string) {
  useEffect(() => {
    const userRef = doc(db, "users", userId);

    const setOnline = () =>
      updateDoc(userRef, {
        isOnline: true,
        lastSeen: serverTimestamp(),
      });

    const setOffline = () =>
      updateDoc(userRef, {
        isOnline: false,
        lastSeen: serverTimestamp(),
      });

    setOnline();
    onDisconnect(userRef).update({
      isOnline: false,
      lastSeen: serverTimestamp(),
    });

    window.addEventListener("beforeunload", setOffline);
    return () => {
      window.removeEventListener("beforeunload", setOffline);
      setOffline();
    };
  }, [userId]);
}
