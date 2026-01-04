import fetchTopRatedMovies from "@/services/MovieList/fetchTopRatedMovies";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useTopRatedMovies() {
  const { language } = useLanguageStore();

  return useInfiniteQuery({
    queryKey: ["topRatedMovies", language], // mỗi genre là 1 cache riêng
    queryFn: ({ pageParam = 1 }) =>
      fetchTopRatedMovies(language, String(pageParam)),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },

    initialPageParam: 1,
  });
}
