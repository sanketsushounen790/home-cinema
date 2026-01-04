import { deleteWatchlist } from "@/lib/firebase/watchlistAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, watchlistId } = await req.json();

    if (!userId || !watchlistId) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    await deleteWatchlist(userId, watchlistId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API delete error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
