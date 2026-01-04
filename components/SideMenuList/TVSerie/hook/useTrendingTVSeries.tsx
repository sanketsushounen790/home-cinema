import fetchTrendingTVSeries from "@/services/TVSerieList/fetchTrendingTVSeries";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useTrendingTVSeries(time_window: "day" | "week") {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["trendingTVSeries", language, time_window],
    queryFn: ({ pageParam = 1 }) =>
      fetchTrendingTVSeries(language, String(pageParam), time_window),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
