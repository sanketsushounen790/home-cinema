import fetchPersonDetail from "@/services/Person/fetchPersonDetail";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useQuery } from "@tanstack/react-query";

const usePersonDetail = (id: string) => {
  const { language } = useLanguageStore();

  return useQuery({
    queryKey: ["getPersonDetail", id, language],
    queryFn: () => fetchPersonDetail(language, id),
    staleTime: 50000,
  });
};

export default usePersonDetail;
