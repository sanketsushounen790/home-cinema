import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, onSnapshot } from "firebase/firestore";
import { useUser } from "@/hooks/useUser";

export function useWatchlistsRealtime() {
  const { user } = useUser();
  const [watchlists, setWatchlists] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const watchlistsRef = collection(db, "users", user.uid, "watchlists");

    // Lắng nghe realtime
    const unsub = onSnapshot(watchlistsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt,
      }));
      setWatchlists(data);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  return { watchlists, loading };
}
