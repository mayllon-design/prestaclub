import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Protege las rutas de escritura del blog (/api/articles y /api/upload).
// El admin inicia sesión con Supabase; aquí validamos que la petición traiga ese
// token en "Authorization: Bearer <token>". Sin token válido, 401.
//
// ADMIN_EMAILS (opcional, separados por coma): si está definida, además el correo del
// usuario debe estar en la lista. Protege contra registros abiertos en Supabase.

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

export async function getAdminUser(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;

  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length && !allowed.includes((data.user.email ?? "").toLowerCase())) return null;

  return data.user;
}

export function unauthorized() {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}
