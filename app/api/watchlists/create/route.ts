import { NextResponse } from "next/server";
import { createWatchlist } from "@/lib/firebase/watchlistAdmin";
import { requireUser } from "@/lib/helper/authCheckOnServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json({ message: "Missing title" }, { status: 400 });
    }

    const watchlistId = await createWatchlist(user.uid, title.trim());

    if (!watchlistId) {
      return NextResponse.json(
        { message: "Watchlist already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({
      id: watchlistId,
      title,
      createdAt: Date.now(),
    });
  } catch (error) {
    console.error("[API][WATCHLIST][CREATE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
