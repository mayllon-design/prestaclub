// Avisa a Bing (y a los demás buscadores de IndexNow) qué URLs cambiaron, para que
// las vuelvan a rastrear en horas y no en semanas.
//
// Uso, siempre DESPUÉS de que el deploy esté publicado:
//   npm run indexnow                      -> avisa todas las URLs del sitemap en vivo
//   npm run indexnow -- /capital-de-trabajo /articulos/mi-articulo   -> solo esas
//
// La clave se valida con public/<clave>.txt, que debe estar publicado en el sitio.

const HOST = "prestaclub.com";
const SITE = `https://${HOST}`;
const KEY = "7a86a0a4d6909a21094ba6bbae352494";
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function urlsDelSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`No se pudo leer el sitemap (${res.status})`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const args = process.argv.slice(2);
  const urls = args.length
    ? args.map((a) => (a.startsWith("http") ? a : `${SITE}${a.startsWith("/") ? a : `/${a}`}`))
    : await urlsDelSitemap();

  // Antes de avisar, confirmamos que la clave ya está publicada; si no, IndexNow rechaza el aviso.
  const clave = await fetch(`${SITE}/${KEY}.txt`);
  if (!clave.ok || (await clave.text()).trim() !== KEY) {
    throw new Error(`La clave no está publicada en ${SITE}/${KEY}.txt. Haz el deploy primero.`);
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
  });

  // 200 = recibido; 202 = recibido, clave pendiente de validar (normal la primera vez).
  console.log(`IndexNow respondió ${res.status} ${res.statusText} para ${urls.length} URLs`);
  if (res.status !== 200 && res.status !== 202) {
    console.log(await res.text());
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
