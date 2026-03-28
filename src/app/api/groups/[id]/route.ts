import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { tabGroups } from "@/lib/schema";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;
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

    const result = await db
      .update(tabGroups)
      .set({ name, color: color || "blue", tabs })
      .where(and(eq(tabGroups.id, id), eq(tabGroups.userId, userId)))
      .returning({ id: tabGroups.id });

    if (result.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Update group error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;

    const result = await db
      .delete(tabGroups)
      .where(and(eq(tabGroups.id, id), eq(tabGroups.userId, userId)))
      .returning({ id: tabGroups.id });

    if (result.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete group error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
