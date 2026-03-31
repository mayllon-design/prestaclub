"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/shared/components/ui/slider";
import { Button } from "@/shared/components/ui/button";
import { Info, Calculator, MessageSquareText } from "lucide-react";

export const CalculatorSection = () => {
  const [monto, setMonto] = useState(100000);
  const [plazo, setPlazo] = useState(12);

  // Tasa estimada mensual (referencial)
  //const tasaMensual = 0.012; // 1.2% mensual
  const tasaMensual = 0.0153; // 1.53% mensual

  const cuotaEstimada = useMemo(() => {
    // Cálculo simple de cuota (amortización francesa o interés simple)
    // Para simplificar y siendo solo referencial, usamos interés simple aproximado
    /*const totalInteres = monto * tasaMensual * plazo;
    const cuota = (monto + totalInteres) / plazo;*/
    const totalInteres = monto * tasaMensual;
    const precuota = 1 - Math.pow(1 + tasaMensual, -plazo);
    const cuota = totalInteres / precuota;

    return Math.round(cuota);
  }, [monto, plazo, tasaMensual]);

  return (
    <section className="section-padding bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Calcula la Liquidez que tu EMPRESA necesita</h2>
            <p className="text-muted-foreground font-body text-lg">Proyecta el crecimiento de tu empresa hoy mismo.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch pt-8">
            {/* Formulario Calculadora */}
            <div className="card-elevated p-8 md:p-12 space-y-12 bg-white/50 backdrop-blur-xl border border-white/20">
              <div className="space-y-8">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-muted/50">
                  <label className="text-sm font-black text-muted-foreground uppercase tracking-widest">Monto solicitado</label>
                  <span className="text-3xl font-black text-primary italic">S/ {monto.toLocaleString()}</span>
                </div>
                <Slider
                  min={100000}
                  max={5000000}
                  step={10000}
                  value={[monto]}
                  onValueChange={(val) => setMonto(val[0])}
                  className="py-4 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                  <span>S/ 150,000</span>
                  <span>S/ 5,000,000</span>
                </div>
              </div>

              <div className="space-y-8 pt-4">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-muted/50">
                  <label className="text-sm font-black text-muted-foreground uppercase tracking-widest">Plazo (Meses)</label>
                  <span className="text-3xl font-black text-primary italic">{plazo} Meses</span>
                </div>
                <Slider
                  min={48}
                  max={60}
                  step={3}
                  value={[plazo]}
                  onValueChange={(val) => setPlazo(val[0])}
                  className="py-4 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                  <span>48 Meses</span>
                  <span>60 Meses</span>
                </div>
              </div>
            </div>

            {/* Resultado */}
            <div className="bg-navy rounded-[40px] p-10 md:p-14 text-white flex flex-col justify-between shadow-3xl shadow-navy/20">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="h-14 w-14 bg-gold rounded-2xl flex items-center justify-center shadow-2xl shadow-gold/40">
                    <Calculator className="h-7 w-7 text-navy" />
                  </div>
                  <div className="text-right">
                    <div className="text-gold text-xs font-bold uppercase tracking-widest mb-1">Cuota Estimada</div>
                    <div className="text-4xl md:text-5xl font-black italic">S/ {cuotaEstimada.toLocaleString()}*</div>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-gold" />
                    </div>
                    <p className="text-white/80 font-body text-sm font-medium">Tasa referencial desde 1.53% mensual</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-gold" />
                    </div>
                    <p className="text-white/80 font-body text-sm font-medium">Sujeto a evaluación crediticia y tasación</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-gold" />
                    </div>
                    <p className="text-white/80 font-body text-sm font-medium">Garantía hipotecaria obligatoria</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-white/10">
                <Button variant="gold" size="xl" className="w-full h-16 text-lg font-bold" asChild>
                  <a href={`https://wa.me/51921010200?text=Hola PrestaClub, usé la calculadora de empresas y me interesa solicitar S/ ${monto.toLocaleString()} a ${plazo} meses.`} target="_blank">
                    <MessageSquareText className="mr-3 h-6 w-6" /> CONTACTAR A UN ASESOR
                  </a>
                </Button>
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <Info className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <p className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-body italic uppercase tracking-tighter">
                    *Toda operación está sujeta a previa evaluación. Los montos, plazos y tasas definitivas se establecerán en el contrato de financiamiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
