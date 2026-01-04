import { fetchDiscoverTVByNetwork } from "@/services/Search/fetchDiscoverTV";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDiscoverTVByNetwork(networkId: string, networkName: string) {
  return useInfiniteQuery({
    queryKey: ["discoverTVByNetwork", networkId], // mỗi genre là 1 cache riêng
    queryFn: ({ pageParam = 1 }) =>
      fetchDiscoverTVByNetwork(networkId, networkName, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      // if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
