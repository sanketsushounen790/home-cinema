import fetchTVSerieSimilars from "@/services/TVSerieList/fetchTVSerieSimilars";
import { useInfiniteQuery } from "@tanstack/react-query";

interface useSimilarTVSeriesProps {
  tvId: number;
}

export function useSimilarTVSeries({ tvId }: useSimilarTVSeriesProps) {
  return useInfiniteQuery({
    queryKey: ["similarTVSeries", tvId],
    queryFn: ({ pageParam = 1 }) =>
      fetchTVSerieSimilars("en-US", tvId, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (allPages.length >= lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
