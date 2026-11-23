"use client";

// Popup de la web, configurado desde /admin/popup (imagen, encendido, duración y páginas).
// Se muestra una vez por sesión del navegador; si se guarda un cambio en el admin,
// vuelve a mostrarse aunque el visitante ya lo haya visto.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { aplicaEnRuta, type PopupConfig } from "./types";

const CLAVE = "pc_popup_visto";

const SitePopup = () => {
  const pathname = usePathname() ?? "/";
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let cancelado = false;
    fetch("/api/popup")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelado && data?.activo) setConfig(data as PopupConfig);
      })
      .catch(() => {});
    return () => {
      cancelado = true;
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), 250);
  };

  useEffect(() => {
    if (!config || visible || !aplicaEnRuta(config.paginas, pathname)) return;

    let yaVisto = false;
    try {
      yaVisto = sessionStorage.getItem(CLAVE) === config.version;
    } catch {
      // sessionStorage puede fallar (modo incógnito, etc.): mostramos igual.
    }
    if (yaVisto) return;

    setClosing(false);
    setVisible(true);
    try {
      sessionStorage.setItem(CLAVE, config.version);
    } catch {
      /* no-op */
    }

    if (config.duracion_ms > 0) {
      const timer = setTimeout(handleClose, config.duracion_ms);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, pathname]);

  if (!visible || !config) return null;

  return (
    <div
      onClick={handleClose}
      role="dialog"
      aria-label={config.alt_text || "Aviso PrestaClub"}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`relative w-full max-w-[300px] sm:max-w-[320px] transition-all duration-200 ${
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100 animate-in fade-in zoom-in-95"
        }`}
      >
        <button
          onClick={handleClose}
          aria-label="Cerrar aviso"
          className="absolute -top-3 -right-3 z-10 h-8 w-8 rounded-full bg-white text-primary shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X className="h-4 w-4" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={config.image_url}
          alt={config.alt_text}
          className="w-full h-auto rounded-2xl shadow-2xl"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default SitePopup;
