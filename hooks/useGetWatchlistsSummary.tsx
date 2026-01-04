import { useQuery } from "@tanstack/react-query";

export const WATCHLISTS_SUMMARY_QUERY_KEY = ["getWatchlistsSummary"];

async function fetchWatchlistsSummary() {
  const res = await fetch("/api/watchlists/get", {
    method: "GET",
    credentials: "include", // ⚠️ quan trọng để gửi cookie
    cache: "no-cache",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to fetch watchlists");
  }

  return res.json() as Promise<WatchlistSummary[]>;
}

export function useGetWatchlistsSummary(isLoggedIn: boolean) {
  return useQuery({
    queryKey: WATCHLISTS_SUMMARY_QUERY_KEY,
    queryFn: fetchWatchlistsSummary,

    // ❌ Tắt mọi refetch tự động
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    enabled: isLoggedIn,
    select: (list): WatchlistsSummarySelected => {
      const map: Record<string, WatchlistSummary> = {};

      for (const item of list) {
        map[item.id] = item;
      }

      return {
        list,
        map,
      };
    },
  });
}
