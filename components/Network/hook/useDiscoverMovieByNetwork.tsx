import { fetchDiscoverMoviesByNetwork } from "@/services/Search/fetchDiscoverMovies";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDiscoverMovieByNetwork(
  networkId: string,
  networkName: string
) {
  return useInfiniteQuery({
    queryKey: ["discoverMovieByNetwork", networkId], // mỗi genre là 1 cache riêng
    queryFn: ({ pageParam = 1 }) =>
      fetchDiscoverMoviesByNetwork(networkId, networkName, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      // if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
