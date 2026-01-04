"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export function useComments(postId: string) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (!postId) return;

    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "asc")
    );

    return onSnapshot(q, (snap) => {
      setComments(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });
  }, [postId]);

  return comments;
}
