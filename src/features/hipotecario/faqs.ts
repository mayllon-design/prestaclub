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
    a: "Sí. En Prestaclub, estar en Infocorp o tener un historial crediticio irregular no te descalifica. La evaluación se centra en el valor de tu propiedad y en tu realidad económica completa — tu negocio, tus ingresos reales aunque no estén en planilla — y no solo en tu calificación en las centrales de riesgo. Es justamente la diferencia con el banco: donde ellos ven un reporte, nosotros vemos a un propietario con patrimonio. Eso sí, la propiedad debe estar inscrita en SUNARP y la operación pasa por una evaluación seria; flexible no significa sin filtros.",
  },
  {
    q: "¿Cuánto dinero me prestan por mi casa?",
    a: "Hasta el 40% del valor de realización de tu propiedad. En Prestaclub las operaciones para personas van desde S/ 10,000 hasta 1 Millón de soles (y desde S/ 150,000 en adelante para empresas con RUC 20). El valor exacto se confirma con una tasación profesional durante la evaluación — no con el precio que tú estimas ni con el autovalúo municipal.",
  },
  {
    q: "¿Puedo perder mi casa con este tipo de préstamo?",
    a: "Te lo decimos sin rodeos, como es: tu propiedad queda como garantía, y si la deuda no se paga, puede ejecutarse — igual que en cualquier hipoteca, incluida la de un banco. Ahora, hay tres cosas que juegan a tu favor: el financiamiento es máximo el 40% del valor, así que tu casa siempre vale mucho más que la deuda; la cuota se estructura para que puedas pagarla según tu realidad; y tienes asesoría legal durante todo el proceso, así que sabes exactamente qué firmas. El negocio de un fondo serio está en que pagues tu cuota, no en quedarse con tu propiedad.",
  },
  {
    q: "¿Qué requisitos piden para evaluar mi caso?",
    a: "Menos de los que crees. Lo esencial: una propiedad inscrita en SUNARP (casa, departamento, local o terreno, tuya o de un familiar que participe como garante), tener 28 años o más, un destino claro para el dinero y estar en Lima Metropolitana o Callao. Lo que NO te van a pedir en Prestaclub: boletas de pago, ingresos en planilla ni un Infocorp limpio. Para arrancar bastan tu DNI, la partida registral y el HR/PU del inmueble.",
  },
  {
    q: "¿Puedo usar la casa de mis padres o de un familiar como garantía?",
    a: "Sí, y es más común de lo que imaginas: la casa está a nombre de los papás y el negocio es del hijo. La condición es que el propietario del inmueble participe en la operación como garante, firmando con pleno conocimiento, y que la propiedad esté inscrita en SUNARP con la titularidad clara. Todo se formaliza ante notario, así que el familiar está protegido con la misma asesoría legal que tú.",
  },
  {
    q: "¿Un terreno también sirve como garantía o solo casas?",
    a: "También sirve. Prestaclub evalúa terrenos urbanos con cerco perimétrico inscritos en SUNARP, además de casas, departamentos, locales comerciales y construcciones en proceso. Lo que importa es el valor de realización del inmueble — que alcance para respaldar el monto con la regla del 40% — y que la titularidad esté limpia, sin cargas imposibles de levantar. Si tienes un terreno parado que te costó años comprar, puede ser la llave para el capital que necesitas sin venderlo.",
  },
  {
    q: "¿Cuánto demora el desembolso?",
    a: "Depende de tu caso — sobre todo de qué tan rápido fluya la documentación de tu propiedad —, y desconfía de quien te prometa una fecha exacta sin haber visto tus papeles. Lo que sí te aseguramos en Prestaclub: el proceso está estructurado por etapas (precalificación el mismo día, tasación y revisión legal, estructuración y firma ante notario, desembolso), y desde el primer contacto te damos una expectativa realista de tiempos para tu operación concreta. Nadie te tiene semanas en el aire sin saber qué sigue.",
  },
  {
    q: "¿Qué costos tiene aparte de los intereses?",
    a: "Tres, y te los contamos antes de que firmes nada: la tasación (el informe profesional que confirma el valor de tu propiedad, se paga al inicio), los gastos notariales (la escritura pública de la garantía) y los gastos registrales (la inscripción de la hipoteca en SUNARP). Los montos exactos dependen del valor de tu inmueble y de la notaría, por eso en Prestaclub te los detallan por escrito en la propuesta, junto con la cuota y el plazo. Sin letra chica ni cobros sorpresa a mitad de camino.",
  },
  {
    q: "¿Prestaclub presta el dinero directamente? ¿Es confiable?",
    a: "Prestaclub no es un banco ni un prestamista: es una empresa peruana registrada ante la SBS que estructura tu operación y te conecta con fondos de inversión, que son quienes desembolsan el capital. ¿Qué significa para ti? Respaldo institucional real — contratos con escritura pública, garantía inscrita en SUNARP y asesoría legal en cada etapa — con una flexibilidad de evaluación que la banca tradicional no ofrece. Es el punto medio que muchos propietarios en Lima buscan: ni el rechazo automático del banco, ni el riesgo de un prestamista informal.",
  },
];
