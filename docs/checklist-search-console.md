# Checklist — Reindexación en Google Search Console

> Acciones a realizar en Google Search Console **después de desplegar** la tanda SEO.
> GSC necesita los cambios en vivo para reprocesarlos. Los cambios de posición tardan semanas.

## Paso 0 — Desplegar
Publicar los cambios a producción antes de solicitar indexación.

---

## A. Solicitar indexación manual — "Inspeccionar URL → Solicitar indexación"
> GSC tiene **cuota diaria** para solicitudes manuales (~10/día). Prioriza estas.

### Páginas nuevas (lo más importante)
- https://prestaclub.com/financiamiento-con-garantia-hipotecaria/terreno
- https://prestaclub.com/financiamiento-con-garantia-hipotecaria/estando-en-infocorp

### Páginas con cambios de contenido / posicionamiento
- https://prestaclub.com/
- https://prestaclub.com/financiamiento-con-garantia-hipotecaria
- https://prestaclub.com/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas
- https://prestaclub.com/prestamo-con-garantia-vehicular
- https://prestaclub.com/prestamos-con-garantia-hipotecaria-para-empresas
- https://prestaclub.com/capital-de-trabajo
- https://prestaclub.com/financiamiento-con-garantia-hipotecaria/construccion
- https://prestaclub.com/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca
- https://prestaclub.com/desarrollo-inmobiliario

---

## B. Reenviar el sitemap (cubre el resto automáticamente)
En GSC → **Sitemaps** → reenviar:

    https://prestaclub.com/sitemap.xml

Con esto Google descubre las 2 páginas nuevas y reprocesa las **canonicales corregidas** de las institucionales sin pedirlas una por una:
- /nosotros
- /contacto
- /articulos
- /preguntas-frecuentes
- /saneamiento-predial
- /terminos-y-condiciones
- /politica-de-privacidad
- /gestion-de-devoluciones-de-saldo

---

## C. Artículo fusionado (redirección 301)
El artículo viejo `…/articulos/proceso-financiamiento-garantia-hipotecaria-peru` ahora **redirige (301)**.
Solo inspecciona / solicita indexación del **destino**:

- https://prestaclub.com/articulos/financiamiento-garantia-hipotecaria-peru

Google dará de baja el viejo por su cuenta.

---

## Notas
- **`/llms.txt` NO va a Search Console** — es para buscadores de IA (ChatGPT, Perplexity, Gemini), no para Google.
- Tras solicitar indexación, tarda de horas a días; los cambios de **posición**, semanas.
- Valida los datos estructurados nuevos en la **Prueba de resultados enriquecidos**
  (search.google.com/test/rich-results):
  - Home → Organization
  - /contacto → LocalBusiness (3 oficinas)
  - /preguntas-frecuentes → FAQPage
- Revisa a las ~2-4 semanas el informe **Páginas** / **Rendimiento**: las landings deberían
  salir de "Duplicada, Google eligió otra canónica" y empezar a ganar impresiones/clics.
