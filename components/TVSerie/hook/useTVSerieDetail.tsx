import { useQuery } from "@tanstack/react-query";
import { useLanguageStore } from "@/store/useLanguageStore";
import fetchTVSerieDetail from "@/services/TVSerieList/fetchTVSerieDetail";

const useTVSerieDetail = (id: string) => {
  const { language } = useLanguageStore();

  return useQuery({
    queryKey: ["TVSerieDetail", language],
    queryFn: () => fetchTVSerieDetail(language, id),
    staleTime: 3000,
  });
};

export default useTVSerieDetail;
