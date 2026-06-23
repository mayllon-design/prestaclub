"use client";

import { MessageCircle, ClipboardList } from "lucide-react";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

// CTA de WhatsApp para los artículos del blog.
// Cada artículo se identifica con [Blog {id}] en tráfico orgánico;
// si el visitante viene de campaña, se respeta el prefijo [source campaign].
export const ArticleWhatsAppCTA = ({ blogId }: { blogId: string }) => {
  const { getWhatsAppUrl } = useTrafficTracking();
  const blogTag = `Blog ${blogId}`;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href={getWhatsAppUrl("Hola deseo evaluar mi caso", { organicPrefix: blogTag })}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 bg-gold text-gold-foreground font-bold px-6 py-3.5 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md hover:shadow-gold/40 text-sm"
      >
        <ClipboardList className="h-4 w-4 flex-shrink-0" />
        Evaluar mi caso
      </a>
      <a
        href={getWhatsAppUrl("Hola quisiera más información", { organicPrefix: blogTag })}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 bg-white/10 border border-white/25 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 active:scale-95 transition-all duration-200 text-sm"
      >
        <MessageCircle className="h-4 w-4 flex-shrink-0" />
        Hablar por WhatsApp
      </a>
    </div>
  );
};
