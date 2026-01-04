export default function isCharsInString(chars: string, target: string) {
  const a = chars.toLowerCase();
  const b = target.toLowerCase();

  return [...a].every((c) => b.includes(c));
}
