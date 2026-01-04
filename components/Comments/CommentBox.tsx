"use client";

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
  return (
    <div className="">
      <h3 className="text-lg font-semibold">Comments</h3>

      <CommentList
        postId={postId}
        focusCommentId={focusCommentId}
        rootCommentId={rootCommentId}
      />
    </div>
  );
}
