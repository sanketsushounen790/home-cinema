export default function formatFirestoreTimestamp(ts: {
  seconds: number;
  nanoseconds: number;
}) {
  if (!ts?.seconds) return "";

  const date = new Date(ts.seconds * 1000 + ts.nanoseconds / 1_000_000);

  return date.toLocaleString("vi-VN");
}
