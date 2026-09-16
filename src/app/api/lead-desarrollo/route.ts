import { NextResponse } from "next/server";

// URL del flujo de Power Automate (disparador "Cuando se recibe una solicitud HTTP").
// Se guarda en variable de entorno para NO exponer el token del flujo en el navegador.
const POWER_AUTOMATE_URL = process.env.POWER_AUTOMATE_LEAD_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      tipoProyecto = "",
      ubicacion = "",
      fase = "",
      unidades = "",
      monto = "",
      razonSocial = "",
      campana = "Organico",
    } = body ?? {};

    // Si todavía no está configurada la URL del flujo, no rompemos la experiencia:
    // registramos el aviso y respondemos OK (la captura del lead es "best effort",
    // WhatsApp siempre debe abrirse igual desde el cliente).
    if (!POWER_AUTOMATE_URL) {
      console.error(
        "[lead-desarrollo] Falta POWER_AUTOMATE_LEAD_URL en las variables de entorno."
      );
      return NextResponse.json({ success: false, reason: "not_configured" }, { status: 200 });
    }

    const payload = {
      fecha: new Date().toISOString(),
      tipoProyecto,
      ubicacion,
      fase,
      unidades,
      monto,
      razonSocial,
      campana,
    };

    // Reenvío servidor -> servidor a Power Automate (sin CORS, con JSON real).
    const res = await fetch(POWER_AUTOMATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[lead-desarrollo] Power Automate respondió", res.status, detail);
      return NextResponse.json({ success: false, status: res.status }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[lead-desarrollo] Error procesando el lead:", error?.message);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
