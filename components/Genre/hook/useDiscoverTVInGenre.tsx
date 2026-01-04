import { fetchDiscoverTVByGenre } from "@/services/Search/fetchDiscoverTV";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDiscoverTVInGenre(genreId: string, genreName: string) {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["discoverTVInGenre", genreId, language], // mỗi genre là 1 cache riêng
    queryFn: ({ pageParam = 1 }) =>
      fetchDiscoverTVByGenre(genreId, genreName, String(pageParam), language),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
