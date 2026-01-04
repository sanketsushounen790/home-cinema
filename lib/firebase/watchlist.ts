import { useWatchlistStore } from "@/store/useWatchlistStore";
import { db } from "./client";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export function initWatchlistRealtime(userId: string) {
  const {
    setAll,
    updateWatchlist,
    updateItems,
    removeWatchlist,
    unsubscribeMap,
  } = useWatchlistStore.getState();

  const watchlistsRef = collection(db, "users", userId, "watchlists");

  let initialized = false; // Đánh dấu snapshot đầu tiên

  const unsubWatchlists = onSnapshot(watchlistsRef, (snap) => {
    // ---------------------------------------------------------
    // ⭐ 1) SNAPSHOT LẦN ĐẦU → LOAD FULL DATA
    // ---------------------------------------------------------
    if (!initialized) {
      initialized = true;

      const lists: WatchlistAllFromFB[] = snap.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          title: d.title,
          createdAt: d.createdAt,
          updatedAt: d.updatedAt,
          items: [],
        };
      });

      // Set dữ liệu ban đầu
      setAll(lists);

      // Tạo listeners items cho tất cả watchlists
      lists.forEach((wl) => {
        if (!unsubscribeMap[wl.id]) {
          const itemsRef = collection(
            db,
            "users",
            userId,
            "watchlists",
            wl.id,
            "items"
          );

          const unsubItems = onSnapshot(itemsRef, (itemsSnap) => {
            const items: WatchlistItem[] = itemsSnap.docs.map(
              (d) => d.data() as WatchlistItem
            );
            updateItems(wl.id, items);
          });

          useWatchlistStore.setState((state) => ({
            unsubscribeMap: {
              ...state.unsubscribeMap,
              [wl.id]: unsubItems,
            },
          }));
        }
      });

      return; // ⛔ Dừng ở đây snapshot đầu tiên
    }

    // ---------------------------------------------------------
    // ⭐ 2) CÁC SNAPSHOT SAU → CHỈ XỬ LÝ docChanges
    // ---------------------------------------------------------
    snap.docChanges().forEach((change) => {
      const doc = change.doc;
      const data = doc.data();
      const id = doc.id;

      // XÓA
      if (change.type === "removed") {
        removeWatchlist(id);
        return;
      }

      // ADD
      if (change.type === "added") {
        updateWatchlist(id, {
          id,
          title: data.title,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          items: [],
        });

        // tạo listener items nếu chưa có
        if (!unsubscribeMap[id]) {
          const itemsRef = collection(
            db,
            "users",
            userId,
            "watchlists",
            id,
            "items"
          );

          const unsubItems = onSnapshot(itemsRef, (itemsSnap) => {
            const items: WatchlistItem[] = itemsSnap.docs.map(
              (d) => d.data() as WatchlistItem
            );
            updateItems(id, items);
          });

          useWatchlistStore.setState((state) => ({
            unsubscribeMap: { ...state.unsubscribeMap, [id]: unsubItems },
          }));
        }

        return;
      }

      // UPDATE
      if (change.type === "modified") {
        updateWatchlist(id, {
          title: data.title,
          updatedAt: data.updatedAt,
        });
      }
    });
  });

  return unsubWatchlists;
}

export async function getAllWatchlistsWithItems(
  userId: string
): Promise<WatchlistAllFromFB[]> {
  const watchlistsRef = collection(db, "users", userId, "watchlists");
  const watchlistsSnap = await getDocs(watchlistsRef);

  const all: WatchlistAllFromFB[] = [];

  for (const wl of watchlistsSnap.docs) {
    const wlData = wl.data();

    const itemsRef = collection(
      db,
      "users",
      userId,
      "watchlists",
      wl.id,
      "items"
    );

    const itemsSnap = await getDocs(itemsRef);

    const items: WatchlistItem[] = itemsSnap.docs.map((it) => ({
      ...(it.data() as WatchlistItem),
    }));

    all.push({
      id: wl.id,
      title: wlData.title,
      createdAt: wlData.createdAt,
      updatedAt: wlData.updatedAt,
      items,
    });
  }

  return all;
}

// export function listenAllWatchlistsWithItems(
//   userId: string,
//   callback: (data: WatchlistAllFromFB[]) => void
// ) {
//   const watchlistsRef = collection(db, "users", userId, "watchlists");

//   return onSnapshot(watchlistsRef, async (watchlistsSnap) => {
//     const result: WatchlistAllFromFB[] = [];

//     for (const wl of watchlistsSnap.docs) {
//       const wlData = wl.data();

//       const itemsRef = collection(
//         db,
//         "users",
//         userId,
//         "watchlists",
//         wl.id,
//         "items"
//       );

//       const itemsSnap = await getDocs(itemsRef);

//       const items: WatchlistItem[] = itemsSnap.docs.map((it) => ({
//         ...(it.data() as WatchlistItem),
//       }));

//       result.push({
//         id: wl.id,
//         title: wlData.title,
//         createdAt: wlData.createdAt,
//         updatedAt: wlData.updatedAt,
//         items,
//       });
//     }

//     callback(result);
//   });
// }

// export function initWatchlistRealtime(userId: string) {
//   const setAll = useWatchlistStore.getState().setAll;

//   const unsub = listenAllWatchlistsWithItems(userId, (lists) => {
//     setAll(lists); // cập nhật zustand
//   });

//   return unsub;
// }

// Lấy tất cả watchlists của user
// export async function getWatchlists(
//   userId: string
// ): Promise<WatchlistSummary[]> {
//   try {
//     const snap = await getDocs(collection(db, "users", userId, "watchlists"));
//     return snap.docs.map((doc) => {
//       const data = doc.data();
//       return {
//         id: data.id,
//         title: data.title,
//         createdAt: data.createdAt,
//       } as WatchlistSummary;
//     });
//   } catch (error) {
//     console.error("[Watchlist Client] getWatchlists error:", error);
//     return [];
//   }
// }

// export async function getWatchlistItems(
//   userId: string,
//   watchlistId: string
// ): Promise<WatchlistItem[]> {
//   const ref = collection(
//     db,
//     "users",
//     userId,
//     "watchlists",
//     watchlistId,
//     "items"
//   );
//   const snap = await getDocs(ref);

//   return snap.docs.map((doc) => doc.data() as WatchlistItem);
// }
