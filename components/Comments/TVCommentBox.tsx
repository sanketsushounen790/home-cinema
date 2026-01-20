"use client";

import { useUser } from "@/hooks/useUser";
import { CommentList } from "./CommentList";

export default function TVCommentBox({
  postId,
  seasonId,
  episodeId,
  rootCommentId,
  focusCommentId,
}: {
  postId: string;
  seasonId: string;
  episodeId: string;
  rootCommentId?: string;
  focusCommentId?: string;
}) {
  const { user } = useUser();

  return (
    <div className="w-full px-4 mb-[-35px]">
      {user ? (
        <CommentList
          postId={postId}
          seasonId={seasonId}
          episodeId={episodeId}
          focusCommentId={focusCommentId}
          rootCommentId={rootCommentId}
        />
      ) : (
        <textarea
          className="w-full h-auto min-h-[170px] border p-2 rounded"
          placeholder={"Đăng nhập để bình luận..."}
          disabled
        />
      )}
    </div>
  );
}
