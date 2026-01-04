import fetchUpcomingMovies from "@/services/MovieList/fetchUpcomingMovies";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRegionStore } from "@/store/useRegionStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useUpcomingMovies() {
  const { language } = useLanguageStore();
  const { region } = useRegionStore();

  return useInfiniteQuery({
    queryKey: ["upcomingMovies", language, region], // mỗi genre là 1 cache riêng
    queryFn: ({ pageParam = 1 }) =>
      fetchUpcomingMovies(language, String(pageParam), region),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
