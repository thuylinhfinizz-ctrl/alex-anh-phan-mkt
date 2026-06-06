import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

const SETTINGS_PATH = path.join(process.cwd(), "src/i18n/settings.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, password } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await fs.writeFile(SETTINGS_PATH, JSON.stringify(data, null, 2), "utf-8");

    // Revalidate all pages so GTM/GSC is injected immediately
    revalidatePath("/en");
    revalidatePath("/vi");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Settings Save Error]", err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
