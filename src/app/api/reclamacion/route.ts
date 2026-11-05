import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import pool from "@/shared/lib/db";
import { sendMail } from "@/shared/lib/mailer";
import { DOC_TIPOS, OFICINAS, PLAZO_DIAS_HABILES, PRODUCTOS, PROVEEDOR } from "@/features/reclamaciones/types";

export const dynamic = "force-dynamic";

// Límite por IP: el formulario es público y envía correo a la dirección que le indiquen.
const LIMITE = 5;
const VENTANA_MS = 60 * 60 * 1000;
const intentos = new Map<string, number[]>();

function excedeLimite(ip: string) {
  const ahora = Date.now();
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= LIMITE) return true;
  intentos.set(ip, [...recientes, ahora]);
  return false;
}

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function validar(b: Record<string, unknown>) {
  const d = {
    con_nombre: texto(b.con_nombre, 200),
    con_doc_tipo: texto(b.con_doc_tipo, 30),
    con_doc_num: texto(b.con_doc_num, 20),
    con_domicilio: texto(b.con_domicilio, 300),
    con_telefono: texto(b.con_telefono, 30),
    con_email: texto(b.con_email, 200),
    con_menor: b.con_menor === true ? 1 : 0,
    apo_nombre: texto(b.apo_nombre, 200),
    medio_respuesta: b.medio_respuesta,
    bien_tipo: b.bien_tipo,
    bien_producto: texto(b.bien_producto, 100),
    bien_monto: texto(b.bien_monto, 20),
    bien_descripcion: texto(b.bien_descripcion, 500),
    oficina: texto(b.oficina, 100),
    tipo: b.tipo,
    detalle: texto(b.detalle, 5000),
    pedido: texto(b.pedido, 3000),
  };

  if (d.con_nombre.length < 3) return { error: "Ingresa tu nombre completo." };
  if (!DOC_TIPOS.includes(d.con_doc_tipo)) return { error: "Selecciona el tipo de documento." };
  if (d.con_doc_tipo === "DNI" && !/^\d{8}$/.test(d.con_doc_num)) return { error: "El DNI debe tener 8 dígitos." };
  if (d.con_doc_tipo === "RUC" && !/^\d{11}$/.test(d.con_doc_num)) return { error: "El RUC debe tener 11 dígitos." };
  if (!/^[A-Za-z0-9-]{5,20}$/.test(d.con_doc_num)) return { error: "Revisa el número de documento." };
  if (d.con_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.con_email)) return { error: "Revisa el correo electrónico." };
  if (d.medio_respuesta !== "correo" && d.medio_respuesta !== "carta") return { error: "Indica cómo quieres recibir la respuesta." };
  if (d.medio_respuesta === "correo" && !d.con_email) return { error: "Ingresa tu correo para recibir la respuesta." };
  if (d.medio_respuesta === "carta" && !d.con_domicilio) return { error: "Ingresa tu domicilio para recibir la respuesta por carta." };
  if (d.con_menor && !d.apo_nombre) return { error: "Ingresa el nombre del padre, madre o apoderado." };
  if (d.bien_tipo !== "producto" && d.bien_tipo !== "servicio") return { error: "Indica si es un producto o un servicio." };
  if (d.bien_producto && !PRODUCTOS.includes(d.bien_producto)) return { error: "Selecciona un producto de la lista." };
  if (d.oficina && !OFICINAS.includes(d.oficina)) return { error: "Selecciona un lugar de atención de la lista." };
  if (d.bien_monto && !(Number(d.bien_monto) >= 0)) return { error: "Revisa el monto reclamado." };
  if (d.tipo !== "reclamo" && d.tipo !== "queja") return { error: "Selecciona si es un reclamo o una queja." };
  if (d.detalle.length < 10) return { error: "Describe el detalle de tu reclamación." };
  return { datos: d };
}

