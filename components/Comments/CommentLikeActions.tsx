"use client";

import { Heart } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useCommentLikes } from "@/hooks/useCommentLikes";

import clsx from "clsx";
import { addCommentLike, removeCommentLike } from "./commentLikes.actions";

interface Props {
  commentId: string;
  commentOwnerId: string;
  postId: string;
}

export function CommentLikeActions({
  commentId,
  commentOwnerId,
  postId,
}: Props) {
  const { user, loading } = useUser();
  const { likes, isLiked } = useCommentLikes(commentId);

  if (loading || !user) return null;

  const handleAdd = async () => {
    await addCommentLike({
      commentId,
      commentOwnerId,
      postId,
      user,
    });
  };

  const handleRemove = async () => {
    await removeCommentLike({
      commentId,
      user,
    });
  };

  return (
    <div className="flex items-center gap-1">
      {isLiked ? (
        <button onClick={handleRemove} title="Bỏ like">
          <Heart
            size={20}
            className="fill-red-500 text-red-500 cursor-pointer"
          />
        </button>
      ) : (
        <button onClick={handleAdd} title="Like">
          <Heart size={20} className="text-gray-400 cursor-pointer" />
        </button>
      )}

      {likes.length > 0 && <span className="text-sm">{likes.length}</span>}
    </div>
  );
}
