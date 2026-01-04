"use client";

import { Heart } from "lucide-react";
import { useUser } from "@/hooks/useUser";

import { useCommentLikes } from "@/hooks/useCommentLikes";
import clsx from "clsx";
import { toggleLikeComment } from "./like.actions";

interface CommentLikeButtonProps {
  commentId: string;
  commentOwnerId: string;
  postId: string;
}

export function CommentLikeButton({
  commentId,
  commentOwnerId,
  postId,
}: CommentLikeButtonProps) {
  const { user } = useUser();
  const { likes, isLiked } = useCommentLikes(commentId);

  if (!user) return null;

  const handleToggleLike = async () => {
    await toggleLikeComment({
      commentId,
      commentOwnerId,
      postId,
      user,
      isLiked,
    });
  };

  return (
    <button
      onClick={handleToggleLike}
      className="flex items-center gap-1 text-sm transition"
      title={isLiked ? "Bỏ like" : "Like"}
    >
      <Heart
        size={50}
        className={`cusrsor-pointer transition ${
          isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
        }`}
      />
      {likes.length > 0 && <span className="text-sm">{likes.length}</span>}
    </button>
  );
}
