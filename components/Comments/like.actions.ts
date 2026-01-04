import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { User } from "firebase/auth";

export async function toggleLikeComment({
  commentId,
  commentOwnerId,
  postId,
  user,
  isLiked,
}: {
  commentId: string;
  commentOwnerId: string;
  postId: string;
  user: User;
  isLiked: boolean;
}) {
  if (!user || !user.uid) {
    throw new Error("User not authenticated");
  }

  // Query like của user hiện tại
  const likeQuery = query(
    collection(db, "commentLikes"),
    where("commentId", "==", commentId),
    where("userId", "==", user.uid)
  );

  const snap = await getDocs(likeQuery);

  // ================== UNLIKE ==================
  if (isLiked) {
    // CHỈ XOÁ LIKE — KHÔNG ĐỘNG TỚI NOTIFICATION
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
    return;
  }

  // ================== LIKE ==================
  await addDoc(collection(db, "commentLikes"), {
    commentId,
    userId: user.uid,
    userName: user.displayName ?? "Anonymous",
    userPhoto: user.photoURL ?? "",
    createdAt: serverTimestamp(),
  });

  // 👉 Tạo notification CHỈ KHI KHÔNG PHẢI self-like
  if (commentOwnerId !== user.uid) {
    await addDoc(collection(db, "notifications"), {
      userId: commentOwnerId, // chủ comment
      fromUserId: user.uid, // người like
      type: "like",
      commentId,
      postId,
      read: false,
      createdAt: serverTimestamp(),
    });
  }
}
