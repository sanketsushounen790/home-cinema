import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { WATCHLIST_ITEMS_QUERY_KEY } from "@/hooks/useGetWatchlistItems";
import { useCurrentWatchlistStore } from "@/store/useCurrentWatchlistStore";

export function useWatchlistRefetchOnBack(watchlistId?: string) {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { swapWithPrevious } = useCurrentWatchlistStore();

  const isPopStateRef = useRef(false);

  // ✅ bắt browser back / forward (đúng lifecycle)
  useEffect(() => {
    const onPopState = () => {
      isPopStateRef.current = true;
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    // 1️⃣ nếu là back / forward → restore trước

    swapWithPrevious();

    // 2️⃣ rồi mới invalidate items
    if (watchlistId) {
      queryClient.invalidateQueries({
        queryKey: WATCHLIST_ITEMS_QUERY_KEY(watchlistId),
      });
    }
  }, [pathname, watchlistId, queryClient, swapWithPrevious]);
}
