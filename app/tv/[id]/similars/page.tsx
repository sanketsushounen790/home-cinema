import SimilarTVSeries from "@/components/DetailMoreRelate/TVSerie/SimilarTVSeries";

interface SimilarTVSeriesPageProps {
  params: {
    id: string;
  };
}

const SimilarTVSeriesPage = async ({ params }: SimilarTVSeriesPageProps) => {
  const { id } = await params;
  const tvId = Number(id.split("-")[0]);
  const tvName = id.split("-")[1];

  return <SimilarTVSeries tvId={tvId} tvName={tvName} />;
};

export default SimilarTVSeriesPage;
