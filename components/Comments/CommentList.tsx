"use client";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase/client";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";

export function CommentList({
  postId,
  rootCommentId,
  focusCommentId,
}: {
  postId: string;
  rootCommentId?: string;
  focusCommentId?: string;
}) {
  console.log("rootCommentId", rootCommentId);
  console.log("focusCommentId", focusCommentId);
  const [comments, setComments] = useState<any[]>([]);

  /* ================= FETCH ================= */
  useEffect(() => {
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

  /* ================= SCROLL TO FOCUS ================= */
  useEffect(() => {
    if (focusCommentId) {
      document
        .getElementById(`comment-${focusCommentId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focusCommentId]);

  /* ================= NORMAL MODE ================= */
  const rootComments = comments.filter((c) => c.parentId === null);
  const replies = comments.filter((c) => c.parentId !== null);

  /* ================= FOCUS MODE ================= */
  const focusedThread = useMemo(() => {
    if (!rootCommentId) return null;

    const map = new Map<string, any>();
    comments.forEach((c) => map.set(c.id, c));

    const root = map.get(rootCommentId);
    if (!root) return null;

    // 👉 lấy toàn bộ replies (đệ quy)
    const result: any[] = [];
    const queue = [root.id];

    while (queue.length) {
      const currentId = queue.shift()!;
      const children = comments.filter((c) => c.parentId === currentId);

      for (const child of children) {
        result.push(child);
        queue.push(child.id);
      }
    }

    return {
      root,
      replies: result,
    };
  }, [comments, rootCommentId]);

  return (
    <div className="space-y-4">
      <CommentForm postId={postId} />

      <div className="mt-12 space-y-6">
        {/* ================= FOCUS MODE ================= */}
        {focusedThread ? (
          <CommentItem
            comment={focusedThread.root}
            allReplies={focusedThread.replies}
            rootCommentId={rootCommentId}
            focusCommentId={focusCommentId}
          />
        ) : (
          /* ================= NORMAL MODE ================= */
          rootComments.map((c) => (
            <CommentItem key={c.id} comment={c} allReplies={replies} />
          ))
        )}
      </div>
    </div>
  );
}
