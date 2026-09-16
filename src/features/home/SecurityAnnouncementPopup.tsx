"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Tiempo antes de que el aviso se cierre solo (en milisegundos).
const AUTO_CLOSE_MS = 3000;

const SecurityAnnouncementPopup = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    // Espera a que termine la animación de salida antes de desmontar.
    setTimeout(() => setVisible(false), 250);
  };

  useEffect(() => {
    // Se muestra solo una vez por sesión del navegador para no ser intrusivo.
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem("pc_anuncio_seguridad") === "1";
    } catch {
      // sessionStorage puede fallar (modo incógnito, etc.): mostramos igual.
    }
    if (alreadyShown) return;

    setVisible(true);
    try {
      sessionStorage.setItem("pc_anuncio_seguridad", "1");
    } catch {
      /* no-op */
    }

    const timer = setTimeout(() => handleClose(), AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={handleClose}
      role="dialog"
      aria-label="Aviso de seguridad PrestaClub"
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
        <img
          src="/anuncio-seguridad.png"
          alt="Aviso: PrestaClub no solicita pagos a cuentas personales, Yape o Plin. Todo pago es únicamente a cuentas oficiales de PRESTACLUB S.A.C. Consultas al 202-1500."
          className="w-full h-auto rounded-2xl shadow-2xl"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default SecurityAnnouncementPopup;
