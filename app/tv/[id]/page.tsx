import TVSerieDetail from "@/components/TVSerie/TVSerieDetail";
import fetchTVSerieAggregateCredits from "@/services/TVSerieList/fetchTVSerieAggregateCredits";
import fetchTVSerieDetail from "@/services/TVSerieList/fetchTVSerieDetail";

interface TVSerieDetailPageProps {
  params: {
    id: string;
  };
}

const TVSerieDetailPage = async ({ params }: TVSerieDetailPageProps) => {
  const { id } = await params;
  const result = await fetchTVSerieDetail("en-US", id);
  const credits = await fetchTVSerieAggregateCredits(id);

  console.log(credits);

  return <TVSerieDetail tvId={id} credits={credits} />;
};

export default TVSerieDetailPage;
