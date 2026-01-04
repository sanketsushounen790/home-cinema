import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { User } from "firebase/auth";

export async function removeCommentLike({
  commentId,
  user,
}: {
  commentId: string;
  user: User;
}) {
  if (!user?.uid) throw new Error("Unauthenticated");

  const q = query(
    collection(db, "comment_likes"),
    where("commentId", "==", commentId),
    where("userId", "==", user.uid)
  );

  const snap = await getDocs(q);

  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}
