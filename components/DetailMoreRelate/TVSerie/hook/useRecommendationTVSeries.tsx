import fetchTVSerieRecommendations from "@/services/TVSerieList/fetchTVSerieRecommendations";
import { useInfiniteQuery } from "@tanstack/react-query";

interface useRecommendationTVSeriesProps {
  tvId: number;
}

export function useRecommendationTVSeries({
  tvId,
}: useRecommendationTVSeriesProps) {
  return useInfiniteQuery({
    queryKey: ["recommendationTVSeries", tvId],
    queryFn: ({ pageParam = 1 }) =>
      fetchTVSerieRecommendations("en-US", tvId, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (allPages.length >= lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
