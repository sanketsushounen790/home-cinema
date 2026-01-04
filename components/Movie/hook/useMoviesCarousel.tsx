import fetchNowPlayingMovies from "@/services/MovieList/fetchNowPlayingMovies";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRegionStore } from "@/store/useRegionStore";
import { useQuery } from "@tanstack/react-query";

const useMoviesCarousel = () => {
  const { language } = useLanguageStore();
  const { region } = useRegionStore();

  return useQuery({
    queryKey: ["nowPlayingMoviesCarousel", language, region],
    queryFn: () => fetchNowPlayingMovies(language, 1, region),
    staleTime: 5000,
  });
};

export default useMoviesCarousel;
