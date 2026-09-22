// Fuente única de las FAQs de la landing "estando en Infocorp".
// La usan DOS consumidores y deben coincidir siempre:
//   1. InfocorpPage -> el acordeón visible.
//   2. app/financiamiento-con-garantia-hipotecaria/estando-en-infocorp/page.tsx -> el JSON-LD (FAQPage).
// Si el schema no coincide con el texto visible, Google lo trata como spam de
// datos estructurados. Por eso ambos leen de este array.

import type { Faq } from "@/features/hipotecario/faqs";

export const faqsInfocorp: Faq[] = [
  {
    q: "¿Me pueden rechazar solo por estar reportado en Infocorp?",
    a: "No de forma automática. En una operación con garantía hipotecaria, estar reportado no es, por sí solo, motivo de rechazo, porque la evaluación considera el valor del inmueble, el destino del financiamiento y tu capacidad de pago. Cada caso queda sujeto a los criterios del fondo que otorga el crédito, por lo que ser evaluado no equivale a una aprobación garantizada.",
  },
  {
    q: "Estoy reportado y necesito un préstamo urgente, ¿qué hago?",
    a: "El primer paso es una consulta sin costo: nos cuentas cuánto necesitas y qué propiedad tienes, y revisamos si tu caso es evaluable. Tener una propiedad inscrita en SUNARP es lo que permite avanzar aunque estés reportado. Evita a quien te ofrezca dinero \"sin revisar nada\" y sin contrato: esa es la vía informal y la de mayor riesgo para ti.",
  },
  {
    q: "¿Existe un préstamo con garantía hipotecaria sin revisar Infocorp?",
    a: "No en el sentido literal: toda operación formal implica evaluación y PrestaClub reporta a la UIF. Lo que sí ofrecemos es no exigir un historial crediticio impecable para iniciar tu evaluación. La garantía real permite mirar más allá de tu score, pero siempre dentro de una operación regulada y con escritura pública.",
  },
  {
    q: "¿Qué pasa si además de estar en Infocorp tengo deudas atrasadas?",
    a: "Puedes ser evaluado igual. Las deudas atrasadas forman parte de tu situación y se analizan, pero no bloquean por sí solas la operación cuando la garantía respalda el préstamo. De hecho, muchos clientes usan este financiamiento para consolidar esas deudas en una sola cuota más manejable.",
  },
  {
    q: "¿Pueden evaluar a un familiar reportado si yo pongo la propiedad?",
    a: "Sí. La propiedad puede ser de un tercero o familiar que participe voluntariamente como garante hipotecario, firmando la documentación ante notario. Que el solicitante esté reportado no impide iniciar la evaluación, siempre que el inmueble esté inscrito en SUNARP y su situación registral lo permita.",
  },
  {
    q: "¿Me pueden dar la aprobación garantizada si tengo casa propia?",
    a: "No. Ninguna empresa formal puede garantizar una aprobación antes de evaluar. Tener casa propia inscrita mejora mucho tus posibilidades porque aporta la garantía real, pero la decisión final depende de la tasación, la situación legal del inmueble y los criterios del fondo de inversión. Preferimos ser transparentes antes que prometer lo que no depende solo de nosotros.",
  },
];
