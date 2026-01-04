import WatchListIAlltems from "@/components/WatchList/WatchListIAlltems";

interface WatchListPageProps {
  params: {
    id: string;
  };
}

const WatchListPage = async ({ params }: WatchListPageProps) => {
  const { id } = await params;

  return <WatchListIAlltems watchlistId={id} />;
};

export default WatchListPage;
