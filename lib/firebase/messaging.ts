// 7. FCM Setup - lib/firebase/messaging.ts
import { messaging } from "@/lib/firebase/config";
import { getToken } from "firebase/messaging";
import { updateDoc, doc,  arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function getFCMToken(userId: string) {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging);
      await updateDoc(doc(db, "users", userId), {
        fcmTokens: arrayUnion(token),
      });
      return token;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
}
