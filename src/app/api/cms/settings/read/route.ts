import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const dynamic = "force-dynamic";

const SETTINGS_PATH = path.join(process.cwd(), "src/i18n/settings.json");

export async function GET(_req: NextRequest) {
  try {
    const raw = await fs.readFile(SETTINGS_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "Settings not found" }, { status: 404 });
  }
}
