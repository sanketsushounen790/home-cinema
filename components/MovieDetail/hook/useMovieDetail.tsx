import fetchMovieDetail from "@/services/MovieDetail/fetchMovieDetail";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useQuery } from "@tanstack/react-query";

const useMovieDetail = (id: string) => {
  const { language } = useLanguageStore();

  return useQuery({
    queryKey: ["movieDetail", id, language],
    queryFn: () => fetchMovieDetail(language, id),
    staleTime: 30000,
  });
};

export default useMovieDetail;
