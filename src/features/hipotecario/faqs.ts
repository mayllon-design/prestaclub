// Fuente única de las FAQs de la landing de garantía hipotecaria.
// La usan DOS consumidores y deben coincidir siempre:
//   1. HipotecarioPage -> el acordeón visible.
//   2. app/financiamiento-con-garantia-hipotecaria/page.tsx -> el JSON-LD (FAQPage).
// Si el schema no coincide con el texto visible, Google lo trata como spam de
// datos estructurados. Por eso ambos leen de este array.

export type Faq = { q: string; a: string };

export const faqsHipotecario: Faq[] = [
  {
    q: "¿Me pueden dar un préstamo con garantía hipotecaria si estoy en Infocorp?",
    a: "Sí, es posible. Estar registrado en una central de riesgo o contar con un historial crediticio con observaciones no impide, por sí solo, acceder a un financiamiento estructurado a través de Prestaclub. La evaluación considera diversos factores, entre ellos el valor del inmueble ofrecido en garantía, el destino del financiamiento, la capacidad de pago y la situación económica del solicitante, por lo que no se basa exclusivamente en la calificación de las centrales de riesgo. Para ello, la propiedad debe estar inscrita en SUNARP y la operación debe cumplir con los criterios de evaluación del fondo de inversión o inversionista que otorgará el financiamiento.",
  },
  {
    q: "¿Cuánto dinero me prestan por mi casa?",
    a: "El monto del financiamiento depende del valor de realización del inmueble ofrecido en garantía. Como parte de la estructuración de la operación, el financiamiento que pueden otorgar los fondos de inversión puede alcanzar hasta el 40 % del valor de realización del inmueble, determinado mediante una tasación efectuada durante el proceso de evaluación por un perito inscrito en el Registro de Peritos Valuadores (REPEV). En las operaciones estructuradas por Prestaclub, los montos para personas naturales van desde S/10,000 hasta S/1,000,000, mientras que para personas jurídicas con RUC 20 parten desde S/150,000.",
  },
  {
    q: "¿Puedo perder mi casa con este tipo de préstamo?",
    a: "Sí, como en cualquier préstamo garantizado con una hipoteca, existe la posibilidad de que el inmueble sea ejecutado si la deuda no se paga conforme a lo pactado. Sin embargo, ese es el último recurso previsto por la ley y no el objetivo de la operación. En este tipo de financiamiento, el préstamo suele representar como máximo el 40 % del valor comercial del inmueble, lo que significa que la garantía tiene un valor significativamente mayor al monto adeudado. Además, las condiciones del crédito se estructuran considerando la capacidad de pago del cliente y, antes de la firma, este recibe asesoría legal para conocer plenamente los alcances de la operación y de los documentos que suscribe. El interés del acreedor es que el préstamo sea pagado en los términos acordados, no adquirir la propiedad del inmueble.",
  },
  {
    q: "¿Qué requisitos piden para evaluar mi caso?",
    a: "Los requisitos son más simples de lo que muchas personas imaginan. Para iniciar la evaluación, se requiere contar con un inmueble inscrito en SUNARP —casa, departamento, local comercial o terreno—, que puede ser de tu propiedad o de un tercero que participe voluntariamente como garante hipotecario. Asimismo, el solicitante debe ser mayor de 18 años, indicar el destino del financiamiento y que el inmueble se encuentre ubicado en Lima Metropolitana o el Callao. Como parte de la evaluación inicial, no es requisito presentar boletas de pago, acreditar ingresos por planilla ni contar con un historial crediticio sin observaciones. Para comenzar el proceso, normalmente basta con presentar el DNI, la partida registral y el HR y PU del inmueble.",
  },
  {
    q: "¿Puedo usar la casa de mis padres o de un familiar como garantía?",
    a: "Sí, es posible. El inmueble ofrecido en garantía puede ser de propiedad de un familiar o de un tercero, siempre que su propietario participe voluntariamente en la operación como garante hipotecario y manifieste su consentimiento mediante la suscripción de la documentación correspondiente. Asimismo, el inmueble debe encontrarse inscrito en SUNARP y contar con una situación registral que permita su evaluación. La constitución de la garantía se formaliza ante notario, garantizando que todas las partes conozcan el alcance y los efectos jurídicos de la operación. Durante el proceso, Prestaclub brinda la estructuración de la operación y la asesoría legal y financiera correspondiente.",
  },
  {
    q: "¿Un terreno también sirve como garantía o solo casas?",
    a: "Sí, un terreno también puede ser ofrecido en garantía. Además de casas, departamentos y locales comerciales, Prestaclub puede estructurar operaciones respaldadas con terrenos urbanos con cerco perimétrico y otros inmuebles que cumplan con los criterios de evaluación. La viabilidad de la operación dependerá, entre otros aspectos, del valor de realización del inmueble, determinado mediante una tasación profesional, de su situación legal y registral, y del cumplimiento de los requisitos establecidos por el fondo de inversión que otorgará el financiamiento. Si el inmueble resulta apto para respaldar la operación, podrás acceder a una alternativa de financiamiento sin necesidad de vender tu propiedad.",
  },
  {
    q: "¿Cuánto demora el desembolso?",
    a: "El tiempo de desembolso depende de las características de cada operación. Factores como la situación legal y registral del inmueble, la disponibilidad de la documentación requerida, los resultados de la evaluación y el cumplimiento de las condiciones necesarias para el cierre de la operación pueden influir en los plazos. Por ello, no es posible establecer una fecha exacta sin realizar una evaluación previa. En Prestaclub, el proceso se desarrolla por etapas, que comprenden la precalificación, la tasación y revisión legal del inmueble, la estructuración de la operación, la formalización ante notario y, una vez cumplidas las condiciones correspondientes, el desembolso por parte del fondo de inversión o inversionista. Desde el inicio del proceso, se informa al cliente una estimación razonable de los tiempos de acuerdo con las características específicas de su operación.",
  },
  {
    q: "¿Qué costos tiene aparte de los intereses?",
    a: "Además de los intereses y demás condiciones financieras aplicables al financiamiento otorgado por el fondo de inversión o inversionista, existen determinados gastos asociados a la formalización de la operación. Entre ellos se encuentran la tasación del inmueble, realizada por un perito especializado para determinar su valor; los gastos notariales derivados de la formalización de la garantía; y los derechos registrales correspondientes a la inscripción de la hipoteca en SUNARP. El monto de estos conceptos dependerá de las características de la operación, del valor del inmueble y de las tarifas aplicables por los profesionales y entidades intervinientes. Antes de la suscripción de la documentación, Prestaclub informa al cliente, de manera clara y por escrito, los costos estimados de la operación, así como las principales condiciones del financiamiento.",
  },
  {
    q: "¿Prestaclub presta el dinero directamente? ¿Es confiable?",
    a: "No. En las operaciones con garantía hipotecaria, Prestaclub no otorga directamente el financiamiento. Su función consiste en estructurar la operación y brindar asesoría legal y financiera durante todo el proceso. El financiamiento es otorgado por fondos de inversión, de acuerdo con sus políticas y criterios de evaluación. Por su parte, Prestaclub se encuentra inscrita en el registro de la Superintendencia de Banca, Seguros y AFP (SBS) como empresa que realiza operaciones de préstamo con garantía mobiliaria, actividad que desarrolla conforme al marco normativo aplicable. Las operaciones con garantía hipotecaria se formalizan mediante los instrumentos legales correspondientes, incluyendo escritura pública e inscripción de la garantía en SUNARP cuando corresponda, lo que brinda seguridad jurídica y transparencia a todas las partes involucradas. Este modelo permite evaluar cada operación de manera integral, considerando no solo el historial crediticio, sino también el valor del inmueble, la capacidad de pago y las características particulares de cada caso, ofreciendo una alternativa formal para quienes buscan acceder a financiamiento con garantía hipotecaria fuera del esquema tradicional del crédito bancario, sin recurrir a mecanismos informales de financiamiento.",
  },
];
