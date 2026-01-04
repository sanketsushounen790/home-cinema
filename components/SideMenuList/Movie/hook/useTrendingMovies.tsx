import fetchTrendingMovies from "@/services/MovieList/fetchTrendingMovies";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useTrendingMovies(time_window: "day" | "week") {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["trendingMovies", language, time_window],
    queryFn: ({ pageParam = 1 }) =>
      fetchTrendingMovies(language, String(pageParam), time_window),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
