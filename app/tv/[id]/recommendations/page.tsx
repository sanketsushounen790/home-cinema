import RecommendationTVSeries from "@/components/DetailMoreRelate/TVSerie/RecommendationTVSeries";

interface RecommendationTVSeriesPageProps {
  params: {
    id: string;
  };
}

const RecommendationTVSeriesPage = async ({
  params,
}: RecommendationTVSeriesPageProps) => {
  const { id } = await params;
  const tvId = Number(id.split("-")[0]);
  const tvName = id.split("-")[1];

  return <RecommendationTVSeries tvId={tvId} tvName={tvName} />;
};

export default RecommendationTVSeriesPage;
