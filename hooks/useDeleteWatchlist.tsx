import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WATCHLISTS_SUMMARY_QUERY_KEY } from "./useGetWatchlistsSummary";
import { WATCHLISTS_WITH_ITEMS_QUERY_KEY } from "./useGetAllWatchlistsWithItems";

export function useDeleteWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (watchlistId: string) => {
      const res = await fetch(`/api/watchlists/${watchlistId}/delete`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Delete watchlist failed");
      }

      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: WATCHLISTS_WITH_ITEMS_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: WATCHLISTS_SUMMARY_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["itemIndex"],
      });
    },
  });
}
