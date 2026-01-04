import { isMovie, isTV } from "./checkCreditTypes";

export function getDate(item: PersonCredit): Date | null {
  let dateStr: string | undefined;

  if (isMovie(item)) {
    dateStr = item.release_date?.trim();
  } else if (isTV(item)) {
    dateStr = item.first_credit_air_date?.trim();
  }

  if (!dateStr) return null;

  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export function sortByDate<T extends PersonCredit>(list: T[]): T[] {
  return [...list].sort((a, b) => {
    const dateA = getDate(a);
    const dateB = getDate(b);

    if (dateA === null && dateB === null) return 0;
    if (dateA === null) return -1; // rỗng lên đầu
    if (dateB === null) return 1;

    return dateB.getTime() - dateA.getTime(); // mới → cũ
  });
}
