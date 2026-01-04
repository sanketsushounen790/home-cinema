import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { User } from "firebase/auth";

type CreateNotificationParams = {
  userId: string; // chủ comment
  type: "reply" | "like";
  commentId: string;
  postId: string;
  fromUser: User;
  replyId?: string;
};

export async function createNotification({
  userId,
  type,
  commentId,
  postId,
  fromUser,
  replyId, // 👈 OPTIONAL
}: CreateNotificationParams) {
  // 🛑 HARD GUARD
  if (!userId) return;
  if (!fromUser || !fromUser.uid) return;

  // ❌ không tự notify chính mình
  if (userId === fromUser.uid) return;

  await addDoc(collection(db, "notifications"), {
    userId, // 👈 người nhận
    type,
    commentId,
    postId,
    replyId: replyId ?? null, // 👈 thêm nhưng không bắt buộc FE dùng
    // 🔑 QUAN TRỌNG – RULE CẦN FIELD NÀY
    fromUserId: fromUser.uid,
    fromUserName: fromUser.displayName ?? "Anonymous",
    fromUserPhoto: fromUser.photoURL ?? "",
    read: false,
    createdAt: serverTimestamp(),
  });
}
