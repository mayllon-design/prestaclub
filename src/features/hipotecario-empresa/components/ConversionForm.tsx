"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { MessageSquare, Send, CheckCircle2, Star, UserCheck2, Landmark } from "lucide-react";

export const ConversionForm = () => {
  const [formData, setFormData] = useState({
    ruc: "",
    nombre: "",
    telefono: "",
    monto: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío
    setTimeout(() => {
      const message = `Hola PrestaClub, mi nombre es ${formData.nombre} (${formData.ruc}), mi teléfono es ${formData.telefono} y solicito un financiamiento de S/ ${formData.monto}.`;
      window.open(`https://wa.me/51921010200?text=${encodeURIComponent(message)}`, "_blank");
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <footer className="section-padding bg-navy relative overflow-hidden" id="convertir">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Info */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-6 w-6 fill-gold text-gold" />)}
                <span className="ml-4 text-white/60 font-black uppercase tracking-widest text-xs tracking-widest">Líder en perú</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter italic">
                Es hora de <span className="text-gold">escalar</span> tu negocio
              </h2>
              <p className="text-xl text-white/70 font-body leading-relaxed max-w-md">
                Completa tus datos y un asesor senior se comunicará contigo en menos de 24 horas para una evaluación gratuita.
              </p>
            </div>

            <div className="space-y-6 pt-10 border-t border-white/10">
              <div className="flex items-center gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-gold/20 group-hover:border-gold/30">
                  <UserCheck2 className="h-7 w-7 text-gold" />
                </div>
                <div>
                  <div className="text-white font-black uppercase tracking-tighter text-lg tracking-widest">Evaluación Humana</div>
                  <div className="text-white/40 text-sm font-body">Entendemos tu giro de negocio.</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-gold/20 group-hover:border-gold/30">
                  <Landmark className="h-7 w-7 text-gold" />
                </div>
                <div>
                  <div className="text-white font-black uppercase tracking-tighter text-lg tracking-widest">Registrados en la SBS</div>
                  <div className="text-white/40 text-sm font-body tracking-wider">Seguridad total en cada proceso legal.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-3xl shadow-black/40 relative">
            <div className="absolute -top-6 -right-6 flex rotate-12 scale-110">
              <div className="bg-gold text-navy font-black py-4 px-6 rounded-2xl shadow-2xl uppercase tracking-tighter text-center leading-none">
                Evaluación<br /><span className="text-sm">Gratuita y confidencial</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-black text-navy uppercase tracking-widest italic" htmlFor="ruc">RUC de la empresa</label>
                <Input id="ruc" type="text" placeholder="20XXXXXXXXX" className="h-14 rounded-2xl border-2 border-muted/50 focus:border-primary px-6" value={formData.ruc} onChange={handleChange} required />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-navy uppercase tracking-widest italic" htmlFor="nombre">Nombre del Representante</label>
                <Input id="nombre" type="text" placeholder="Tu nombre completo" className="h-14 rounded-2xl border-2 border-muted/50 focus:border-primary px-6" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-navy uppercase tracking-widest italic" htmlFor="telefono">Teléfono de contacto</label>
                <Input id="telefono" type="tel" placeholder="999 999 999" className="h-14 rounded-2xl border-2 border-muted/50 focus:border-primary px-6" value={formData.telefono} onChange={handleChange} required />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-navy uppercase tracking-widest italic" htmlFor="monto">Monto solicitado (S/)</label>
                <Input id="monto" type="number" placeholder="Ej: 100,000" className="h-14 rounded-2xl border-2 border-muted/50 focus:border-primary px-6" value={formData.monto} onChange={handleChange} required />
              </div>

              <div className="pt-6">
                <Button variant="hero" type="submit" size="xl" className="w-full h-16 shadow-2xl shadow-gold/20" disabled={isSubmitting}>
                  {isSubmitting ? "ENVIANDO..." : isSuccess ? <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> ENVIADO</span> : "SOLICITAR EVALUACIÓN"}
                </Button>
              </div>

              <p className="text-[10px] text-muted-foreground text-center font-body italic uppercase tracking-widest mt-6">
                Al enviar este formulario, aceptas nuestra <a href="/politica-de-privacidad-de-prestaclub.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">política de privacidad</a> y el tratamiento de tus datos personales conforme a la ley peruana.
              </p>
            </form>
          </div>
        </div>

        <div className="mt-32 pt-16 border-t border-white/10 text-center">
          <p className="text-white/40 font-body text-sm lowercase leading-relaxed transition-all duration-1000">© 2026 PrestaClub - Financiamiento Empresarial con Garantía Hipotecaria.<br />Inscritos en el Registro de Empresas de Préstamo de la SBS.</p>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
    </footer>
  );
};
