import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { singleTabs } from "@/lib/schema";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const result = await db
      .select()
      .from(singleTabs)
      .where(eq(singleTabs.userId, userId))
      .orderBy(asc(singleTabs.position));

    return NextResponse.json({
      tabs: result.map((t) => ({
        id: t.id,
        name: t.name,
        url: t.url,
        createdAt: t.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get tabs error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { name, url } = await req.json();

    if (!name || !url) {
      return NextResponse.json({ error: "Name and URL required" }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: `Invalid URL: ${url}` }, { status: 400 });
    }

    const [tab] = await db
      .insert(singleTabs)
      .values({ userId, name, url })
      .returning({ id: singleTabs.id });

    return NextResponse.json({ ok: true, id: tab.id }, { status: 201 });
  } catch (error) {
    console.error("Create tab error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
