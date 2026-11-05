import { NextResponse } from "next/server";
import pool from "@/shared/lib/db";
import { getAdminUser, unauthorized } from "@/shared/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminUser(request))) return unauthorized();
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const estado = body.estado === "atendido" ? "atendido" : "pendiente";
  const respuesta = typeof body.respuesta === "string" ? body.respuesta.trim().slice(0, 5000) : "";
  if (estado === "atendido" && !respuesta) {
    return NextResponse.json({ error: "Registra la respuesta antes de marcarla como atendida." }, { status: 400 });
  }
  try {
    // Perú no tiene horario de verano: la hora de Lima siempre es UTC-5.
    await pool.query(
      `UPDATE reclamaciones SET estado = ?, respuesta = ?,
         fecha_respuesta = IF(? = 'atendido', COALESCE(fecha_respuesta, UTC_TIMESTAMP() - INTERVAL 5 HOUR), NULL)
       WHERE id = ?`,
      [estado, respuesta || null, estado, id]
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/reclamaciones/id]", (e as { code?: string })?.code ?? e);
    return NextResponse.json({ error: "No se pudo actualizar." }, { status: 500 });
  }
}
