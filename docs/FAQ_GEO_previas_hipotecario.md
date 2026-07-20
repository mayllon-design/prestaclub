# Preguntas frecuentes · Préstamo con Garantía Hipotecaria (set previo)
### Bloque GEO — versión optimizada de las 7 FAQ que tenía la landing antes del reemplazo

> Este documento reescribe en formato GEO las preguntas que ya existían en
> `/financiamiento-con-garantia-hipotecaria`, incluyendo **"¿Están inscritos en la SBS?"**.
> Sirve como referencia para decidir cuáles conservar o fusionar con el bloque de 9.

---

**1. ¿Me pueden dar un préstamo con garantía hipotecaria si estoy en Infocorp?**

Sí. En Prestaclub, estar en Infocorp o tener un historial crediticio irregular no te descalifica para un préstamo con garantía hipotecaria. La evaluación se centra en el valor de tu propiedad y en tu realidad económica completa, no solo en tu calificación en las centrales de riesgo. Eso sí: la propiedad debe estar inscrita en SUNARP y toda operación pasa por una evaluación seria.

**2. ¿Qué tipo de propiedades aceptan como garantía?**

Los fondos de inversión con los que trabaja Prestaclub aceptan casas, departamentos, terrenos, locales comerciales e inmuebles industriales, siempre que estén inscritos en SUNARP. Importante: Prestaclub solo evalúa propiedades ubicadas en Lima Metropolitana y Callao — por el momento no atiende provincias. La titularidad debe estar clara, y las cargas o gravámenes se revisan durante la evaluación legal de la partida registral.

**3. ¿Puedo obtener financiamiento si tengo deudas?**

Sí. En Prestaclub cada caso se evalúa de manera integral: tener deudas vigentes, estar reportado en Infocorp o no poder demostrar ingresos en planilla no cierra la puerta. De hecho, la consolidación de deudas es uno de los destinos más frecuentes del préstamo con garantía hipotecaria: unificar varias cuotas caras en una sola, respaldada por tu inmueble. Lo que se evalúa es el valor de realización de la propiedad y la viabilidad de tu operación, no tu score.

**4. ¿Puedo perder mi casa con este tipo de préstamo?**

Tu propiedad queda como garantía y, si la deuda no se paga, puede ejecutarse — igual que en cualquier hipoteca, incluida la de un banco. A tu favor: en Prestaclub el financiamiento es máximo el 40% del valor de realización, así que tu casa siempre vale mucho más que la deuda; la cuota se estructura según tu realidad; y tienes asesoría legal durante todo el proceso, así que sabes exactamente qué firmas. El negocio de un fondo de inversión serio está en que pagues tu cuota, no en quedarse con tu propiedad.

**5. ¿Puedo usar la casa de mis padres o de un familiar como garantía?**

Sí, y es más común de lo que imaginas: la casa está a nombre de los papás y el negocio es del hijo. En Prestaclub la condición es que el propietario del inmueble participe en la operación como garante, firmando con pleno conocimiento, y que la propiedad esté inscrita en SUNARP con la titularidad clara. Todo se formaliza ante notario, así que el familiar está protegido con la misma asesoría legal que tú.

**6. ¿Cuánto tiempo tarda el proceso?**

Con Prestaclub puedes tener el desembolso hasta en 3 días hábiles luego de la firma de la minuta. Antes de ese punto, el proceso avanza por etapas: precalificación el mismo día, tasación profesional y revisión legal de la partida registral, estructuración de la operación con el fondo de inversión, y firma ante notario con inscripción de la garantía en SUNARP. El tiempo total depende sobre todo de qué tan rápido fluya la documentación de tu propiedad.

**7. ¿Están inscritos en la SBS?**

Sí. Prestaclub está inscrito en la Superintendencia de Banca, Seguros y AFP (SBS) en el **Registro de Empresas de Préstamo**, y reporta a la **Unidad de Inteligencia Financiera (UIF)** por sus actividades de crédito; sus actividades de asesoría legal y financiera no requieren registro. Prestaclub no es un banco ni un prestamista informal: estructura la operación y conecta al propietario con fondos de inversión, que son quienes desembolsan el capital. Ese registro es la diferencia entre un camino formal —con escritura pública, garantía inscrita en SUNARP y asesoría legal— y el riesgo de un prestamista de la esquina.

---

*Nota de implementación: marcar las preguntas con datos estructurados FAQPage (schema.org) y mantener cada respuesta autocontenida — nombre de marca + servicio + dato concreto en cada una — para máxima citabilidad en LLMs.*

---

## ⚠️ Conflictos con el bloque de 9 actualmente publicado

| # | Tema | Conflicto |
|---|---|---|
| **6** | Tiempos | ✅ **RESUELTO** — se decidió mantener la política del bloque publicado: *"desconfía de quien te prometa una fecha exacta"*. La P6 de este documento (**"hasta 3 días hábiles"**) queda como registro histórico: **NO reutilizar.** |
| **2** | Cobertura | Este set aclara **"solo Lima Metropolitana y Callao"**. El bloque de 9 no lo dice de forma tan explícita (solo aparece dentro de la P4 de requisitos). |
| **7** | SBS | Este set es **mucho más específico** (Registro de Empresas de Préstamo + UIF). La P9 del bloque publicado solo dice "registrada ante la SBS". |
| **3** | Deudas | Se solapa con la P1 (Infocorp) — aquí se reenfocó hacia consolidación de deudas para diferenciarla. |

**Recomendación:** llevar la **P7 (SBS)** y la aclaración de **cobertura (P2)** al bloque de 9 publicado.

## Política de tiempos vigente

**Decisión:** no se prometen fechas exactas **antes de la firma de minuta**, porque esa etapa
depende de qué tan rápido fluya la documentación del cliente. Se comunica el proceso por etapas
y una expectativa realista por caso.

**Sí se puede comprometer el tramo post-firma**, que es el que Prestaclub sí controla
(documentación ya validada, tasación hecha, garantía en trámite).

| Archivo | Texto | Estado |
|---|---|---|
| `app/financiamiento-con-garantia-hipotecaria/page.tsx` | meta description: ~~*"Proceso en 7-15 días hábiles"*~~ | ✅ **Corregido** → *"Evaluamos aunque estés en Infocorp."* Prometía el proceso completo (pre-firma). |
| `features/hipotecario/BuyerHipotecarioPage.tsx` | *"Desembolso hasta en 3 días hábiles, **luego de la firma de minuta**"* | ✅ **Se mantiene.** Es post-firma → compatible con la política. **No cambiar.** |

> **Regla práctica:** si la promesa de tiempo incluye la palabra *"luego de la firma de minuta"*
> (o equivalente), es válida. Si promete el proceso completo desde el primer contacto, no lo es.

*(Empresas y Vehicular tienen sus propios plazos declarados; son productos distintos y no
entran en conflicto con esta política.)*
