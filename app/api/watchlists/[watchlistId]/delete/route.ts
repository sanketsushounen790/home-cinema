import { NextResponse } from "next/server";
import { deleteWatchlist } from "@/lib/firebase/watchlistAdmin";
import { requireUser } from "@/lib/helper/authCheckOnServer";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
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

    const success = await deleteWatchlist(user.uid, watchlistId);

    if (!success) {
      return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[API][WATCHLIST][DELETE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
