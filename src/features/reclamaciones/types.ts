// Datos del proveedor que deben figurar en la hoja de reclamación.
export const PROVEEDOR = {
  razonSocial: "PRESTACLUB S.A.C.",
  ruc: "20505149271",
  domicilio: "Av. Nicolás de Piérola N.° 950, Cercado de Lima, Lima",
};

export const PLAZO_DIAS_HABILES = 15;

export const DOC_TIPOS = ["DNI", "Carné de extranjería", "Pasaporte", "RUC"];

export const PRODUCTOS = [
  "Préstamo con garantía hipotecaria",
  "Crédito con garantía vehicular",
  "Préstamo para empresas",
  "Desarrollo inmobiliario",
  "Saneamiento predial",
  "Otro",
];

export const OFICINAS = [
  "Atención virtual (web o WhatsApp)",
  "Oficina Principal - Cercado de Lima",
  "Punto Comercial Ventanilla",
  "Punto Comercial Caquetá",
];

export type Reclamacion = {
  id: number;
  codigo: string;
  fecha_txt: string;
  fecha_iso: string;
  con_nombre: string;
  con_doc_tipo: string;
  con_doc_num: string;
  con_domicilio: string | null;
  con_telefono: string | null;
  con_email: string | null;
  con_menor: number;
  apo_nombre: string | null;
  medio_respuesta: "correo" | "carta";
  bien_tipo: "producto" | "servicio";
  bien_producto: string | null;
  bien_monto: string | null;
  bien_descripcion: string | null;
  oficina: string | null;
  tipo: "reclamo" | "queja";
  detalle: string;
  pedido: string | null;
  estado: "pendiente" | "atendido";
  respuesta: string | null;
  fecha_respuesta_txt: string | null;
};

// Suma días hábiles (lunes a viernes). No descuenta feriados: es una referencia
// para el panel, el plazo legal real puede vencer un poco después.
export function venceEn(fechaIso: string, dias = PLAZO_DIAS_HABILES): Date {
  const d = new Date(`${fechaIso}T12:00:00`);
  let restantes = dias;
  while (restantes > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) restantes--;
  }
  return d;
}
