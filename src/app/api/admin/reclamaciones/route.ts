import { NextResponse } from "next/server";
import pool from "@/shared/lib/db";
import { getAdminUser, unauthorized } from "@/shared/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await getAdminUser(request))) return unauthorized();
  try {
    const [rows] = await pool.query(
      `SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y %H:%i') AS fecha_txt, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha_iso,
              DATE_FORMAT(fecha_respuesta, '%d/%m/%Y %H:%i') AS fecha_respuesta_txt
       FROM reclamaciones ORDER BY id DESC`
    );
    return NextResponse.json(rows);
  } catch (e) {
    console.error("[admin/reclamaciones]", (e as { code?: string })?.code ?? e);
    return NextResponse.json({ error: "No se pudo leer el libro. Revisa que exista la tabla reclamaciones." }, { status: 500 });
  }
}
