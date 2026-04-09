"use client";

import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export const GapSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-16 text-center">
          La Brecha (Problema vs. <span className="text-primary italic">Solución</span>)
        </h2>

        <div className="grid md:grid-cols-2 gap-0 border border-border/50 rounded-3xl overflow-hidden shadow-2xl">
          {/* Bancos (Problema) */}
          <div className="bg-muted/30 p-10 md:p-16 relative">
            <div className="flex items-center gap-4 mb-8 text-muted-foreground opacity-50">
              <div className="h-10 w-10 bg-muted/50 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest">Bancos Tradicionales</h3>
            </div>

            <ul className="space-y-6">
              {[
                "Procesos de hasta 2 meses.",
                "Rechazos por historial crediticio.",
                "Copamiento de líneas de crédito.",
                "Evaluación de crédito rígida.",
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle className="h-5 w-5 text-destructive shrink-0 mt-1" />
                  <p className="text-muted-foreground font-body text-lg leading-relaxed">{p}</p>
                </li>
              ))}
            </ul>

            <div className="absolute top-1/2 -right-6 hidden md:flex h-12 w-12 rounded-full bg-background border border-border items-center justify-center z-20">
              <span className="text-xs font-black text-foreground">VS</span>
            </div>
          </div>

          {/* Nosotros (Solución) */}
          <div className="bg-navy p-10 md:p-16 relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-10 bg-gold rounded-lg flex items-center justify-center shadow-lg shadow-gold/20">
                <CheckCircle2 className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest">PrestaClub</h3>
            </div>

            <ul className="space-y-6">
              {[
                "Desembolso en 3 días hábiles (luego de la firma de minuta).",
                "Evaluamos el potencial de tu negocio, no solo el pasado.",
                "Tasas competitivas y estructuras de pago diseñadas para empresas.",
                "Procesos ágiles con asesoría personalizada de inicio a fin.",
                "Flexibilidad ante complicaciones en el pago.",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-4 animate-in fade-in slide-in-from-right-4 delay-200 duration-700">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-1" />
                  <p className="text-white font-body text-lg leading-relaxed">{s}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32" />
    </section>
  );
};
