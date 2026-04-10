"use client";

import { Play, Quote, Star } from "lucide-react";

export const TestimonialsSection = () => {
  const videos = [
    {
      title: "Licitación Ganada",
      angle: "Crecimiento",
      videoId: "W-yAvCtOj1E", // Ejemplo de ID, el usuario mencionó guiones anteriores
      description: "Cómo logramos la liquidez para una licitación pública en tiempo récord.",
    },
    {
      title: "Modernización de Planta",
      angle: "Escalamiento",
      videoId: "t8WuJhqTfbQ",
      description: "Financiamiento para maquinaria sin depender de la banca tradicional.",
    },
    {
      title: "Financiamiento Alternativo",
      angle: "Opción a la Banca",
      videoId: "SSUumDN0gZw",
      description: "La alternativa real cuando los bancos dicen que NO a tu Pyme.",
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Casos de Éxito Empresarial</h2>
          <p className="text-muted-foreground font-body text-lg italic capitalize tracking-widest">Empresas que ya están escalando con nosotros.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((v, i) => (
            <div key={i} className="card-elevated group rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 bg-background border border-border/50">
              {/* Video Thumbnail / Embed */}
              <div className="aspect-video relative overflow-hidden bg-black/5">
                <iframe
                  src={`https://www.youtube.com/embed/${v.videoId}?rel=0`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-gold/20 text-gold rounded-full">{v.angle}</span>
                </div>
                <h3 className="text-xl font-black text-foreground mb-3 leading-tight uppercase tracking-tight">{v.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed lowercase first-letter:uppercase">{v.description}</p>

                <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(64 + j)}
                      </div>
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-gold/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
