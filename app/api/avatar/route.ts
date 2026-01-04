// app/api/avatar/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("url");
  if (!url) return NextResponse.json({}, { status: 400 });

  const res = await fetch(url);

  return new NextResponse(res.body, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
