import { NextResponse } from "next/server";
import { requireUser } from "@/lib/helper/authCheckOnServer";
import { getAllItemIndex } from "@/lib/firebase/watchlistAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await getAllItemIndex(user.uid);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[API][GET ITEM_INDEX]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
