# Metodología SEO/GEO — PrestaClub

> Documento de referencia interno. Adaptación del playbook de 10 pasos de Vicky Lalwani
> ("Claude Fable 5.1 Should Be Illegal for SEO") al proyecto y rubro de PrestaClub.
> Todo el trabajo se produce como **borrador para aprobación humana**; nada se publica solo.

## Business Brief (verdad base)

- **Negocio:** fintech peruana de financiamiento alternativo con **garantía real**. Inscrita en
  **SBS** (Resolución N° 02627-2020), reporta a la **UIF**. +24 años, +15,000 operaciones,
  +S/700M desembolsados. Fondeo = **fondos de inversión institucionales** (NO es banco ni
  prestamista tradicional).
- **Comprador:** personas naturales o empresas **con una propiedad o vehículo** que necesitan
  liquidez y muchas veces fueron **rechazadas por bancos** o están **reportadas en Infocorp**.
- **Productos, URLs y cobertura:**
  | Producto | URL | Cobertura |
  |---|---|---|
  | Préstamo con garantía hipotecaria (casa/local/terreno, desde S/10,000, aún en Infocorp) | `/financiamiento-con-garantia-hipotecaria` | Lima y Callao |
  | ↳ Capital de trabajo | `/capital-de-trabajo` | Lima y Callao |
  | ↳ Construcción | `/financiamiento-con-garantia-hipotecaria/construccion` | Lima y Callao |
  | ↳ Consolidación de deudas | `/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas` | Lima y Callao |
  | ↳ Compra de hipoteca | `/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca` | Lima y Callao |
  | **Crédito con garantía vehicular CON CUSTODIA** (el auto queda en custodia segura hasta cancelar; hasta 180 días) | `/prestamo-con-garantia-vehicular` | Lima y Callao |
  | Hipotecario para empresas (S/20k–S/5M, evaluación 15 días) | `/prestamos-con-garantia-hipotecaria-para-empresas` | Lima y Callao |
  | **Desarrollo inmobiliario** / financiamiento puente | `/desarrollo-inmobiliario` | **Todo el Perú** |
  | Saneamiento predial (servicio legal) | `/saneamiento-predial` | Lima y Callao |
- **Conversión = LEAD por WhatsApp** (botón flotante, barra móvil, wizard "precalificar") y
  teléfono (01) 202-1500. **No hay checkout ni pricing online.**
- **Confianza / E-E-A-T:** SBS, UIF, miembro Fintech Perú, +24 años, resolución SBS pública.
- **Legal / YMYL:** contenido financiero regulado → prioridad a **precisión, autoría y TCEA**;
  no se inventan tasas ni cifras.

> ⚠️ **Precisión del producto vehicular:** es **CON CUSTODIA** (el vehículo queda en custodia).
> Aunque en el buscador mucha gente busca "sin custodia / sin dejar el auto", **no** se debe
> describir el producto como "sin custodia": sería un dato falso (crítico en YMYL).

## Regla de selección de modelo

| Modelo | Cuándo |
|---|---|
| **Fable 5.1** (`claude-fable-5-1`) | Auditoría integral de principio a fin, en **una sola pasada** (Pasos 1-2). |
| **Opus 5** (`claude-opus-5`) | Trabajo **página por página** (Pasos 3, 4, 5, 6, edición del 10). |
| **Sonnet 5** (`claude-sonnet-5`) | **Chequeos rápidos** y verificaciones (Pasos 7, 8, 9, verificación del 10). |

## Datos necesarios (Google Search Console)

- Informe **Rendimiento** (Web), **90 días completos**, foco Perú.
- Export **Consultas** y **Páginas** (Clics, Impresiones, CTR, Posición).
- **Consultas filtradas por página** para el shortlist del Paso 1.
- Separar **marca** (`prestaclub`, `presta club`, typos) de **no-marca** (filtro `-prestaclub`).
- Recordatorio: **impresiones de GSC ≠ volumen de búsqueda de keyword**.

## Los 10 pasos, adaptados a PrestaClub

| Paso | Versión PrestaClub | Modelo |
|---|---|---|
| **Setup** | Business brief real (arriba): comprador, problema (bancos lo rechazan / Infocorp), features verificadas (SBS, desde S/10k, fondos institucionales, vehicular CON custodia), cobertura, CTA = WhatsApp/precalificar. | Opus 5 |
| **1** | De los 90 días, hallar **5 páginas** con impresiones en búsquedas de intención de préstamo (no-marca). Tabla: URL, query, clics, impresiones, posición, tendencia, edición. | **Fable 5.1** |
| **2** | Mapear **búsquedas de compra reales** del rubro → ¿ya hay página o falta? Resolver **canibalización** home vs landing. Atender el choque de intención vehicular ("sin custodia" en el buscador vs producto CON custodia). | **Fable 5.1** |
| **3** | La **corrección publicable** de mayor impacto en una página que ya rankea. En YMYL: dato desactualizado, **TCEA/condiciones** faltantes, prueba (SBS). Copy actual vs propuesto + fuente. | Opus 5 |
| **4** | 3 **páginas programáticas** de muestra útiles: por caso de uso (capital de trabajo/construcción/consolidación/compra de hipoteca) o por situación ("estando en Infocorp", "con terreno", "sin historial"). Rechazar páginas que solo cambian keyword. | Opus 5 |
| **5** | **Comparativa** que gana búsquedas de decisión ("garantía hipotecaria vs crédito hipotecario de banco"), con tabla y fuentes (sin inventar tasas). | Opus 5 |
| **6** | Frases de **enlazado interno** con intención (blog → landings de producto; entre sub-productos). Ancla natural. 10 links con punto de inserción. | Opus 5 |
| **7** | **GEO/AI-search**: 5-8 prompts fijos del rubro (ej. "¿dónde consigo un préstamo con mi casa en Lima estando en Infocorp?") y revisar citas en ChatGPT/Perplexity/Gemini. Conecta con pendientes: **Organization + LocalBusiness schema + llms.txt**. | Sonnet 5 |
| **8** | **Outreach** a medios/blogs financieros e inmobiliarios peruanos con contenido útil (sin comprar enlaces). | Sonnet 5 |
| **9** | Guion de **video 2 min** aprovechando el YouTube existente (simulador/wizard en pantalla). | Sonnet 5 |
| **10** | Publicar lo aprobado (editar código → deploy), **preservar versión previa**, verificar URLs en vivo, y baseline midiendo la conversión trackeada (**whatsapp_click / hipotecario_wizard**) además de posición/impresiones. | Opus 5 + Sonnet 5 |

## Adaptaciones clave del rubro (no estaban en el artículo original)

- **YMYL + E-E-A-T:** por ser dinero/finanzas, Google exige más rigor; un dato falso penaliza más.
- **SEO local:** foco Lima/Callao + 3 oficinas → pesa **LocalBusiness schema** y señales locales.
  (Excepción: Desarrollo Inmobiliario es **nacional**.)
- **Conversión = lead, no venta:** el éxito se mide con eventos de WhatsApp/wizard, no checkout.
- **GEO integrado:** cerrar de paso Organization/LocalBusiness schema + llms.txt (alimentan el Paso 7).

## Estado del SEO técnico (base ya hecha, complementaria al playbook)

- ✅ Canonical propia en todas las páginas · robots.txt · sitemap dinámico · favicon PNG ·
  verificación GSC · FAQPage schema (landing hipotecaria) · títulos/anclas "préstamo con garantía hipotecaria".
- ❌ Pendiente GEO: Organization schema · LocalBusiness schema · llms.txt · FAQPage en `/preguntas-frecuentes`.
