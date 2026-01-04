import SimilarMovies from "@/components/DetailMoreRelate/Movie/SimilarMovies";

interface SimilarMoviesPageProps {
  params: {
    id: string;
  };
}

const SimilarMoviesPage = async ({ params }: SimilarMoviesPageProps) => {
  const { id } = await params;
  const movieId = Number(id.split("-")[0]);
  const movieName = id.split("-")[1];

  return <SimilarMovies movieId={movieId} movieName={movieName} />;
};

export default SimilarMoviesPage;
