import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value; // cookie chứa session Firebase
  const url = req.nextUrl.clone();

  const protectedRoutes = ["/user", "/dashboard", "/settings"]; // ví dụ

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!token && isProtected) {
    url.pathname = "/login";

    // Gắn route cũ: ?from=/dashboard/stats
    url.searchParams.set("from", req.nextUrl.pathname + req.nextUrl.search);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/dashboard/:path*", "/settings/:path*"],
};
