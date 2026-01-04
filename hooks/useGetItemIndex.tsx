import { useQuery } from "@tanstack/react-query";

export const ITEM_INDEX_QUERY_KEY = ["itemIndex"];

async function fetchItemIndex() {
  const res = await fetch("/api/watchlists/item-index/get", {
    method: "GET",
    credentials: "include",
    cache: "no-cache",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Failed to fetch item index");
  }

  return res.json() as Promise<Record<string, ItemIndex>>;
}

export function useGetItemIndex(enabled = true) {
  return useQuery({
    queryKey: ITEM_INDEX_QUERY_KEY,
    queryFn: fetchItemIndex,
    enabled,

    // 🔥 tối ưu cho modal
    staleTime: 1000 * 60 * 5, // 5 phút
    refetchOnWindowFocus: false,
  });
}
