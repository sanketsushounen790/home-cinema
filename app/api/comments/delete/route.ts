import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  const { commentId, userId } = await req.json();

  if (!commentId || !userId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 1️⃣ Lấy comment cha
  const commentRef = adminDb.collection("comments").doc(commentId);
  const commentSnap = await commentRef.get();

  if (!commentSnap.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 2️⃣ Check quyền
  if (commentSnap.data()?.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3️⃣ XOÁ COMMENT CHA (response sớm)
  await commentRef.delete();

  // 4️⃣ CLEANUP BACKGROUND (KHÔNG await)
  // cleanup background (đệ quy)
  cleanupCommentTreeRecursive(commentId).catch(console.error);

  return NextResponse.json({ success: true });
}

async function cleanupCommentTree(parentCommentId: string) {
  const batch = adminDb.batch();

  // ========================
  // 1️⃣ XOÁ LIKES COMMENT CHA
  // ========================
  const parentLikesSnap = await adminDb
    .collection("comment_likes")
    .where("commentId", "==", parentCommentId)
    .get();

  parentLikesSnap.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // ========================
  // 2️⃣ LẤY REPLY CON
  // ========================
  const repliesSnap = await adminDb
    .collection("comments")
    .where("parentId", "==", parentCommentId)
    .get();

  for (const reply of repliesSnap.docs) {
    const replyId = reply.id;

    // xoá reply
    batch.delete(reply.ref);

    // ========================
    // 3️⃣ XOÁ LIKES CỦA REPLY
    // ========================
    const replyLikesSnap = await adminDb
      .collection("comment_likes")
      .where("commentId", "==", replyId)
      .get();

    replyLikesSnap.docs.forEach((like) => {
      batch.delete(like.ref);
    });
  }

  await batch.commit();
}

async function collectAllDescendantComments(
  rootCommentId: string
): Promise<string[]> {
  const result: string[] = [];
  const stack = [rootCommentId];

  while (stack.length > 0) {
    const currentId = stack.pop()!;
    result.push(currentId);

    const childrenSnap = await adminDb
      .collection("comments")
      .where("parentId", "==", currentId)
      .get();

    for (const child of childrenSnap.docs) {
      stack.push(child.id);
    }
  }

  return result;
}

async function cleanupCommentTreeRecursive(rootCommentId: string) {
  // 1️⃣ Lấy toàn bộ commentId trong cây
  const allCommentIds = await collectAllDescendantComments(rootCommentId);

  // 2️⃣ Xoá likes (theo từng commentId)
  const batch = adminDb.batch();
  let opCount = 0;

  for (const commentId of allCommentIds) {
    const likesSnap = await adminDb
      .collection("comment_likes")
      .where("commentId", "==", commentId)
      .get();

    for (const like of likesSnap.docs) {
      batch.delete(like.ref);
      opCount++;
    }

    // xoá comment (trừ root nếu đã xoá trước)
    if (commentId !== rootCommentId) {
      const commentRef = adminDb.collection("comments").doc(commentId);
      batch.delete(commentRef);
      opCount++;
    }

    // 🚑 Firestore batch giới hạn 500 ops
    if (opCount >= 450) {
      await batch.commit();
      opCount = 0;
    }
  }

  if (opCount > 0) {
    await batch.commit();
  }
}
