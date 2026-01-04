import { NextResponse } from "next/server";
import { requireUser } from "@/lib/helper/authCheckOnServer";
import { updateWatchlist } from "@/lib/firebase/watchlistAdmin";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { watchlistId, title } = await req.json();

    if (!watchlistId || !title) {
      return NextResponse.json({ message: "Missing params" }, { status: 400 });
    }

    const ok = await updateWatchlist(user.uid, watchlistId, title);

    if (!ok) {
      return NextResponse.json(
        { message: "Update watchlist failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API][WATCHLIST][UPDATE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
