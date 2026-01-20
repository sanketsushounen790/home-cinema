"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { addComment, addReply } from "./comment.actions";

export function CommentForm({
  postId,
  seasonId,
  episodeId,
  parentId,
  onDone,
}: {
  postId: string;
  seasonId?: string;
  episodeId?: string;
  parentId?: string | null;
  onDone?: () => void;
}) {
  const { user } = useUser();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const itemId =
    seasonId && episodeId ? `${postId}_${seasonId}_${episodeId}` : postId;

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);

    if (parentId) {
      await addReply({
        postId: itemId,
        parentId,
        content: text,
        user,
      });
    } else {
      await addComment({
        postId: itemId,
        content: text,
        user,
      });
    }

    setText("");
    setLoading(false);
    onDone?.();
  };

  return (
    <div className="mt-2">
      <textarea
        className="w-full h-[170px] border p-2 rounded mb-2"
        placeholder={parentId ? "Viết trả lời..." : "Viết bình luận..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded"
      >
        {parentId ? "Trả lời" : "Bình luận"}
      </button>
    </div>
  );
}
