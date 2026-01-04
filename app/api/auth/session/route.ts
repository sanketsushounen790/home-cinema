import { adminAuth } from "@/lib/firebase/admin";
import { createDefaultWatchlistAdmin } from "@/lib/firebase/watchlistAdmin";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    // 1️⃣ Verify ID token từ client
    // const decodedToken = await adminAuth.verifyIdToken(idToken);
    // const userId = decodedToken.uid;

    // 2️⃣ Tạo default watchlist nếu lần đầu login
    //await createDefaultWatchlistAdmin(userId);

    // 3️⃣ Tạo session cookie (maxAge ~ 5 ngày)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in ms
    //const expiresIn = 60 * 1000 * 10;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // 4️⃣ Ghi cookie vào response
    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
      sameSite: "lax",
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("[Session API] error:", err);
    return new Response(JSON.stringify({ ok: false, error: err }), {
      status: 400,
    });
  }
}
