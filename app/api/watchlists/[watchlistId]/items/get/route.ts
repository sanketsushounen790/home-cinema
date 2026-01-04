import { NextResponse } from "next/server";

import { getWatchlistItems } from "@/lib/firebase/watchlistAdmin";
import { requireUser } from "@/lib/helper/authCheckOnServer";
import { clear } from "console";

// 🔥 user-specific data → không cache
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { watchlistId: string } }
) {
  try {
    /**
     * 1️⃣ Auth từ session cookie
     */
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = user.uid;
    const { watchlistId } = await params;

    if (!watchlistId) {
      return NextResponse.json(
        { message: "Missing watchlistId" },
        { status: 400 }
      );
    }

    /**
     * 2️⃣ Fetch items
     */
    const items = await getWatchlistItems(userId, watchlistId);

    /**
     * 3️⃣ Response (no cache)
     */
    return NextResponse.json(items, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    if (error?.code === "auth/id-token-revoked") {
      return NextResponse.json({ message: "Session expired" }, { status: 403 });
    }

    console.error("[API][WATCHLIST_ITEMS][GET]", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
clear;
