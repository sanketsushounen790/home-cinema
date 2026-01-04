export function isMovie(
  item: any
): item is PersonCastCreditMovie | PersonCrewCreditMovie {
  return "title" in item;
}

export function isTV(
  item: any
): item is PersonCastCreditTV | PersonCrewCreditTV {
  return "name" in item;
}
export function isCast(
  item: any
): item is PersonCastCreditMovie | PersonCastCreditTV {
  return "character" in item;
}

export function isCrew(
  item: any
): item is PersonCrewCreditMovie | PersonCrewCreditTV {
  return "department" in item;
}

function getScore(item: { vote_average: number; vote_count: number }) {
  return item.vote_average * Math.log(item.vote_count + 1);
}

export function getTop10Credits(cast: any[], crew: any[]) {
  const k = 12;
  const heap: any[] = [];
  const seen = new Set<number>();

  // IMDb weighted rating formula
  const weightedScore = (item: any) => {
    const R = item.vote_average ?? 0;
    const v = item.vote_count ?? 0;
    const C = 6.8; // global average rating
    const m = 5000; // minimum votes for stability

    return (v / (v + m)) * R + (m / (v + m)) * C;
  };

  const process = (item: any) => {
    if (item.job === "Thanks") return;

    if (seen.has(item.id)) return;
    seen.add(item.id);

    item._score = weightedScore(item);

    // min-heap logic cho top 10
    if (heap.length < k) {
      heap.push(item);
      heap.sort((a, b) => a._score - b._score);
    } else if (item._score > heap[0]._score) {
      heap[0] = item;
      heap.sort((a, b) => a._score - b._score);
    }
  };

  cast.forEach(process);
  crew.forEach(process);

  return heap.sort((a, b) => b._score - a._score);
}
