"use client";

import { Zap, LayoutGrid, Scale, Building2, TrendingUp, HandCoins } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Velocidad Estratégica",
      description: "Dinero disponible cuando tu negocio lo exige. Sin demoras innecesarias.",
      icon: Zap,
      color: "gold",
    },
    {
      title: "Flexibilidad Total",
      description: "Condiciones a la medida de tu negocio.",
      icon: LayoutGrid,
      color: "primary",
    },
    {
      title: "Mayor Financiamiento",
      description: "Montos significativamente mayores que cualquier préstamo personal o bancario tradicional.",
      icon: Scale,
      color: "gold",
    },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 italic uppercase tracking-tighter">Beneficios para crecer</h2>
          <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="card-elevated group p-10 md:p-14 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-border/50 rounded-[50px]">
              <div className={`h-24 w-24 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 bg-muted group-hover:bg-primary/10`}>
                <b.icon className={`h-12 w-12 text-primary`} />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter leading-none">{b.title}</h3>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl opacity-50" />
    </section>
  );
};
