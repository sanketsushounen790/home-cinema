import DiscoverTVNetwork from "@/components/Network/DiscoverTVNetwork";
import fetchNetworkDetailResult from "@/services/Network/fetchNetworkDetailResult";

interface NetworkPageProps {
  params: {
    id: string;
  };
}

const NetworkPage = async ({ params }: NetworkPageProps) => {
  const { id } = await params;
  const networkId = id.split("-")[0];
  const networkName = id.split("-")[1];
  const type = id.split("-")[2];
  const networkDetail = await fetchNetworkDetailResult(networkId);

  return (
    <DiscoverTVNetwork
      networkId={networkId}
      networkName={networkName}
      networkDetail={networkDetail}
      type={type}
    />
  );
};

export default NetworkPage;
