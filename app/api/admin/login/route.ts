import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  checkAdminCredentials,
  createAdminSession,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let credentials: unknown;
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid username and password." }, { status: 400 });
  }

  if (
    typeof credentials !== "object" ||
    credentials === null ||
    !("username" in credentials) ||
    !("password" in credentials) ||
    typeof credentials.username !== "string" ||
    typeof credentials.password !== "string"
  ) {
    return NextResponse.json({ error: "Enter a valid username and password." }, { status: 400 });
  }

  try {
    if (!checkAdminCredentials(credentials.username, credentials.password)) {
      return NextResponse.json({ error: "The username or password is incorrect." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, createAdminSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_SESSION_SECONDS,
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Admin login is not configured.";
    console.error("Admin login configuration error:", error);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
