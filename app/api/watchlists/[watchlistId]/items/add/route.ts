import { NextResponse } from "next/server";
import { addItemToWatchlist } from "@/lib/firebase/watchlistAdmin";
import { requireUser } from "@/lib/helper/authCheckOnServer";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: { watchlistId: string } }
) {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { watchlistId } = await params;
    if (!watchlistId) {
      return NextResponse.json(
        { message: "Missing watchlistId" },
        { status: 400 }
      );
    }

    const item = await req.json();

    const success = await addItemToWatchlist(user.uid, watchlistId, item);

    if (!success) {
      return NextResponse.json(
        { message: "Failed to add item" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[API][WATCHLIST_ITEM][ADD]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
