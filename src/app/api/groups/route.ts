import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { tabGroups } from "@/lib/schema";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const groups = await db
      .select()
      .from(tabGroups)
      .where(eq(tabGroups.userId, userId))
      .orderBy(desc(tabGroups.createdAt));

    return NextResponse.json({
      groups: groups.map((g) => ({
        id: g.id,
        name: g.name,
        color: g.color,
        tabs: g.tabs,
        createdAt: g.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get groups error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { name, color, tabs } = await req.json();

    if (!name || !tabs || !Array.isArray(tabs) || tabs.length === 0) {
      return NextResponse.json({ error: "Name and at least one tab required" }, { status: 400 });
    }

    for (const tab of tabs) {
      try {
        new URL(tab.url);
      } catch {
        return NextResponse.json({ error: `Invalid URL: ${tab.url}` }, { status: 400 });
      }
    }

    const [group] = await db
      .insert(tabGroups)
      .values({ userId, name, color: color || "blue", tabs })
      .returning({ id: tabGroups.id });

    return NextResponse.json({ ok: true, id: group.id }, { status: 201 });
  } catch (error) {
    console.error("Create group error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
