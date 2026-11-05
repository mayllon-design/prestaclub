// Helper central para enviar el evento "whatsapp_click" al dataLayer de GTM.
// Cada flujo envía los parámetros que tiene disponibles: destino, monto y/o ubicacion.
//
// lead_tipo separa la calidad del contacto (GTM lo usa para el píxel de Meta):
//   "formulario" -> la persona completó un formulario con sus datos (nombre, celular,
//                   RUC, placa...). Es el único que debe contar como LeadCalificado.
//   "clic"       -> abrió WhatsApp sin dejar datos (botón, barra móvil, modal de
//                   ubicación, calculadoras). Valor por defecto.

type WhatsAppClickParams = {
  /** Identificador del punto de conversión (ej: "empresa_form", "vehicular_simulador"). */
  button_location: string;
  /** Tipo de uso / producto solicitado (ej: "Capital de Trabajo", "Garantía Vehicular"). */
  destino?: string;
  /** Monto solicitado o preaprobado en soles. */
  monto?: number | string;
  /** Ubicación del inmueble o del cliente (ej: "Lima o Callao"). */
  ubicacion?: string;
  /** "formulario" solo si el flujo pidió datos personales. Por defecto "clic". */
  lead_tipo?: "formulario" | "clic";
};

export const trackWhatsAppClick = ({
  button_location,
  destino,
  monto,
  ubicacion,
  lead_tipo = "clic",
}: WhatsAppClickParams) => {
  if (typeof window === "undefined") return;

  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];

  // Normalizamos el monto a número cuando viene como string.
  const montoNum =
    monto === undefined || monto === ""
      ? undefined
      : typeof monto === "number"
        ? monto
        : Number(String(monto).replace(/[^0-9.]/g, "")) || undefined;

  w.dataLayer.push({
    event: "whatsapp_click",
    button_location,
    lead_tipo,
    page_path: window.location.pathname,
    // Solo incluimos los parámetros que existan en este flujo.
    ...(destino ? { destino } : {}),
    ...(montoNum !== undefined ? { monto: montoNum } : {}),
    ...(ubicacion ? { ubicacion } : {}),
  });
};
