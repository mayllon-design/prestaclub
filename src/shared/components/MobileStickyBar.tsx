"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LocationModal } from "@/shared/components/LocationModal";

const MobileStickyBar = () => {
  const { whatsappUrl, getWhatsAppUrl, clearTracking } = useTrafficTracking();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isHipotecarioPage = pathname?.includes("financiamiento-con-garantia-hipotecaria") || pathname?.includes("capital-de-trabajo");
  const isVehicularPage = pathname?.includes("prestamo-con-garantia-vehicular");
  const isHomePage = pathname === "/";
  const isArticulosPage = pathname?.includes("articulos");
  const isNosotrosPage = pathname?.includes("nosotros");
  const isContactoPage = pathname?.includes("contacto");

  const shouldShowModal = isHipotecarioPage || isHomePage || isArticulosPage || isNosotrosPage || isContactoPage;

  const getComputedWhatsappUrl = () => {
    if (isVehicularPage) return getWhatsAppUrl("Hola, quiero información sobre el crédito con garantía vehicular con custodia");
    return whatsappUrl;
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (shouldShowModal) {
      e.preventDefault();
      setIsModalOpen(true);
    } else {
      clearTracking();
    }
  };

  const proceedToWhatsApp = (data: { location: string; useType: string }) => {
    clearTracking();
    const customMessage = `Hola *PrestaClub*. Mi inmueble está en *${data.location}* y lo usaré para *${data.useType}*. Necesito más información sobre financiamientos.`;
    const url = getWhatsAppUrl(customMessage);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-primary border-t border-primary-foreground/10 shadow-2xl">
        <div className="flex">
          <a
            href={getComputedWhatsappUrl()}
            onClick={handleWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/10 transition-colors"
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
          <div className="w-px bg-primary-foreground/20" />
          <a
            href="tel:012021500"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/10 transition-colors"
          >
            <Phone className="h-5 w-5" /> Llamar
          </a>
        </div>
      </div>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={proceedToWhatsApp}
      />
    </>
  );
};

export default MobileStickyBar;

