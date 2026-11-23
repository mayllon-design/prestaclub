import { NextResponse } from "next/server";
import pool from "@/shared/lib/db";
import { getAdminUser, unauthorized } from "@/shared/lib/adminAuth";
import { DURACIONES, filaAConfig, limpiarPaginas } from "@/features/popup/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await getAdminUser(request))) return unauthorized();
  try {
    const [rows] = await pool.query(
      "SELECT *, UNIX_TIMESTAMP(updated_at) AS version FROM popup WHERE id = 1"
    );
    const row = (rows as Record<string, unknown>[])[0];
    return NextResponse.json(row ? filaAConfig(row) : null);
  } catch (e) {
    console.error("[admin/popup]", (e as { code?: string })?.code ?? e);
    return NextResponse.json(
      { error: "No se pudo leer el popup. Revisa que exista la tabla popup (db/popup.sql)." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await getAdminUser(request))) return unauthorized();
  const body = await request.json().catch(() => ({}));

  const activo = body.activo === true;
  const imageUrl = typeof body.image_url === "string" ? body.image_url.trim().slice(0, 500) : "";
  const altText = typeof body.alt_text === "string" ? body.alt_text.trim().slice(0, 500) : "";
  const duracion = Number(body.duracion_ms);
  const duracionMs = DURACIONES.some((d) => d.ms === duracion) ? duracion : 3000;
  const paginas = limpiarPaginas(body.paginas);

  // Solo se aceptan imágenes propias (subidas desde el admin o de /public).
  if (imageUrl && !imageUrl.startsWith("/")) {
    return NextResponse.json({ error: "La imagen debe subirse desde este panel." }, { status: 400 });
  }
  if (activo && !imageUrl) {
    return NextResponse.json({ error: "Sube una imagen antes de encender el popup." }, { status: 400 });
  }
  if (activo && paginas.length === 0) {
    return NextResponse.json({ error: "Elige al menos una página donde mostrar el popup." }, { status: 400 });
  }

  try {
    await pool.query(
      `INSERT INTO popup (id, activo, image_url, alt_text, duracion_ms, paginas)
       VALUES (1, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE activo = VALUES(activo), image_url = VALUES(image_url),
         alt_text = VALUES(alt_text), duracion_ms = VALUES(duracion_ms), paginas = VALUES(paginas),
         updated_at = CURRENT_TIMESTAMP`,
      [activo ? 1 : 0, imageUrl || null, altText || null, duracionMs, JSON.stringify(paginas)]
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/popup PUT]", (e as { code?: string })?.code ?? e);
    return NextResponse.json({ error: "No se pudo guardar." }, { status: 500 });
  }
}
