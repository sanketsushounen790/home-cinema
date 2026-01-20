"use client";

import { useUser } from "@/hooks/useUser";
import { CommentList } from "./CommentList";

export default function CommentBox({
  postId,
  rootCommentId,
  focusCommentId,
}: {
  postId: string;
  rootCommentId?: string;
  focusCommentId?: string;
}) {
  const { user } = useUser();

  return (
    <div className="">
      <h3 className="text-lg font-semibold">Comments</h3>

      {user ? (
        <CommentList
          postId={postId}
          focusCommentId={focusCommentId}
          rootCommentId={rootCommentId}
        />
      ) : (
        <textarea
          className="w-full h-[170px] border p-2 rounded mb-2"
          placeholder={"Đăng nhập để bình luận..."}
          disabled
        />
      )}
    </div>
  );
}
