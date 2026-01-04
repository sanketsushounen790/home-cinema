import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WATCHLIST_ITEMS_QUERY_KEY } from "./useGetWatchlistItems";

export function useRemoveItemFromWatchlist(watchlistId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const res = await fetch(`/api/watchlists/${watchlistId}/items/remove`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Remove item failed");
      }

      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: WATCHLIST_ITEMS_QUERY_KEY(watchlistId),
      });

      queryClient.invalidateQueries({
        queryKey: ["itemIndex"],
      });
    },
  });
}
