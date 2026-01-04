import fetchOnTheAirTVSeries from "@/services/TVSerieList/fetchOnTheAirTVSeries";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRegionStore } from "@/store/useRegionStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useOnTheAirTVSeries() {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["onTheAirTVSeries", language],
    queryFn: ({ pageParam = 1 }) =>
      fetchOnTheAirTVSeries(language, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
