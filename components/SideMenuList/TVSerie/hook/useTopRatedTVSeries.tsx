import fetchTopRatedTVSeries from "@/services/TVSerieList/fetchTopRatedTVSeries";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useTopRatedTVSeries() {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["topRatedTVSeries", language],
    queryFn: ({ pageParam = 1 }) =>
      fetchTopRatedTVSeries(language, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
