// Fuente única de las FAQs de la landing de garantía de TERRENO.
// La usan DOS consumidores y deben coincidir siempre:
//   1. TerrenoPage -> el acordeón visible.
//   2. app/financiamiento-con-garantia-hipotecaria/terreno/page.tsx -> el JSON-LD (FAQPage).
// Si el schema no coincide con el texto visible, Google lo trata como spam de
// datos estructurados. Por eso ambos leen de este array.

import type { Faq } from "@/features/hipotecario/faqs";

export const faqsTerreno: Faq[] = [
  {
    q: "¿Puedo obtener un préstamo con un terreno urbano sin construir?",
    a: "Sí. No es necesario que el terreno tenga construcción para servir como garantía. Un lote urbano inscrito en SUNARP, con cerco perimétrico y título saneado, puede respaldar la operación. Lo determinante es su valor de realización según la tasación y su situación legal y registral, no que tenga una edificación encima.",
  },
  {
    q: "¿Sirve un terreno comercial o un lote en lotización?",
    a: "Sí, ambos pueden evaluarse. Los terrenos comerciales y los lotes dentro de lotizaciones inscritas suelen ser garantías atractivas cuando la ubicación es buena y el título está limpio. La viabilidad depende de la tasación, de la zonificación y de que la partida registral permita constituir la hipoteca sin observaciones.",
  },
  {
    q: "¿Necesito el título de propiedad o basta con las escrituras?",
    a: "Necesitas que el terreno esté inscrito en SUNARP a tu nombre (o del garante). La escritura pública y la partida registral son la base para verificar la titularidad y constituir la garantía. Si tienes la minuta o escrituras pero el terreno aún no figura inscrito o independizado, primero revisamos qué se requiere para sanearlo antes de estructurar el préstamo.",
  },
  {
    q: "¿Cuánto dinero puedo obtener por mi terreno?",
    a: "El financiamiento puede alcanzar hasta el 40% del valor de realización del terreno, determinado por una tasación de un perito REPEV durante la evaluación. Para personas naturales los montos van desde S/10,000 hasta S/1,000,000; para personas jurídicas con RUC 20, desde S/150,000. El monto exacto de tu caso se define tras la tasación.",
  },
  {
    q: "¿Puedo usar el terreno de un familiar como garantía?",
    a: "Sí. El terreno puede ser de un familiar o tercero, siempre que su propietario participe voluntariamente como garante hipotecario y firme la documentación correspondiente ante notario. El lote debe estar inscrito en SUNARP y tener una situación registral que permita su evaluación.",
  },
  {
    q: "¿Me evalúan si estoy reportado en Infocorp?",
    a: "Sí, puedes ser evaluado. Con garantía de terreno, el valor del inmueble y la viabilidad del caso pesan más que tu historial crediticio, por lo que estar reportado no te descalifica de forma automática. La operación siempre queda sujeta a los criterios del fondo de inversión que otorga el financiamiento; no ofrecemos aprobación garantizada.",
  },
];
