import fetchPopularMovies from "@/services/MovieList/fetchPopularMovies";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePopularMovies() {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["nowPopularMovies", language], // mỗi genre là 1 cache riêng
    queryFn: ({ pageParam = 1 }) =>
      fetchPopularMovies(language, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      // Nếu API bạn có lastPage.total_pages thì check thêm:
      // if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
