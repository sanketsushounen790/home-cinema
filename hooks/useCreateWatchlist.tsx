import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WATCHLISTS_SUMMARY_QUERY_KEY } from "./useGetWatchlistsSummary";

export function useCreateWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch("/api/watchlists/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
        cache: "no-cache",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Create watchlist failed");
      }

      return res.json();
    },

    onSuccess: (newWatchlist) => {
      // 1️⃣ Update cache ngay lập tức
      queryClient.setQueryData<WatchlistSummary[]>(
        WATCHLISTS_SUMMARY_QUERY_KEY,
        (old) => {
          if (!old) return [newWatchlist];
          return [newWatchlist, ...old];
        }
      );

      // 2️⃣ Refetch ngầm để sync server
      queryClient.invalidateQueries({
        queryKey: WATCHLISTS_SUMMARY_QUERY_KEY,
      });
    },
  });
}
