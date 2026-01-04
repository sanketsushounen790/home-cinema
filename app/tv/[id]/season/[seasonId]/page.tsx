import SeasonDetail from "@/components/TVSerie/SeasonDetail";

interface SeasonDetailPageProps {
  params: {
    id: string;
    seasonId: string;
  };
}

const SeasonDetailPage = async ({ params }: SeasonDetailPageProps) => {
  const { id, seasonId } = await params;

  return <SeasonDetail tvId={id} seasonId={seasonId} />;
};

export default SeasonDetailPage;
