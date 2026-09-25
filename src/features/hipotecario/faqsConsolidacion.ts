// FAQ de la landing de consolidación de deudas. Fuente única para el acordeón visible y el FAQPage JSON-LD.

import type { FaqItem } from "@/features/hipotecario/faqsCapitalTrabajo";

export const faqsConsolidacion: FaqItem[] = [
  {
    q: "¿Qué deudas puedo juntar en una sola cuota?",
    a: "Puedes consolidar tarjetas de crédito, préstamos personales, deudas vehiculares y saldos con distintas entidades en un solo crédito con garantía hipotecaria. En lugar de varias cuotas y fechas, pagas una sola cuota al mes.",
  },
  {
    q: "¿Cuánto puedo obtener para consolidar mis deudas?",
    a: "Desde S/ 10,000 hasta S/ 1,000,000 (un millón de soles). El monto final depende del valor de realización del inmueble en garantía, determinado por una tasación durante la evaluación, y del total de deudas que quieras unificar.",
  },
  {
    q: "¿Qué inmueble puede usarse como garantía?",
    a: "Una casa, local, departamento o terreno inscrito en SUNARP. Puede ser tuyo o de un familiar o tercero que participe voluntariamente como garante. El inmueble debe estar libre de embargos, procesos judiciales y gravámenes.",
  },
  {
    q: "¿Puedo consolidar mis deudas si estoy en Infocorp?",
    a: "Sí, puedes ser evaluado aunque tu historial se haya deteriorado. Al existir una garantía con inmueble, el valor de la propiedad pesa más que tu clasificación en las centrales de riesgo. La decisión final queda sujeta a los criterios del fondo de inversión; no ofrecemos aprobación garantizada.",
  },
  {
    q: "¿Qué requisitos necesito?",
    a: "Lo esencial: tu DNI (y el del cónyuge o garante), la partida registral del inmueble y el HR y PU (Autovalúo Municipal). Ayuda tener a la mano el detalle de las deudas que quieres consolidar (entidad y saldo aproximado). No exigimos un historial crediticio impecable para iniciar la evaluación.",
  },
];
