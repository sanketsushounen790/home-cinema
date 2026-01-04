import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WATCHLIST_ITEMS_QUERY_KEY } from "./useGetWatchlistItems";

export function useAddItemToWatchlist(watchlistId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: WatchlistItem) => {
      const res = await fetch(`/api/watchlists/${watchlistId}/items/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Add item failed");
      }

      return true;
    },

    onSuccess: () => {
      // 🔥 invalidate đúng chỗ
      queryClient.invalidateQueries({
        queryKey: WATCHLIST_ITEMS_QUERY_KEY(watchlistId),
      });

      queryClient.invalidateQueries({
        queryKey: ["itemIndex"],
      });
    },
  });
}
