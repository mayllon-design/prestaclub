import { NextResponse } from "next/server";
import pool from "@/shared/lib/db";
import { filaAConfig } from "@/features/popup/types";

export const dynamic = "force-dynamic";

// Configuración pública del popup. Solo devuelve datos si está activo y tiene imagen.
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT *, UNIX_TIMESTAMP(updated_at) AS version FROM popup WHERE id = 1"
    );
    const row = (rows as Record<string, unknown>[])[0];
    const config = row ? filaAConfig(row) : null;
    const body = config && config.activo && config.image_url ? config : { activo: false };
    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (e) {
    console.error("[popup]", (e as { code?: string })?.code ?? e);
    return NextResponse.json({ activo: false });
  }
}
