import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/auth";
import { getPortfolioContent, sanitizePortfolioContent } from "@/lib/content";
import { getPrismaClient } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Sign in to edit this portfolio." }, { status: 401 });
  }
  try {
    return NextResponse.json({ content: await getPortfolioContent() });
  } catch (error) {
    console.error("Failed to load portfolio content:", error);
    return NextResponse.json(
      { error: "Could not load content from the database. Check DATABASE_URL and the database connection." },
      { status: 503 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Your session expired. Sign in again." }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Set DATABASE_URL to a Supabase Postgres connection string before saving." }, { status: 503 });
  }

  try {
    const body: unknown = await request.json();
    const content = sanitizePortfolioContent(body);
    await getPrismaClient().portfolioContent.upsert({
      where: { id: "main" },
      create: { id: "main", data: content as Prisma.InputJsonValue },
      update: { data: content as Prisma.InputJsonValue },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "The submitted content is not valid JSON." }, { status: 400 });
    }
    if (
      error instanceof Error &&
      /must be|Invalid project style|Project IDs must/.test(error.message)
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Failed to save portfolio content:", error);
    return NextResponse.json(
      { error: "Could not save your changes. Check the database connection and try again." },
      { status: 503 },
    );
  }
}
