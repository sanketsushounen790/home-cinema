import fetchNowPlayingMovies from "@/services/MovieList/fetchNowPlayingMovies";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRegionStore } from "@/store/useRegionStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useNowPlayingMovies() {
  const { region } = useRegionStore();
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["nowPlayingMovies", language, region],
    queryFn: ({ pageParam = 1 }) =>
      fetchNowPlayingMovies(language, String(pageParam), region),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
