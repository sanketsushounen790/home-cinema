// hooks/useGetAllWatchlistsWithItems.ts
import { useQuery } from "@tanstack/react-query";

export interface WatchlistsWithItemsSelected {
  list: WatchlistAllFromFB[];
  map: Record<string, WatchlistAllFromFB>;
}

export const WATCHLISTS_WITH_ITEMS_QUERY_KEY = ["getAllWatchlistsWithItems"];

async function fetchAllWatchlistsWithItems() {
  const res = await fetch("/api/watchlists/get-all", {
    method: "GET",
    credentials: "include",
    cache: "no-cache",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Failed to fetch watchlists with items");
  }

  return res.json() as Promise<WatchlistAllFromFB[]>;
}

export function useGetAllWatchlistsWithItems() {
  return useQuery({
    queryKey: WATCHLISTS_WITH_ITEMS_QUERY_KEY,
    queryFn: fetchAllWatchlistsWithItems,

    select: (list): WatchlistsWithItemsSelected => {
      const map: Record<string, WatchlistAllFromFB> = {};

      for (const wl of list) {
        map[wl.id] = wl;
      }

      return { list, map };
    },

    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}
