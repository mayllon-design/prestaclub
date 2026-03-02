"use client";

import { MessageCircle } from "lucide-react";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LocationModal } from "@/shared/components/LocationModal";

const WhatsAppButton = () => {
  const { whatsappUrl, clearTracking } = useTrafficTracking();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Verificamos si estamos en la sección de financiamiento hipotecario
  const isHipotecarioPage = pathname?.includes("financiamiento-con-garantia-hipotecaria");

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
    if (isHipotecarioPage) {
      e.preventDefault();
      setIsModalOpen(true);
    } else {
      trackWhatsAppConversion("global_floating_button");
      clearTracking();
    }
  };

  const proceedToWhatsApp = () => {
    trackWhatsAppConversion("hipotecario_floating_button");
    clearTracking();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <a
        id="whatsapp-floating-button"
        href={whatsappUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[hsl(142,70%,45%)] text-primary-foreground shadow-xl hover:shadow-2xl hover:brightness-110 flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label="Escríbenos por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {isHipotecarioPage && (
        <LocationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={proceedToWhatsApp}
        />
      )}
    </>
  );
};

export default WhatsAppButton;

