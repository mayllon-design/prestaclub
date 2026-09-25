// FAQ de la landing de empresas. Fuente única para el acordeón visible y el FAQPage JSON-LD.

export interface FaqItem {
  q: string;
  a: string;
}

export const faqsEmpresa: FaqItem[] = [
  {
    q: "¿Qué es un préstamo con garantía hipotecaria para empresas?",
    a: "Es un financiamiento en el que tu empresa obtiene liquidez usando un inmueble como garantía, sin venderlo. El inmueble puede ser de la empresa, de un socio o de un tercero que participe como garante. La operación se estructura con fondos de inversión institucionales y se formaliza ante notario, con la hipoteca inscrita en SUNARP.",
  },
  {
    q: "¿Cuánto financiamiento puede obtener mi empresa?",
    a: "El financiamiento para empresas parte desde S/ 200,000. El monto final depende del valor de realización del inmueble en garantía —determinado por una tasación— y de la evaluación de tu caso.",
  },
  {
    q: "¿Qué inmueble puede usarse como garantía?",
    a: "Un inmueble inscrito en SUNARP: puede ser de la empresa, de un socio o representante, o de un tercero que participe voluntariamente como garante hipotecario. El inmueble debe estar libre de embargos, procesos judiciales y gravámenes.",
  },
  {
    q: "¿Mi empresa puede calificar si tiene deudas o un historial complicado?",
    a: "Sí, puede ser evaluada. Al existir una garantía con inmueble, el valor del inmueble y la viabilidad del caso pesan más que el historial crediticio. La decisión final queda sujeta a los criterios del fondo de inversión que otorga el financiamiento; no ofrecemos aprobación garantizada.",
  },
  {
    q: "¿Qué requisitos necesita mi empresa?",
    a: "Lo esencial: RUC de la empresa, DNI del representante legal (y del garante, si aplica), la partida registral del inmueble y el HR y PU (Autovalúo Municipal). No exigimos estados financieros perfectos ni un historial impecable para iniciar la evaluación.",
  },
];
