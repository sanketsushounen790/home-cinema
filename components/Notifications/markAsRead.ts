import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export async function markNotificationAsRead(id: string) {
  await updateDoc(doc(db, "notifications", id), {
    read: true,
  });
}
