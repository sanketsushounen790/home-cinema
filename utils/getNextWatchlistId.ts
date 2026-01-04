export default function getNextWatchlistId(
  watchlists: WatchlistSummary[],
  currentId: string
): string | null {
  if (watchlists.length === 0) return null;

  const idx = watchlists.findIndex((w) => w.id === currentId);

  // Không tìm thấy → fallback cái đầu tiên
  if (idx === -1) {
    return watchlists[0].id ?? null;
  }

  // 1️⃣ Ưu tiên watchlist phía sau
  if (idx < watchlists.length - 1) {
    return watchlists[idx + 1].id;
  }

  // 2️⃣ Nếu là phần tử cuối → lấy phía trước
  if (idx > 0) {
    return watchlists[idx - 1].id;
  }

  // 3️⃣ Chỉ có 1 watchlist
  return null;
}
