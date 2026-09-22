// Fuente única de las FAQ de /preguntas-frecuentes.
// La usa el acordeón visible (FaqPage) y el FAQPage JSON-LD de la ruta, para que
// schema y contenido nunca se desincronicen.

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  group: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    group: "General",
    items: [
      {
        q: "¿Qué es PrestaClub?",
        a: "PrestaClub es una plataforma que facilita el acceso a financiamiento conectando a personas y empresas que tienen una propiedad con inversionistas institucionales. Tenemos más de 24 años en el mercado peruano.",
      },
      {
        q: "¿Están supervisados por la SBS?",
        a: "Sí, estamos inscritos en el Registro de Empresas de Préstamos y Empeños de la SBS (Resolución N° 02627-2020) y reportamos a la Unidad de Inteligencia Financiera (UIF).",
      },
    ],
  },
  {
    group: "Préstamos Hipotecarios",
    items: [
      {
        q: "¿Qué requisitos necesito para precalificar?",
        a: "Documento de identidad (DNI), copia literal de la partida registral del inmueble actualizada (HR/PU) y un recibo de servicios.",
      },
      {
        q: "¿Puedo obtener un préstamo si estoy en Infocorp?",
        a: "Sí, evaluamos tu caso de forma personalizada. Al contar con una garantía real, tu historial crediticio no es el único factor determinante.",
      },
    ],
  },
  {
    group: "Saneamiento",
    items: [
      {
        q: "¿Qué es el saneamiento predial?",
        a: "Es el proceso técnico-legal para regularizar la situación de una propiedad e inscribirla correctamente ante la SUNARP, permitiendo que sea apta para hipotecas o venta.",
      },
    ],
  },
];

// Lista plana para el FAQPage JSON-LD.
export const faqFlat: FaqItem[] = faqGroups.flatMap((g) => g.items);
