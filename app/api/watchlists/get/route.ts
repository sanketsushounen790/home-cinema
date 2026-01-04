import { NextResponse } from "next/server";

import { getWatchlistsSummary } from "@/lib/firebase/watchlistAdmin";
import { requireUser } from "@/lib/helper/authCheckOnServer";

// 🔥 QUAN TRỌNG: không cache user-specific data
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    /**
     * 1️⃣ Check auth từ session cookie
     * - verifySessionCookie
     * - decode uid
     */
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = user.uid;

    /**
     * 2️⃣ Fetch watchlists summary (Admin SDK)
     */
    const watchlists = await getWatchlistsSummary(userId);

    /**
     * 3️⃣ Trả response + disable cache
     */
    return NextResponse.json(watchlists, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    /**
     * 4️⃣ Handle revoked / expired session rõ ràng
     */
    if (error?.code === "auth/id-token-revoked") {
      return NextResponse.json({ message: "Session expired" }, { status: 403 });
    }

    console.error("[API][WATCHLISTS_SUMMARY][GET]", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
