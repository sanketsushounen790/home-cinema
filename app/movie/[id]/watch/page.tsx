import MoviePlayerPage from "@/components/MovieDetail/MoviePlayerPage";

interface MovieWatchPageProps {
  params: {
    id: string;
  };
  searchParams?: Promise<{
    comment?: string;
  }>;
}

const MovieWatchPage = async ({
  params,
  searchParams,
}: MovieWatchPageProps) => {
  const { id } = await params;

  let focusCommentId: string | undefined;
  let rootCommentId: string | undefined;

  if (searchParams) {
    const { comment } = await searchParams;

    if (comment) {
      const [commentId, replyId] = comment.split("_");
      focusCommentId = replyId;
      rootCommentId = commentId;
    }
  }
  return (
    <MoviePlayerPage
      movieId={id}
      focusCommentId={focusCommentId}
      rootCommentId={rootCommentId}
    />
  );
};

export default MovieWatchPage;
