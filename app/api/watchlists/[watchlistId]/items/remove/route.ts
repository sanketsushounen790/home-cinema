import { NextResponse } from "next/server";
import { removeItemFromWatchlist } from "@/lib/firebase/watchlistAdmin";
import { requireUser } from "@/lib/helper/authCheckOnServer";

export const dynamic = "force-dynamic";

export async function DELETE(
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

    const { itemId } = await req.json();

    if (!itemId) {
      return NextResponse.json({ message: "Missing itemId" }, { status: 400 });
    }

    const success = await removeItemFromWatchlist(
      user.uid,
      watchlistId,
      itemId
    );

    if (!success) {
      return NextResponse.json(
        { message: "Failed to remove item" },
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
    console.error("[API][WATCHLIST_ITEM][REMOVE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
