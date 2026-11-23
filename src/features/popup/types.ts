// Popup administrable desde /admin/popup. Una sola configuración (fila id = 1 de la tabla `popup`).

export type PopupConfig = {
  activo: boolean;
  image_url: string;
  alt_text: string;
  duracion_ms: number; // 0 = no se cierra solo
  paginas: string[]; // rutas exactas, "/articulos/*" o "*" (todas)
  version: string; // cambia al guardar: el popup vuelve a mostrarse aunque ya se haya visto
};

export const TODAS = "*";

export const PAGINAS: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/financiamiento-con-garantia-hipotecaria", label: "Préstamo con garantía hipotecaria (pilar)" },
  { path: "/financiamiento-con-garantia-hipotecaria/estando-en-infocorp", label: "Estando en Infocorp" },
  { path: "/financiamiento-con-garantia-hipotecaria/terreno", label: "Garantía de terreno" },
  { path: "/capital-de-trabajo", label: "Capital de trabajo" },
  { path: "/financiamiento-con-garantia-hipotecaria/construccion", label: "Construcción" },
  { path: "/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas", label: "Consolidación de deudas" },
  { path: "/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca", label: "Compra de hipoteca" },
  { path: "/prestamos-con-garantia-hipotecaria-para-empresas", label: "Empresas" },
  { path: "/prestamo-con-garantia-vehicular", label: "Vehicular" },
  { path: "/desarrollo-inmobiliario", label: "Desarrollo inmobiliario" },
  { path: "/saneamiento-predial", label: "Saneamiento predial" },
  { path: "/nosotros", label: "Nosotros" },
  { path: "/contacto", label: "Contacto" },
  { path: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { path: "/articulos/*", label: "Blog (listado y todos los artículos)" },
];

export const DURACIONES: { ms: number; label: string }[] = [
  { ms: 3000, label: "3 segundos" },
  { ms: 5000, label: "5 segundos" },
  { ms: 8000, label: "8 segundos" },
  { ms: 10000, label: "10 segundos" },
  { ms: 15000, label: "15 segundos" },
  { ms: 0, label: "No se cierra solo (lo cierra el visitante)" },
];

const VALIDAS = new Set([TODAS, ...PAGINAS.map((p) => p.path)]);

export function limpiarPaginas(valor: unknown): string[] {
  if (!Array.isArray(valor)) return [];
  const lista = valor.filter((p): p is string => typeof p === "string" && VALIDAS.has(p));
  return lista.includes(TODAS) ? [TODAS] : Array.from(new Set(lista));
}

export function aplicaEnRuta(paginas: string[], pathname: string): boolean {
  return paginas.some((p) => {
    if (p === TODAS) return true;
    if (p === "/articulos/*") return pathname === "/articulos" || pathname.startsWith("/articulos/");
    return p === pathname;
  });
}

// Fila de la BD -> objeto para el front.
export function filaAConfig(row: Record<string, unknown>): PopupConfig {
  let paginas: unknown = [];
  try {
    paginas = JSON.parse(String(row.paginas ?? "[]"));
  } catch {
    paginas = [];
  }
  return {
    activo: Number(row.activo) === 1,
    image_url: String(row.image_url ?? ""),
    alt_text: String(row.alt_text ?? ""),
    duracion_ms: Number(row.duracion_ms ?? 3000),
    paginas: limpiarPaginas(paginas),
    version: String(row.version ?? ""),
  };
}
