"use client";

import { LayoutGrid } from "lucide-react";

export const RequirementsSection = () => {
  return (
    <section className="py-12 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="card-elevated p-10 bg-muted/10 border border-border/50 rounded-[40px] text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-left space-y-2">
              <h4 className="text-2xl font-black text-foreground uppercase tracking-tighter italic">¿No estás seguro de calificar?</h4>
              <p className="text-muted-foreground font-body text-lg">No te preocupes, evaluamos cada caso de manera confidencial y flexible.</p>
            </div>
            <div className="h-1 w-20 md:h-16 md:w-1 bg-gold/20 rounded-full" />
            <a 
              href="https://wa.me/51921010200?text=Hola PrestaClub, no estoy seguro si califico para un préstamo empresarial, ¿me podrían asesorar?" 
              target="_blank"
              className="flex items-center gap-3 font-black text-primary hover:text-gold transition-all group tracking-widest uppercase italic"
            >
              Preguntar por WhatsApp <LayoutGrid className="h-6 w-6 group-hover:rotate-90 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32" />
    </section>
  );
};
