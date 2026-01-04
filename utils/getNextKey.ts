export function getNextKey<T extends Record<string, any>>(
  obj: T,
  currentKey: string
): string | null {
  const keys = Object.keys(obj); // ['id1', 'id2', 'id3', ...]
  const index = keys.indexOf(currentKey);

  if (index === -1) return null; // không tồn tại key hiện tại
  if (index === keys.length - 1) return null; // không có key kế tiếp

  return keys[index + 1]; // trả về key tiếp theo
}
