import { fetchDiscoverTVByCompany } from "@/services/Search/fetchDiscoverTV";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDiscoverTVByCompany(companyId: string, companyName: string) {
  return useInfiniteQuery({
    queryKey: ["discoverTVByCompany", companyId], // mỗi genre là 1 cache riêng
    queryFn: ({ pageParam = 1 }) =>
      fetchDiscoverTVByCompany(companyId, companyName, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      // if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
