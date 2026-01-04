export function getNextWatchlistData(
  watchlists: any[],
  currentWatchlistId: string
): any | null {
  if (watchlists.length === 0) return null;

  const index = watchlists.findIndex((w) => w.id === currentWatchlistId);

  // Không tìm thấy watchlist hiện tại
  if (index === -1) {
    return watchlists[0] ?? null;
  }

  // 1️⃣ Ưu tiên watchlist phía sau
  if (index < watchlists.length - 1) {
    return watchlists[index + 1];
  }

  // 2️⃣ Nếu là phần tử cuối → lấy phía trước
  if (index > 0) {
    return watchlists[index - 1];
  }

  // 3️⃣ Chỉ còn 1 watchlist
  return null;
}
