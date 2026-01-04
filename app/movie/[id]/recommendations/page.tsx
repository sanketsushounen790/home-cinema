import RecommendationMovies from "@/components/DetailMoreRelate/Movie/RecommendationMovies";

interface RecommendationMoviesPageProps {
  params: {
    id: string;
  };
}

const RecommendationMoviesPage = async ({
  params,
}: RecommendationMoviesPageProps) => {
  const { id } = await params;
  const movieId = Number(id.split("-")[0]);
  const movieName = id.split("-")[1];

  return <RecommendationMovies movieId={movieId} movieName={movieName} />;
};

export default RecommendationMoviesPage;
