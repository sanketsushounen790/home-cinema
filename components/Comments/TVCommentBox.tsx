"use client";

import { CommentList } from "./CommentList";

export default function TVCommentBox({
  postId,
  rootCommentId,
  focusCommentId,
}: {
  postId: string;
  rootCommentId?: string;
  focusCommentId?: string;
}) {
  return (
    <div className="w-full px-4 mb-[-35px]">
      <CommentList
        postId={postId}
        focusCommentId={focusCommentId}
        rootCommentId={rootCommentId}
      />
    </div>
  );
}
