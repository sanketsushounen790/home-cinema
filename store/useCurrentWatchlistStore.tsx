import { create } from "zustand";

export interface CurrentWatchlist {
  id: string;
  title: string;
  createdAt: number;
}

interface CurrentWatchlistState {
  watchlist: CurrentWatchlist | null;
  previousWatchlist: CurrentWatchlist | null;

  setWatchlist: (data: CurrentWatchlist) => void;
  swapWithPrevious: () => void;
  clearWatchlist: () => void;
}

export const useCurrentWatchlistStore = create<CurrentWatchlistState>(
  (set, get) => ({
    watchlist: null,
    previousWatchlist: null,

    // 👉 dùng khi PUSH TỚI
    setWatchlist: (data) => {
      const current = get().watchlist;
      set({
        watchlist: data,
        previousWatchlist: current,
      });
    },

    // 👉 dùng khi browser BACK
    swapWithPrevious: () => {
      const { watchlist, previousWatchlist } = get();
      if (!previousWatchlist) return;

      set({
        watchlist: previousWatchlist,
        previousWatchlist: watchlist,
      });
    },

    clearWatchlist: () => set({ watchlist: null, previousWatchlist: null }),
  })
);
