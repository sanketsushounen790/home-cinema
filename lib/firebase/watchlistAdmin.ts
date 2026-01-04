// lib/firebase/watchlistAdmin.ts
import { adminDb } from "./admin";
import { FieldValue } from "firebase-admin/firestore";

// ==================== WATCHLIST ====================
// Get watchlist summary
export async function getWatchlistsSummary(
  userId: string
): Promise<WatchlistSummary[]> {
  const snap = await adminDb
    .collection("users")
    .doc(userId)
    .collection("watchlists")
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      createdAt: data.createdAt,
    };
  });
}

// Tạo watchlist "Watch Later" default
export async function createDefaultWatchlistAdmin(userId: string) {
  try {
    const defaultId = crypto.randomUUID();
    const ref = adminDb
      .collection("users")
      .doc(userId)
      .collection("watchlists")
      .doc(defaultId);

    const snap = await ref.get();
    if (snap.exists) return defaultId;

    await ref.set({
      id: defaultId,
      title: "Watch Later",
      createdAt: Date.now(),
    });

    console.log(
      "[Watchlist Admin] Default watchlist -Watch Later- created for user:",
      userId
    );
    return defaultId;
  } catch (error) {
    console.error(
      "[Watchlist Admin] createDefaultWatchlist -Watch Later- error:",
      error
    );
    return null;
  }
}

// Tạo watchlist mới
export async function createWatchlist(userId: string, title: string) {
  try {
    const watchlistsRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("watchlists");

    // 1️⃣ Kiểm tra trùng tên
    const snap = await watchlistsRef.where("title", "==", title).get();
    if (!snap.empty) {
      console.log(
        `[Watchlist Admin] Watchlist with title "${title}" already exists`
      );
      return null; // hoặc throw new Error("Watchlist already exists");
    }

    // 2️⃣ Tạo watchlist mới
    const watchlistId = crypto.randomUUID();
    const ref = watchlistsRef.doc(watchlistId);

    await ref.set({
      id: watchlistId,
      title,
      createdAt: Date.now(),
    });

    return watchlistId;
  } catch (error) {
    console.error("[Watchlist Admin] createWatchlist error:", error);
    return null;
  }
}

// Update tên watchlist
export async function updateWatchlist(
  userId: string,
  watchlistId: string,
  title: string
) {
  try {
    const ref = adminDb
      .collection("users")
      .doc(userId)
      .collection("watchlists")
      .doc(watchlistId);
    await ref.update({ title });

    return true;
  } catch (error) {
    console.error("[Watchlist Admin] updateWatchlist error:", error);
    return false;
  }
}

// Xoá watchlist và tất cả items bên trong
// export async function deleteWatchlist(userId: string, watchlistId: string) {
//   try {
//     const ref = adminDb
//       .collection("users")
//       .doc(userId)
//       .collection("watchlists")
//       .doc(watchlistId);

//     // Xoá items con
//     const itemsSnap = await ref.collection("items").get();
//     const batch = adminDb.batch();
//     itemsSnap.docs.forEach((doc) => batch.delete(doc.ref));
//     batch.delete(ref);
//     await batch.commit();

//     return true;
//   } catch (error) {
//     console.error("[Watchlist Admin] deleteWatchlist error:", error);
//     return false;
//   }
// }

// ==================== WATCHLIST ITEMS ====================
//Get items of a watchlist
export async function getWatchlistItems(
  userId: string,
  watchlistId: string
): Promise<WatchlistItem[]> {
  const snap = await adminDb
    .collection("users")
    .doc(userId)
    .collection("watchlists")
    .doc(watchlistId)
    .collection("items")
    .get();

  return snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: data.id, // TMDB id
      media_type: data.media_type, // "movie" | "tv"
      data: data.data, // full Movie | TV object
    };
  });
}

//Get all watchlists, ervery watchlist get its all items
// lib/firebase/watchlistAdmin.ts

export async function getAllWatchlistsWithItems(
  userId: string
): Promise<WatchlistAllFromFB[]> {
  const watchlistsSnap = await adminDb
    .collection("users")
    .doc(userId)
    .collection("watchlists")
    .orderBy("createdAt", "desc")
    .get();

  // 🔥 chạy song song các sub-collection
  const results = await Promise.all(
    watchlistsSnap.docs.map(async (wl) => {
      const wlData = wl.data();

      const itemsSnap = await adminDb
        .collection("users")
        .doc(userId)
        .collection("watchlists")
        .doc(wl.id)
        .collection("items")
        .get();

      const items: WatchlistItem[] = itemsSnap.docs.map((it) => {
        const data = it.data();

        return {
          id: data.id,
          media_type: data.media_type,
          data: data.data,
        };
      });

      return {
        id: wl.id,
        title: wlData.title,
        createdAt: wlData.createdAt,
        updatedAt: wlData.updatedAt,
        items,
      };
    })
  );

  return results;
}

// Thêm item (movie hoặc tv) vào watchlist
// export async function addItemToWatchlist(
//   userId: string,
//   watchlistId: string,
//   item: WatchlistItem
// ) {
//   try {
//     const ref = adminDb
//       .collection("users")
//       .doc(userId)
//       .collection("watchlists")
//       .doc(watchlistId)
//       .collection("items")
//       .doc(String(item.id));

//     await ref.set({
//       ...item,
//       addedAt: Date.now(),
//     });

//     return true;
//   } catch (error) {
//     console.error("[Watchlist Admin] addItemToWatchlist error:", error);
//     return false;
//   }
// }

