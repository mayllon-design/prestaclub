"use client";

import { FileSearch, UserSquare2, TrendingUp, Building2, LayoutGrid, CheckCircle2 } from "lucide-react";

export const RequirementsSection = () => {
    const requirements = [
        {
          title: "Inmueble SUNARP",
          description: "Debe estar inscrito en registros públicos (Local, oficina, almacén o casa).",
          icon: Building2,
          color: "primary",
        },
        {
          title: "Representantes Legales",
          description: "DNI vigente de los representantes legales de la empresa.",
          icon: UserSquare2,
          color: "gold",
        },
        {
          title: "Sustento de Ingresos",
          description: "Estados de cuenta o declaraciones de los últimos 3 meses.",
          icon: TrendingUp,
          color: "primary",
        },
      ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 uppercase tracking-tighter">Requisitos Simplificados</h2>
            <p className="text-muted-foreground font-body text-lg italic lowercase transition-all delay-75 duration-700">Evita el papeleo innecesario de la banca tradicional.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((r, i) => (
              <div key={i} className="card-elevated group p-10 md:p-14 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-border/50 rounded-[48px] bg-background">
                <div className="h-24 w-24 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 bg-muted/50 group-hover:bg-primary/10">
                  <r.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter text-left">{r.title}</h3>
                <p className="text-muted-foreground font-body text-lg leading-relaxed text-left">{r.description}</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-gold/50 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-navy" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Aprobado</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 card-elevated p-10 bg-muted/10 border border-border/50 rounded-[40px] text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
             <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-left space-y-2">
                    <h4 className="text-2xl font-black text-foreground uppercase tracking-tighter italic">¿No estás seguro de calificar?</h4>
                    <p className="text-muted-foreground font-body text-lg">No te preocupes, evaluamos cada caso de manera humana y flexible.</p>
                </div>
                <div className="h-1 w-20 md:h-16 md:w-1 bg-gold/20 rounded-full" />
                <button className="flex items-center gap-3 font-black text-primary hover:text-gold transition-all group tracking-widest uppercase italic">
                    Preguntar por WhatsApp <LayoutGrid className="h-6 w-6 group-hover:rotate-90 transition-transform" />
                </button>
             </div>
          </div>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32" />
    </section>
  );
};
