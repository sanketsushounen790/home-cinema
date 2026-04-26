import fetchTVSerieAggregateCredits from "@/services/TVSerieList/fetchTVSerieAggregateCredits";
import { useQuery } from "@tanstack/react-query";

const useTVSerieAggregateCredits = (id: string) => {
  return useQuery({
    queryKey: ["TVSerieAggregateCredits"],
    queryFn: () => fetchTVSerieAggregateCredits(id),
    staleTime: 3000,
  });
};

export default useTVSerieAggregateCredits;
