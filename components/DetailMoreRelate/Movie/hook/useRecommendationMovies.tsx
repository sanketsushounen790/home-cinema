import fetchMovieRecommendations from "@/services/MovieDetail/fetchMovieRecommendations";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

interface useSimilarMoviesProps {
  movieId: number;
}

export function useRecommendationMovies({ movieId }: useSimilarMoviesProps) {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["recommendationMovies", movieId, language],
    queryFn: ({ pageParam = 1 }) =>
      fetchMovieRecommendations(language, movieId, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      if (allPages.length >= lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
