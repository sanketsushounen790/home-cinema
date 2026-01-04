import fetchPersonExternalIds from "@/services/Person/fetchPersonExternalIds";

import { useQuery } from "@tanstack/react-query";

const usePersonExternalIds = (id: string) => {
  return useQuery({
    queryKey: ["getPersonExternalIds", id],
    queryFn: () => fetchPersonExternalIds(id),
    staleTime: 50000,
  });
};

export default usePersonExternalIds;
