import fetchAiringTodayTVSeries from "@/services/TVSerieList/fetchAiringTodayTVSeries";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useQuery } from "@tanstack/react-query";

const useTVSeriesCarousel = () => {
  const { language } = useLanguageStore();

  return useQuery({
    queryKey: ["airingTodayTVSeriesCarousel", language],
    queryFn: () => fetchAiringTodayTVSeries(language, 1),
    staleTime: 5000,
  });
};

export default useTVSeriesCarousel;
