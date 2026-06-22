"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { trackWhatsAppClick } from "@/shared/lib/tracking";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LocationModal } from "@/shared/components/LocationModal";

const MobileStickyBar = () => {
  const { whatsappUrl, getWhatsAppUrl, clearTracking, isPaid } = useTrafficTracking();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isHipotecarioPage = pathname?.includes("financiamiento-con-garantia-hipotecaria") || pathname?.includes("capital-de-trabajo");
  const isVehicularPage = pathname?.includes("prestamo-con-garantia-vehicular");
  const isHomePage = pathname === "/";
  const isArticulosPage = pathname?.includes("articulos");
  const isNosotrosPage = pathname?.includes("nosotros");
  const isContactoPage = pathname?.includes("contacto");

  const shouldShowModal = isHipotecarioPage || isHomePage || isArticulosPage || isNosotrosPage || isContactoPage;

  // Para tráfico orgánico (sin campaña), usamos las 3 primeras letras de la
  // página actual como prefijo del mensaje. Ej: "/" -> "hom", "/nosotros" -> "nos".
  const getPagePrefix = () => {
    const segment = pathname === "/" ? "home" : (pathname?.split("/").filter(Boolean)[0] ?? "web");
    return segment.slice(0, 3).toLowerCase();
  };

  const getComputedWhatsappUrl = () => {
    const prefix = isPaid ? "" : `[${getPagePrefix()}] `;
    if (isVehicularPage) return getWhatsAppUrl(`${prefix}Hola, quiero información sobre el crédito con garantía vehicular con custodia`);
    // Orgánico: inyectamos [xxx] con la página de origen.
    if (!isPaid) return getWhatsAppUrl(`${prefix}Hola *PrestaClub*. Necesito más información sobre financiamientos.`);
    return whatsappUrl;
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (shouldShowModal) {
      e.preventDefault();
      setIsModalOpen(true);
    } else {
      if (isVehicularPage) {
        trackWhatsAppClick({
          button_location: "mobile_bar_vehicular",
          destino: "Garantía Vehicular",
        });
      } else {
        trackWhatsAppClick({ button_location: "mobile_bar_global" });
      }
      clearTracking();
    }
  };

  const proceedToWhatsApp = (data: { location: string; useType: string }) => {
    trackWhatsAppClick({
      button_location: "mobile_bar_hipotecario",
      destino: data.useType,
      ubicacion: data.location,
    });
    clearTracking();
    // Orgánico: anteponemos [xxx] con la página de origen al mensaje.
    const prefix = isPaid ? "" : `[${getPagePrefix()}] `;
    const customMessage = `${prefix}Hola *PrestaClub*. Mi inmueble está en *${data.location}* y lo usaré para *${data.useType}*. Necesito más información sobre financiamientos.`;
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

