"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LocationModal } from "@/shared/components/LocationModal";

const MobileStickyBar = () => {
  const { whatsappUrl, clearTracking } = useTrafficTracking();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isHipotecarioPage = pathname?.includes("financiamiento-con-garantia-hipotecaria");

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (isHipotecarioPage) {
      e.preventDefault();
      setIsModalOpen(true);
    } else {
      clearTracking();
    }
  };

  const proceedToWhatsApp = () => {
    clearTracking();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-primary border-t border-primary-foreground/10 shadow-2xl">
        <div className="flex">
          <a
            href={whatsappUrl}
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

export default MobileStickyBar;

