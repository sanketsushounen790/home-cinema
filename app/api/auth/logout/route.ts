import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Xoá session cookie
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ message: "logged_out" });
}
