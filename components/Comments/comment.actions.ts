import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { User } from "firebase/auth";
import { createNotification } from "../Notifications/notification.actions";

/* ================= ADD COMMENT GỐC ================= */
/* ❗ Không tạo notification vì không có ai là chủ */
export async function addComment({
  postId,
  content,
  user,
}: {
  postId: string;
  content: string;
  user: User;
}) {
  return addDoc(collection(db, "comments"), {
    postId,
    parentId: null,
    content,
    userId: user.uid,
    userName: user.displayName ?? "Anonymous",
    userPhoto: user.photoURL ?? "",
    createdAt: serverTimestamp(),
  });
}

/* ================= ADD REPLY ================= */
// export async function addReply({
//   postId,
//   parentId,
//   content,
//   user,
// }: {
//   postId: string;
//   parentId: string;
//   content: string;
//   user: User;
// }) {
//   // 1️⃣ Lấy comment cha để biết CHỦ comment
//   const parentRef = doc(db, "comments", parentId);
//   const parentSnap = await getDoc(parentRef);

//   if (!parentSnap.exists()) {
//     throw new Error("Parent comment not found");
//   }

//   const parentComment = parentSnap.data();

//   // 2️⃣ Tạo reply
//   const replyRef = await addDoc(collection(db, "comments"), {
//     postId,
//     parentId,
//     content,
//     userId: user.uid,
//     userName: user.displayName ?? "Anonymous",
//     userPhoto: user.photoURL ?? "",
//     createdAt: serverTimestamp(),
//   });

//   // 🚑 bảo vệ
//   if (!parentComment.userId) return;

//   // 3️⃣ Tạo notification cho CHỦ comment cha
//   if (parentComment.userId !== user.uid) {
//     await createNotification({
//       userId: parentComment.userId, // 👈 người nhận
//       type: "reply",
//       commentId: parentId,
//       postId,
//       fromUser: user,
//     });
//   }

//   return replyRef;
// }
/* ================= ADD REPLY ================= */
export async function addReply({
  postId,
  parentId,
  content,
  user,
}: {
  postId: string;
  parentId: string;
  content: string;
  user: User;
}) {
  // 1️⃣ Lấy comment cha
  const parentRef = doc(db, "comments", parentId);
  const parentSnap = await getDoc(parentRef);

  if (!parentSnap.exists()) {
    throw new Error("Parent comment not found");
  }

  const parentComment = parentSnap.data();

  // 2️⃣ Tạo reply
  const replyRef = await addDoc(collection(db, "comments"), {
    postId,
    parentId,
    content,
    userId: user.uid,
    userName: user.displayName ?? "Anonymous",
    userPhoto: user.photoURL ?? "",
    createdAt: serverTimestamp(),
  });

  // 🚑 bảo vệ
  if (!parentComment.userId) return replyRef;

  // 3️⃣ Tạo notification cho CHỦ comment cha
  if (parentComment.userId !== user.uid) {
    await createNotification({
      userId: parentComment.userId, // người nhận
      type: "reply",
      postId,
      commentId: parentId, // comment cha
      replyId: replyRef.id, // 🔥 BẮT BUỘC
      fromUser: user, // 🔥 để có avatar
    });
  }

  return replyRef;
}

/* ================= DELETE COMMENT CASCADE ================= */
export async function deleteCommentCascade({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) {
  const res = await fetch("/api/comments/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      commentId,
      userId,
    }),
  });

  if (!res.ok) {
    throw new Error("Delete comment failed");
  }

  return res.json();
}

export async function softDeleteComment(commentId: string) {
  const ref = doc(db, "comments", commentId);

  await updateDoc(ref, {
    content: "",
    deleted: true,
    deletedAt: serverTimestamp(),
  });
}
