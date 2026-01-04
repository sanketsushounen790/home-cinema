import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  // 7 ngày hiệu lực cookie (tùy chỉnh)
  const expiresIn = 60 * 60 * 24 * 7 * 1000;

  // Tạo session cookie từ Firebase Admin
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  const response = NextResponse.json({ status: "success" });

  // Set cookie HttpOnly + Secure (quan trọng)
  response.cookies.set({
    name: "session",
    value: sessionCookie,
    maxAge: expiresIn / 1000,
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return response;
}
