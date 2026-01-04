import { fetchDiscoverMoviesByGenre } from "@/services/Search/fetchDiscoverMovies";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDiscoverMoviesInGenre(genreId: string, genreName: string) {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["discoverMoviesInGenre", genreId, language], // mỗi genre là 1 cache riêng
    queryFn: ({ pageParam = 1 }) =>
      fetchDiscoverMoviesByGenre(
        genreId,
        genreName,
        String(pageParam),
        language
      ),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
