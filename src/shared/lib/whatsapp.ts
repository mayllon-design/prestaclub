// Abrir WhatsApp de forma que funcione en todos los navegadores de Android.
//
// Los enlaces https://wa.me/... dependen de que el navegador se los pase a la app.
// Chrome lo hace, pero el navegador de Huawei y los navegadores internos de
// Facebook, Instagram y TikTok cargan la página web de WhatsApp ("Abrir aplicación /
// Descárgala ahora") y la persona tiene que tocar otra vez, o cree que no tiene la app.
//
// En Android abrimos primero la app con whatsapp://send. Si en 1,5 s la página sigue
// visible (la app no está instalada o el navegador no la abrió), caemos a wa.me.
// En computadora y en iPhone se mantiene wa.me, que ya funciona bien ahí.

const FALLBACK_MS = 1500;

export const isAndroid = () =>
  typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

export const isWhatsAppUrl = (url: string) =>
  /^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com\/send)/i.test(url);

// https://wa.me/51921010200?text=Hola -> whatsapp://send?phone=51921010200&text=Hola
export function toAppLink(url: string): string | null {
  try {
    const u = new URL(url);
    const phone =
      u.hostname === "wa.me" ? u.pathname.replace(/\//g, "") : u.searchParams.get("phone") ?? "";
    if (!/^\d{6,15}$/.test(phone)) return null;
    const text = u.searchParams.get("text");
    return `whatsapp://send?phone=${phone}${text ? `&text=${encodeURIComponent(text)}` : ""}`;
  } catch {
    return null;
  }
}

function openInAndroidApp(url: string) {
  const appLink = toAppLink(url);
  if (!appLink) {
    window.location.href = url;
    return;
  }

  let leftPage = false;
  const onVisibility = () => {
    if (document.visibilityState === "hidden") leftPage = true;
  };
  document.addEventListener("visibilitychange", onVisibility);
  window.location.href = appLink;

  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", onVisibility);
    if (!leftPage) window.location.href = url;
  }, FALLBACK_MS);
}

// Reemplaza a window.open(url, "_blank") en todos los botones y wizards.
export function openWhatsApp(url: string) {
  if (typeof window === "undefined") return;
  if (isAndroid() && isWhatsAppUrl(url)) {
    openInAndroidApp(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

// Para enlaces <a href="https://wa.me/..."> sueltos (artículos, contacto, footer):
// en Android, intercepta el clic y abre la app. Se registra en `window` para que
// GTM, que escucha en `document`, vea el clic antes y siga contando la conversión.
export function handleWhatsAppLinkClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
  if (!isAndroid()) return;
  const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!anchor || !isWhatsAppUrl(anchor.href)) return;
  event.preventDefault();
  openInAndroidApp(anchor.href);
}
