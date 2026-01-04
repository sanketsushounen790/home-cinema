import {
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/client";
import { User } from "firebase/auth";
import { createNotification } from "../Notifications/notification.actions";

export async function addCommentLike({
  commentId,
  commentOwnerId,
  postId,
  user,
}: {
  commentId: string;
  commentOwnerId: string;
  postId: string;
  user: User;
}) {
  if (!user?.uid) throw new Error("Unauthenticated");

  // 1️⃣ Check duplicate like
  const q = query(
    collection(db, "comment_likes"),
    where("commentId", "==", commentId),
    where("userId", "==", user.uid)
  );

  const snap = await getDocs(q);
  if (!snap.empty) return;

  // 2️⃣ Tạo like
  await addDoc(collection(db, "comment_likes"), {
    commentId,
    userId: user.uid,
    userName: user.displayName ?? "Anonymous",
    userPhoto: user.photoURL || null,
    createdAt: serverTimestamp(),
  });

  // 3️⃣ Tạo notification (GIỐNG REPLY)
  if (commentOwnerId !== user.uid) {
    await createNotification({
      userId: commentOwnerId,
      type: "like",
      commentId,
      postId,
      fromUser: user, // 🔥 avatar có từ đây
    });
  }
}

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