// Fecha y hora de Lima, para que el registro no dependa de la zona horaria del servidor.
function ahoraLima() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Lima",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value])
  );
  return {
    sql: `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`,
    compacta: `${p.year}${p.month}${p.day}`,
    legible: `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}`,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  // Honeypot: los bots llenan este campo oculto. Respondemos OK sin guardar.
  if (body.empresa_web) return NextResponse.json({ ok: true, codigo: "registrado" });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (excedeLimite(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Inténtalo más tarde o escríbenos a informes@prestaclub.com." },
      { status: 429 }
    );
  }

  const { datos: d, error } = validar(body);
  if (!d) return NextResponse.json({ error }, { status: 400 });

  const fecha = ahoraLima();
  let codigo: string;
  try {
    const [res] = await pool.query<ResultSetHeader>(
      `INSERT INTO reclamaciones (fecha, con_nombre, con_doc_tipo, con_doc_num, con_domicilio, con_telefono, con_email,
        con_menor, apo_nombre, medio_respuesta, bien_tipo, bien_producto, bien_monto, bien_descripcion, oficina, tipo, detalle, pedido)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fecha.sql, d.con_nombre, d.con_doc_tipo, d.con_doc_num, d.con_domicilio || null, d.con_telefono || null, d.con_email || null,
        d.con_menor, d.apo_nombre || null, d.medio_respuesta, d.bien_tipo, d.bien_producto || null, d.bien_monto || null,
        d.bien_descripcion || null, d.oficina || null, d.tipo, d.detalle, d.pedido || null,
      ]
    );
    codigo = `R-${fecha.compacta}-${String(res.insertId).padStart(6, "0")}`;
    await pool.query("UPDATE reclamaciones SET codigo = ? WHERE id = ?", [codigo, res.insertId]);
  } catch (e) {
    console.error("[reclamacion] No se pudo registrar:", (e as { code?: string })?.code ?? e);
    return NextResponse.json(
      { error: "No pudimos registrar tu reclamación. Inténtalo de nuevo o escríbenos a informes@prestaclub.com." },
      { status: 500 }
    );
  }

  const resumen = [
    `Código: ${codigo}`,
    `Fecha: ${fecha.legible}`,
    `Proveedor: ${PROVEEDOR.razonSocial} - RUC ${PROVEEDOR.ruc}`,
    `Consumidor: ${d.con_nombre} (${d.con_doc_tipo} ${d.con_doc_num})`,
    `Tipo: ${d.tipo}`,
    `Producto o servicio: ${d.bien_producto || d.bien_tipo}${d.bien_monto ? ` - S/ ${d.bien_monto}` : ""}`,
    `Detalle: ${d.detalle}`,
    d.pedido ? `Pedido: ${d.pedido}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // La reclamación ya está guardada: si el correo falla, sigue siendo válida.
  let correoEnviado = false;
  try {
    if (d.con_email) {
      correoEnviado = await sendMail({
        to: d.con_email,
        subject: `Constancia de tu reclamación ${codigo} - PrestaClub`,
        text: `Registramos tu hoja de reclamación.\n\n${resumen}\n\nTe responderemos en un plazo no mayor a ${PLAZO_DIAS_HABILES} días hábiles.\n\nLa formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.`,
      });
    }
    await sendMail({
      to: (process.env.RECLAMACIONES_TO || "informes@prestaclub.com").split(",").map((s) => s.trim()),
      subject: `Nueva ${d.tipo} en el Libro de Reclamaciones: ${codigo}`,
      text: `${resumen}\n\nContacto: ${d.con_telefono || "-"} / ${d.con_email || "-"} / ${d.con_domicilio || "-"}\nResponder por: ${d.medio_respuesta}\nPlazo: ${PLAZO_DIAS_HABILES} días hábiles improrrogables.\nPanel: https://prestaclub.com/admin/reclamaciones`,
      replyTo: d.con_email || undefined,
    });
  } catch (e) {
    console.error("[reclamacion] Registrada, pero falló el correo:", (e as { code?: string })?.code ?? e);
  }

  return NextResponse.json({ ok: true, codigo, fecha: fecha.legible, correoEnviado });
}
