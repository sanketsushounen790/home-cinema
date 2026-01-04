import { create } from "zustand";

export interface WatchlistState {
  // Data
  watchlists: WatchlistAllFromFB[];
  watchlistsMap: Record<string, WatchlistAllFromFB>;
  itemsMap: Record<string, boolean>;
  loading: boolean;

  // Realtime listeners
  unsubscribeMap: Record<string, () => void>;

  // Actions
  setAll: (lists: WatchlistAllFromFB[]) => void;
  updateWatchlist: (
    watchlistId: string,
    data: Partial<WatchlistAllFromFB>
  ) => void;
  updateItems: (watchlistId: string, items: WatchlistItem[]) => void;
  removeWatchlist: (watchlistId: string) => void;
  clear: () => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlists: [],
  watchlistsMap: {},
  itemsMap: {},
  loading: true,

  unsubscribeMap: {},

  /**
   * Khi fetch toàn bộ lần đầu
   */
  setAll: (lists) => {
    const mapById: Record<string, WatchlistAllFromFB> = {};
    const itemsMap: Record<string, boolean> = {};

    for (const wl of lists) {
      mapById[wl.id] = wl;

      for (const item of wl.items) {
        itemsMap[`${item.media_type}_${item.id}`] = true;
      }
    }

    set({
      watchlists: lists,
      watchlistsMap: mapById,
      itemsMap,
      loading: false,
    });
  },

  /**
   * Firestore: khi watchlist được đổi tên / update field
   */
  updateWatchlist: (watchlistId, data) =>
    set((state) => {
      const wl = state.watchlistsMap[watchlistId];
      if (!wl) return state;

      const updated = { ...wl, ...data };

      return {
        watchlistsMap: { ...state.watchlistsMap, [watchlistId]: updated },
        watchlists: Object.values({
          ...state.watchlistsMap,
          [watchlistId]: updated,
        }),
      };
    }),

  /**
   * Firestore: realtime update items của 1 watchlist
   */
  updateItems: (watchlistId, items) =>
    set((state) => {
      const wl = state.watchlistsMap[watchlistId];
      if (!wl) return state;

      const updatedWatchlist = { ...wl, items };

      // Rebuild itemsMap
      const newItemsMap = { ...state.itemsMap };
      // Xoá item cũ thuộc watchlist này
      Object.keys(newItemsMap).forEach((key) => {
        if (key.startsWith(`${watchlistId}_`)) delete newItemsMap[key];
      });

      // Add item mới
      for (const item of items) {
        newItemsMap[`${item.media_type}_${item.id}`] = true;
      }

      const newWatchlistsMap = {
        ...state.watchlistsMap,
        [watchlistId]: updatedWatchlist,
      };

      return {
        watchlistsMap: newWatchlistsMap,
        watchlists: Object.values(newWatchlistsMap),
        itemsMap: newItemsMap,
      };
    }),

  /**
   * Realtime khi xoá watchlist
   */
  removeWatchlist: (watchlistId) =>
    set((state) => {
      const newMap = { ...state.watchlistsMap };
      delete newMap[watchlistId];

      // Xoá itemsMap tương ứng
      const newItemsMap = { ...state.itemsMap };
      Object.keys(newItemsMap).forEach((key) => {
        // từng item có dạng "movie_123"
        // nếu muốn prefix theo watchlistId thì sửa lại logic
        // còn không thì giữ nguyên để check movie tồn tại trong ANY watchlist
      });

      // Hủy listener items
      state.unsubscribeMap[watchlistId]?.();
      const newUnsub = { ...state.unsubscribeMap };
      delete newUnsub[watchlistId];

      return {
        watchlistsMap: newMap,
        watchlists: Object.values(newMap),
        itemsMap: newItemsMap,
        unsubscribeMap: newUnsub,
      };
    }),

  /**
   * Clear toàn bộ state khi user logout
   */
  clear: () => {
    const unsubMap = get().unsubscribeMap;
    Object.values(unsubMap).forEach((fn) => fn());

    set({
      watchlists: [],
      watchlistsMap: {},
      itemsMap: {},
      loading: true,
      unsubscribeMap: {},
    });
  },
}));
