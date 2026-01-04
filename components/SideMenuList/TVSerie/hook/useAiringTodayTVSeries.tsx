import fetchAiringTodayTVSeries from "@/services/TVSerieList/fetchAiringTodayTVSeries";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRegionStore } from "@/store/useRegionStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useAiringTodayTVSeries() {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["airingTodayTVSeries", language],
    queryFn: ({ pageParam = 1 }) =>
      fetchAiringTodayTVSeries(language, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
