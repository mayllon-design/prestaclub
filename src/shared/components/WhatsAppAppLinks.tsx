"use client";

import { useEffect } from "react";
import { handleWhatsAppLinkClick } from "@/shared/lib/whatsapp";

// En Android, hace que los enlaces <a href="https://wa.me/..."> abran la app de WhatsApp
// directamente. Ver src/shared/lib/whatsapp.ts.
export default function WhatsAppAppLinks() {
  useEffect(() => {
    window.addEventListener("click", handleWhatsAppLinkClick);
    return () => window.removeEventListener("click", handleWhatsAppLinkClick);
  }, []);
  return null;
}
