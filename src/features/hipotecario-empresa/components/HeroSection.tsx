"use client";

import { Button } from "@/shared/components/ui/button";
import { ArrowRight, ShieldCheck, Landmark } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden hero-gradient py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-gold tracking-wide uppercase">Capital para Empresas</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Liquidez de <span className="text-gradient-gold">S/ 20,000 a S/ 5,000,000</span> para tu empresa en tiempo récord.
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-10 max-w-2xl mx-auto font-body animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Sin la burocracia de los bancos. Financiamiento con garantía hipotecaria diseñado para expansión, licitaciones y capital de trabajo.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Button variant="hero" size="xl" className="shadow-2xl shadow-gold/20" asChild>
              <a href="#convertir">Solicitar Evaluación Gratuita <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Social Proof Cintillo */}
      <div className="mt-20 border-y border-white/10 bg-white/5 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Landmark className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white uppercase tracking-tighter">Regulado por</div>
                <div className="text-lg font-black text-white">SBS</div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-white/20 hidden md:block" />
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white uppercase tracking-tighter">Inscrito en</div>
                <div className="text-lg font-black text-white">SMV</div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-white/20 hidden md:block" />
            
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-white italic">+23 años</div>
              <div className="text-xs text-white/60 leading-none">de trayectoria<br/>en el mercado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
