import { NextResponse } from "next/server";
import { updateWatchlist } from "@/lib/firebase/watchlistAdmin";
import { requireUser } from "@/lib/helper/authCheckOnServer";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: { watchlistId: string } }
) {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { watchlistId } = await params;
    const { title } = await req.json();

    if (!watchlistId || !title || !title.trim()) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const success = await updateWatchlist(user.uid, watchlistId, title.trim());

    if (!success) {
      return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }

    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[API][WATCHLIST][UPDATE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
