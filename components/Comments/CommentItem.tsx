"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useUser } from "@/hooks/useUser";
import { CommentForm } from "./CommentForm";
import formatFirestoreTimestamp from "@/utils/formatFirestoreTimestamp";

import { LikedUsers } from "./LikedUsers";
import Image from "next/image";
import { CommentLikeActions } from "./CommentLikeActions";
import { softDeleteComment } from "./comment.actions";

export function CommentItem({
  comment,
  allReplies,
  rootCommentId,
  focusCommentId,
}: {
  comment: any;
  allReplies: any[];
  rootCommentId?: string;
  focusCommentId?: string;
}) {
  //const isFocusThread = comment.id === rootCommentId;
  const isHighlight = focusCommentId
    ? comment.id === focusCommentId
    : comment.id === rootCommentId;

  const { user } = useUser();
  const isOwner = user?.uid === comment.userId;

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content);
  const [replyOpen, setReplyOpen] = useState(false);

  const childReplies = allReplies.filter((r) => r.parentId === comment.id);
  const isChildren = comment.parentId !== null;

  const handleDelete = async () => {
    if (!confirm("Xoá comment này?")) return;

    softDeleteComment(comment.id);
  };

  // const handleDelete = async () => {
  //   await deleteDoc(doc(db, "comments", comment.id));
  // };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "comments", comment.id), {
      content: text,
      updatedAt: new Date(),
    });
    setEditing(false);
  };

  return (
    <div id={`comment-${comment.id}`} className={`border-l-1`}>
      {isChildren && !isHighlight && (
        <div className="w-12 flex items-center justify-center border-t-1 ml-[-41px]"></div>
      )}

      <div className={`${isHighlight ? "bg-blue-100" : ""}`}>
        <div className="flex items-center gap-2 ml-[-25px] mt-[-25px]">
          <Image
            src={comment.userPhoto}
            width={50}
            height={50}
            alt="avatar"
            loading="lazy"
            className="rounded-full"
          />
          <div className="flex flex-col items-start justify-center">
            <span className="font-medium">{comment.userName}</span>
            <span className="text-sm">
              {formatFirestoreTimestamp(comment.createdAt)}
            </span>
          </div>
        </div>

        <div className={`pt-2 pb-2 mb-10`}>
          {comment.deleted ? (
            <div className="italic text-sm text-gray-500 p-2 ml-4 bg-base-300 shadow-xl">
              Bình luận đã bị xoá
            </div>
          ) : (
            <div className="p-2 ml-4 bg-base-300 shadow-xl">
              {!editing ? (
                <p className="h-[50px] flex items-start justify-start">
                  {comment.content}
                </p>
              ) : (
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full border p-2"
                />
              )}

              <div className="flex gap-3 text-sm">
                <div className="flex gap-4 text-sm mt-2">
                  <CommentLikeActions
                    commentId={comment.id}
                    commentOwnerId={comment.userId} // 👈 BẮT BUỘC
                    postId={comment.postId}
                  />
                </div>

                <LikedUsers commentId={comment.id} />

                {user && user.uid !== comment.userId && (
                  <button
                    onClick={() => setReplyOpen(!replyOpen)}
                    className="cursor-pointer hover:bg-gray-300 px-1"
                  >
                    Trả lời
                  </button>
                )}

                {isOwner && !editing && (
                  <>
                    <button
                      onClick={() => setEditing(true)}
                      className="cursor-pointer hover:bg-gray-300 px-1"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={handleDelete}
                      className="cursor-pointer text-red-500 hover:bg-gray-300 px-1"
                    >
                      Xoá
                    </button>
                  </>
                )}

                {editing && (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded"
                    >
                      Huỷ
                    </button>
                  </>
                )}
              </div>

              {replyOpen && (
                <CommentForm
                  postId={comment.postId}
                  parentId={comment.id}
                  onDone={() => setReplyOpen(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🔁 RECURSIVE REPLIES */}
      {childReplies.length > 0 && (
        <div className="pl-10">
          {childReplies.map((r) => (
            <CommentItem
              key={r.id}
              comment={r}
              allReplies={allReplies}
              focusCommentId={focusCommentId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
