"use client";

import { MessageCircle } from "lucide-react";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LocationModal } from "@/shared/components/LocationModal";

const WhatsAppButton = () => {
  const { whatsappUrl, getWhatsAppUrl, clearTracking } = useTrafficTracking();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Verificamos si estamos en la sección de financiamiento hipotecario, sus derivadas, home, nosotros, artículos o contacto
  const isHipotecarioPage = pathname?.includes("financiamiento-con-garantia-hipotecaria") || pathname?.includes("capital-de-trabajo");
  const isVehicularPage = pathname?.includes("prestamo-con-garantia-vehicular");
  const isBusinessPage = pathname?.includes("prestamos-con-garantia-hipotecaria-para-empresas");
  const isHomePage = pathname === "/";
  const isArticulosPage = pathname?.includes("articulos");
  const isNosotrosPage = pathname?.includes("nosotros");
  const isContactoPage = pathname?.includes("contacto");

  const shouldShowModal = isHipotecarioPage || isHomePage || isArticulosPage || isNosotrosPage || isContactoPage;

  const getComputedWhatsappUrl = () => {
    if (isBusinessPage) return "#convertir";
    if (isVehicularPage) return getWhatsAppUrl("Hola, quiero información sobre el crédito con garantía vehicular con custodia");
    return whatsappUrl;
  };

  const trackWhatsAppConversion = (location: string) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "whatsapp_click",
        button_location: location,
        page_path: pathname,
      });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isBusinessPage) {
      e.preventDefault();
      const element = document.getElementById("convertir");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        
        // Efecto visual para llamar la atención (shake) en el contenedor del formulario
        const formContainer = document.getElementById("form-container");
        const targetToShake = formContainer || element;

        targetToShake.classList.remove("animate-shake");
        void targetToShake.offsetWidth;
        targetToShake.classList.add("animate-shake");
      }
    } else if (shouldShowModal) {
      e.preventDefault();
      setIsModalOpen(true);
    } else {
      trackWhatsAppConversion("global_floating_button");
      clearTracking();
    }
  };

  const proceedToWhatsApp = (data: { location: string; useType: string }) => {
    trackWhatsAppConversion(isHomePage ? "home_floating_button" : "hipotecario_floating_button");
    clearTracking();
    
    const customMessage = `Hola *PrestaClub*. Mi inmueble está en *${data.location}* y lo usaré para *${data.useType}*. Necesito más información sobre financiamientos.`;
    const url = getWhatsAppUrl(customMessage);
    
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <a
        id="whatsapp-floating-button"
        href={getComputedWhatsappUrl()}
        onClick={handleClick}
        target={isBusinessPage ? undefined : "_blank"}
        rel={isBusinessPage ? undefined : "noopener noreferrer"}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[hsl(142,70%,45%)] text-primary-foreground shadow-xl hover:shadow-2xl hover:brightness-110 flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label="Escríbenos por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
          1
        </span>
      </a>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={proceedToWhatsApp}
      />
    </>
  );
};

export default WhatsAppButton;

