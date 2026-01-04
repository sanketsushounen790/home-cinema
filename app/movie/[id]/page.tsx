import MovieDetail from "@/components/MovieDetail/MovieDetail";
import fetchMovieDetail from "@/services/MovieDetail/fetchMovieDetail";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

const MovieDetailPage = async ({ params }: MovieDetailPageProps) => {
  const { id } = await params;

  return <MovieDetail id={id} />;
};

export default MovieDetailPage;