// Xoá item khỏi watchlist
// export async function removeItemFromWatchlist(
//   userId: string,
//   watchlistId: string,
//   itemId: string
// ) {
//   try {
//     const ref = adminDb
//       .collection("users")
//       .doc(userId)
//       .collection("watchlists")
//       .doc(watchlistId)
//       .collection("items")
//       .doc(itemId);

//     await ref.delete();
//     return true;
//   } catch (error) {
//     console.error("[Watchlist Admin] removeItemFromWatchlist error:", error);
//     return false;
//   }
// }

//Add item with item's watchlist index
export async function addItemToWatchlist(
  userId: string,
  watchlistId: string,
  item: WatchlistItem
) {
  try {
    /** 1️⃣ Ref item trong watchlist */
    const itemRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("watchlists")
      .doc(watchlistId)
      .collection("items")
      .doc(item.id);

    /** 2️⃣ Ref item index */
    const indexRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("itemIndex")
      .doc(item.id);

    /** 3️⃣ Batch để đảm bảo atomic */
    const batch = adminDb.batch();

    // add item vào watchlist
    batch.set(itemRef, {
      ...item,
      addedAt: Date.now(),
    });

    // upsert item index
    batch.set(
      indexRef,
      {
        id: item.id,
        media_type: item.media_type,
        watchlistIds: FieldValue.arrayUnion(watchlistId),
        updatedAt: Date.now(),
        createdAt: Date.now(),
      },
      { merge: true } // 🔥 cực kỳ quan trọng
    );

    await batch.commit();

    return true;
  } catch (error) {
    console.error(
      "[Watchlist Admin] addItemToWatchlistWithIndex error:",
      error
    );
    return false;
  }
}

//Remove item with item's watchlist index
export async function removeItemFromWatchlist(
  userId: string,
  watchlistId: string,
  itemId: string
) {
  try {
    const userRef = adminDb.collection("users").doc(userId);

    const itemRef = userRef
      .collection("watchlists")
      .doc(watchlistId)
      .collection("items")
      .doc(itemId);

    const indexRef = userRef.collection("itemIndex").doc(itemId);

    await adminDb.runTransaction(async (tx) => {
      // 1️⃣ READ trước (bắt buộc)
      const indexSnap = await tx.get(indexRef);

      let nextWatchlistIds: string[] | null = null;

      if (indexSnap.exists) {
        const data = indexSnap.data();
        const watchlistIds: string[] = data?.watchlistIds || [];

        nextWatchlistIds = watchlistIds.filter((id) => id !== watchlistId);
      }

      // 2️⃣ WRITE sau
      tx.delete(itemRef);

      if (indexSnap.exists) {
        if (!nextWatchlistIds || nextWatchlistIds.length === 0) {
          // ❌ không còn nằm trong watchlist nào
          tx.delete(indexRef);
        } else {
          // ✅ còn watchlist khác
          tx.update(indexRef, {
            watchlistIds: nextWatchlistIds,
            updatedAt: Date.now(),
          });
        }
      }
    });

    return true;
  } catch (error) {
    console.error(
      "[Watchlist Admin] removeItemFromWatchlistWithIndex error:",
      error
    );
    return false;
  }
}

//Xoá watchlist tích hợp thao tác xoá itemIndex
export async function deleteWatchlist(userId: string, watchlistId: string) {
  try {
    const userRef = adminDb.collection("users").doc(userId);
    const watchlistRef = userRef.collection("watchlists").doc(watchlistId);

    // 1️⃣ Lấy toàn bộ items trong watchlist
    const itemsSnap = await watchlistRef.collection("items").get();

    const itemIds = itemsSnap.docs.map((d) => d.id); // itemId = movie_123 / tv_456

    // 2️⃣ Transaction để cleanup index + xoá data
    await adminDb.runTransaction(async (tx) => {
      /**
       * READ PHASE (bắt buộc trước)
       */
      const indexSnaps = await Promise.all(
        itemIds.map((itemId) =>
          tx.get(userRef.collection("itemIndex").doc(itemId))
        )
      );

      /**
       * WRITE PHASE
       */

      // 2.1 Xoá toàn bộ items
      itemsSnap.docs.forEach((doc) => {
        tx.delete(doc.ref);
      });

      // 2.2 Xoá watchlist
      tx.delete(watchlistRef);

      // 2.3 Cleanup itemIndex
      indexSnaps.forEach((snap, idx) => {
        if (!snap.exists) return;

        const itemId = itemIds[idx];
        const data = snap.data();
        const watchlistIds: string[] = data?.watchlistIds || [];

        const nextIds = watchlistIds.filter((id) => id !== watchlistId);

        const indexRef = userRef.collection("itemIndex").doc(itemId);

        if (nextIds.length === 0) {
          // ❌ item không còn thuộc watchlist nào
          tx.delete(indexRef);
        } else {
          // ✅ vẫn còn watchlist khác
          tx.update(indexRef, {
            watchlistIds: nextIds,
            updatedAt: Date.now(),
          });
        }
      });
    });

    return true;
  } catch (error) {
    console.error(
      "[Watchlist Admin] deleteWatchlist + cleanupItemIndex error:",
      error
    );
    return false;
  }
}

//get all user's ItemIndex
export async function getAllItemIndex(
  userId: string
): Promise<Record<string, ItemIndex>> {
  const snap = await adminDb
    .collection("users")
    .doc(userId)
    .collection("itemIndex")
    .get();

  const map: Record<string, ItemIndex> = {};

  snap.docs.forEach((doc) => {
    const data = doc.data();

    map[doc.id] = {
      itemId: doc.id,
      watchlistIds: data.watchlistIds || [],
      media_type: data.media_type,
      updatedAt: data.updatedAt,
    };
  });

  return map;
}
