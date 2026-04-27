import WatchListAlltems from "@/components/WatchList/WatchListAlltems";

interface WatchListPageProps {
  params: {
    id: string;
  };
}

const WatchListPage = async ({ params }: WatchListPageProps) => {
  const { id } = await params;

  return <WatchListAlltems watchlistId={id} />;
};

export default WatchListPage;
