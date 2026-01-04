import { useQuery } from "@tanstack/react-query";

export const WATCHLIST_ITEMS_QUERY_KEY = (watchlistId: string) => [
  "getWatchlistItems",
  watchlistId,
];

async function fetchWatchlistItems(watchlistId: string) {
  const res = await fetch(`/api/watchlists/${watchlistId}/items/get`, {
    method: "GET",
    credentials: "include", // 🔥 bắt buộc để gửi cookie
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to fetch watchlist items");
  }

  return res.json() as Promise<WatchlistItem[]>;
}

export function useGetWatchlistItems(watchlistId?: string) {
  return useQuery({
    queryKey: watchlistId ? WATCHLIST_ITEMS_QUERY_KEY(watchlistId) : [],
    queryFn: () => fetchWatchlistItems(watchlistId!),

    // 🔥 chỉ fetch khi có watchlistId
    enabled: !!watchlistId,

    // optimize
    staleTime: 1000 * 30, // 30s (items hay thay đổi hơn summary)
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
