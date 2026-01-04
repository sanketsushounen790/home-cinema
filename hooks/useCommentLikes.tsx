import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { useUser } from "@/hooks/useUser";

export function useCommentLikes(commentId: string) {
  const { user } = useUser();
  const [likes, setLikes] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!commentId) return;

    const q = query(
      collection(db, "comment_likes"),
      where("commentId", "==", commentId)
    );

    return onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => d.data());
      setLikes(data);

      if (user) {
        setIsLiked(data.some((l) => l.userId === user.uid));
      }
    });
  }, [commentId, user?.uid]);

  return { likes, isLiked };
}
