// hooks/useUpdateWatchlist.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WATCHLISTS_SUMMARY_QUERY_KEY } from "./useGetWatchlistsSummary";

interface UpdateWatchlistPayload {
  watchlistId: string;
  title: string;
}

export function useUpdateWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ watchlistId, title }: UpdateWatchlistPayload) => {
      const res = await fetch("/api/watchlists/update", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watchlistId, title }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Update watchlist failed");
      }

      return true;
    },
    onMutate: async ({ watchlistId, title }) => {
      await queryClient.cancelQueries({
        queryKey: WATCHLISTS_SUMMARY_QUERY_KEY,
      });

      const prev = queryClient.getQueryData<any>(WATCHLISTS_SUMMARY_QUERY_KEY);

      if (prev?.list && prev?.map) {
        const next = {
          list: prev.list.map((w: any) =>
            w.id === watchlistId ? { ...w, title } : w
          ),
          map: {
            ...prev.map,
            [watchlistId]: {
              ...prev.map[watchlistId],
              title,
            },
          },
        };

        queryClient.setQueryData(WATCHLISTS_SUMMARY_QUERY_KEY, next);
      }

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(WATCHLISTS_SUMMARY_QUERY_KEY, ctx.prev);
      }
    },

    onSuccess: () => {
      // 🔥 invalidate summary (list + map đều refresh)
      queryClient.invalidateQueries({
        queryKey: WATCHLISTS_SUMMARY_QUERY_KEY,
      });
    },
  });
}
