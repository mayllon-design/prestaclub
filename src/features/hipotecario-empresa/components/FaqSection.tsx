"use client";

import { faqsEmpresa } from "@/features/hipotecario-empresa/faqsEmpresa";

export const FaqSection = () => {
  return (
    <section className="section-padding bg-background" id="preguntas-frecuentes">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center leading-tight">
          Preguntas frecuentes sobre préstamos para empresas
        </h2>
        <div className="space-y-4">
          {faqsEmpresa.map((faq, i) => (
            <details key={i} className="card-elevated group overflow-hidden">
              <summary className="p-6 cursor-pointer font-bold text-foreground flex justify-between items-center gap-4 bg-card hover:bg-muted/30 transition-colors list-none">
                {faq.q}
                <span className="text-gold shrink-0 text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="p-6 pt-0 text-muted-foreground font-body leading-relaxed border-t border-border/50">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
