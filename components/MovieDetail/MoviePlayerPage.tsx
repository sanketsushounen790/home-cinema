import CommentBox from "../Comments/CommentBox";

interface MoviePlayerPageProps {
  movieId: string | number;
  rootCommentId?: string;
  focusCommentId?: string;
}

const MoviePlayerPage = ({
  movieId,
  rootCommentId,
  focusCommentId,
}: MoviePlayerPageProps) => {
  return (
    <div className="w-full h-auto min-h-[100vh] flex flex-col justify-center items-center py-5 px-5">
      {/* PLAYER */}
      <div className="w-full h-auto flex justify-center items-center">
        <div className="w-full max-w-5xl aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.2embed.cc/embed/${movieId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="w-[90%] mt-6">
        <CommentBox
          postId={`movie_${movieId}`}
          focusCommentId={focusCommentId}
          rootCommentId={rootCommentId}
        />
      </div>
    </div>
  );
};

export default MoviePlayerPage;
