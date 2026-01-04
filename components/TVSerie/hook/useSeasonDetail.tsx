import fetchSeasonDetail from "@/services/TVSerieList/fetchSeasonDetail";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useQuery } from "@tanstack/react-query";

const useSeasonDetail = (id: string, seasonId: string) => {
  const { language } = useLanguageStore();

  return useQuery({
    queryKey: ["getSeasonDetail", id, seasonId, language],
    queryFn: () => fetchSeasonDetail(id, seasonId, language),
    staleTime: 5000,
  });
};

export default useSeasonDetail;
