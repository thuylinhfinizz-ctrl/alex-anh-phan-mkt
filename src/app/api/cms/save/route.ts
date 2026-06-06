import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

const DICT_DIR = path.join(process.cwd(), "src/i18n/dictionaries");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lang, data, password } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowed = ["en", "vi"];
    if (!allowed.includes(lang)) {
      return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const filePath = path.join(DICT_DIR, `${lang}.json`);

    // Backup before overwrite
    const backup = path.join(DICT_DIR, `${lang}.backup.json`);
    await fs.copyFile(filePath, backup).catch(() => {});

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    // Revalidate all localized pages
    revalidatePath("/en");
    revalidatePath("/vi");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[CMS Save Error]", err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
