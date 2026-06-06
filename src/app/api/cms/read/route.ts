import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const dynamic = "force-dynamic";

const DICT_DIR = path.join(process.cwd(), "src/i18n/dictionaries");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") ?? "en";

  const allowed = ["en", "vi"];
  if (!allowed.includes(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
  }

  try {
    const filePath = path.join(DICT_DIR, `${lang}.json`);
    const raw = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
