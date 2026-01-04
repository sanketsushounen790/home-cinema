import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { getWatchlists } from "@/lib/firebase/watchlist";

export function useClientWatchlists() {
  const { user } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["watchlists", user?.uid],
    queryFn: () => {
      if (!user) throw new Error("User not logged in");
      return getWatchlists(user.uid);
    },
    enabled: !!user, // chỉ chạy khi user có
  });

  return { watchlists: data, isLoading, error };
}
