// FAQ de la landing de capital de trabajo. Fuente única para el acordeón visible y el FAQPage JSON-LD.

export interface FaqItem {
  q: string;
  a: string;
}

export const faqsCapitalTrabajo: FaqItem[] = [
  {
    q: "¿Para qué puedo usar el capital de trabajo?",
    a: "Para lo que tu negocio necesite: comprar mercadería o insumos, cubrir planillas, pagar a proveedores, financiar una campaña o aprovechar una oportunidad de crecimiento. Es de libre disponibilidad para fines del negocio.",
  },
  {
    q: "¿Cuánto capital puedo obtener?",
    a: "Desde S/ 10,000 hasta S/ 1,000,000 (un millón de soles). El monto final depende del valor de realización del inmueble en garantía, determinado por una tasación durante la evaluación.",
  },
  {
    q: "¿Qué inmueble puede usarse como garantía?",
    a: "Una casa, local, departamento o terreno inscrito en SUNARP. Puede ser tuyo, de un socio o de un tercero que participe voluntariamente como garante. El inmueble debe estar libre de embargos, procesos judiciales y gravámenes.",
  },
  {
    q: "¿Puedo acceder si estoy en Infocorp o el banco me rechazó?",
    a: "Sí, puedes ser evaluado. Al existir una garantía con inmueble, el valor de la propiedad y la viabilidad del caso pesan más que tu historial crediticio. La decisión final queda sujeta a los criterios del fondo de inversión; no ofrecemos aprobación garantizada.",
  },
  {
    q: "¿Qué requisitos necesito?",
    a: "Lo esencial: tu DNI (y el del cónyuge o garante), la partida registral del inmueble y el HR y PU (Autovalúo Municipal). Si eres empresa, además el RUC. No exigimos un historial crediticio impecable ni boletas de pago para iniciar la evaluación.",
  },
];
