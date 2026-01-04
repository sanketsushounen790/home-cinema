import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";

export function useUnreadNotificationCount(userId?: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      where("read", "==", false)
    );

    return onSnapshot(q, (snap) => {
      setCount(snap.size);
    });
  }, [userId]);

  return count;
}
