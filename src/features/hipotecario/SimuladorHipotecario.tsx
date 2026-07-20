"use client";

import { useState } from "react";
import { Calculator, ArrowRight, AlertTriangle } from "lucide-react";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { trackWhatsAppClick } from "@/shared/lib/tracking";
import { LocationModal } from "@/shared/components/LocationModal";

// ─── Reglas del producto (referenciales) ───
// Monto:
//   1. El valor de realización equivale a ~70% del valor comercial declarado.
//   2. El monto máximo evaluable es el 40% de ese valor de realización.
//      => Efectivo sobre el valor comercial: 0.70 x 0.40 = 28%.
const FACTOR_REALIZACION = 0.7;
const LTV_SOBRE_REALIZACION = 0.4;
const MONTO_MINIMO = 10000;

// Cuota:
//   La tasa final se define tras la evaluación y va de TASA_MIN a TASA_MAX.
//   El cálculo se hace SIEMPRE con TASA_REFERENCIAL (valor intermedio del rango).
//   A la operación se le suma ~7% por gastos administrativos, notariales y
//   registrales, que se financia junto al capital.
const TASA_MIN_MENSUAL = 0.011;
const TASA_MAX_MENSUAL = 0.0272;
const TASA_REFERENCIAL = 0.023;
const GASTOS_OPERACION = 0.07;
const PLAZOS = [12, 24, 36, 48, 60, 72];
const PLAZO_DEFAULT = 36;

const formatSoles = (n: number) => `S/ ${Math.round(n).toLocaleString("es-PE")}`;
const formatPct = (n: number) => `${(n * 100).toFixed(2)}%`;

// Amortización francesa: cuota = monto x i / (1 - (1+i)^-n)
const calcularCuota = (monto: number, tasa: number, plazo: number) =>
  (monto * tasa) / (1 - Math.pow(1 + tasa, -plazo));

type Resultado = {
  valorComercial: number;
  montoMaximo: number;
  gastos: number;
  totalFinanciado: number;
  cuota: number;
  plazo: number;
  bajoMinimo: boolean;
};

export const SimuladorHipotecario = () => {
  const { getWhatsAppUrl, clearTracking } = useTrafficTracking();
  const [valorPropiedad, setValorPropiedad] = useState("");
  const [plazo, setPlazo] = useState(PLAZO_DEFAULT);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // El modal recoge ubicación y destino; el mensaje suma lo que ya calculó el simulador.
  const proceedToWhatsApp = (data: { location: string; useType: string }) => {
    if (!resultado) return;

    trackWhatsAppClick({
      button_location: "hipotecario_simulador",
      destino: data.useType,
      monto: resultado.montoMaximo,
      ubicacion: data.location,
    });
    clearTracking();

    const message =
      `Hola *PrestaClub*. Mi inmueble está en *${data.location}* y lo usaré para *${data.useType}*, ` +
      `utilicé el cotizador por un monto de ${formatSoles(resultado.montoMaximo)} ` +
      `cuotas mensuales aprox. de ${formatSoles(resultado.cuota)}. ` +
      `Necesito más información sobre el proceso.`;

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  const valor = parseFloat(valorPropiedad) || 0;
  const puedeCalcular = valor > 0;

  const calcular = () => {
    if (!puedeCalcular) return;
    const montoMaximo = valor * FACTOR_REALIZACION * LTV_SOBRE_REALIZACION;
    const gastos = montoMaximo * GASTOS_OPERACION;
    const totalFinanciado = montoMaximo + gastos;
    setResultado({
      valorComercial: valor,
      montoMaximo,
      gastos,
      totalFinanciado,
      plazo,
      cuota: calcularCuota(totalFinanciado, TASA_REFERENCIAL, plazo),
      bajoMinimo: montoMaximo < MONTO_MINIMO,
    });
  };

  return (
    <>
    <div className="mt-12 rounded-3xl hero-gradient p-6 md:p-10 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
          <Calculator className="h-5 w-5 text-gold" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-primary-foreground">
          Calcula tu monto y tu cuota mensual
        </h3>
      </div>

      {/* Valor de la propiedad */}
      <div className="mb-6">
        <label htmlFor="sim-valor" className="block text-sm font-semibold text-primary-foreground/80 mb-2">
          ¿Cuánto vale aproximadamente tu propiedad? (S/)
        </label>
        <input
          id="sim-valor"
          type="number"
          inputMode="numeric"
          min={0}
          value={valorPropiedad}
          onChange={(e) => {
            setValorPropiedad(e.target.value);
            setResultado(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && calcular()}
          placeholder="100000"
          className="w-full h-14 px-5 rounded-xl bg-white text-navy text-lg font-bold outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      {/* Plazo */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-primary-foreground/80 mb-2">
          ¿En cuántos meses quieres pagarlo?
        </label>
        <div className="flex flex-wrap gap-2">
          {PLAZOS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setPlazo(p);
                setResultado(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                plazo === p
                  ? "bg-gold text-gold-foreground"
                  : "bg-white/10 text-primary-foreground/70 hover:bg-white/20 border border-white/15"
              }`}
            >
              {p} meses
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={calcular}
        disabled={!puedeCalcular}
        className="btn-cta w-full sm:w-auto !py-4 !px-8 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Calcular monto y cuota
      </button>

      {resultado && !resultado.bajoMinimo && (
        <div className="mt-8 rounded-2xl border border-gold/40 bg-white/5 p-6 md:p-8">
          {/* Las 2 cifras protagonistas */}
          <div className="grid sm:grid-cols-2 gap-6 sm:divide-x sm:divide-white/15">
            <div>
              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">
                Puedes acceder hasta
              </p>
              <p className="text-3xl md:text-4xl font-extrabold text-primary-foreground leading-none">
                {formatSoles(resultado.montoMaximo)}
              </p>
            </div>
            <div className="sm:pl-6">
              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">
                Cuota mensual referencial
              </p>
              <p className="text-3xl md:text-4xl font-extrabold text-primary-foreground leading-none">
                {formatSoles(resultado.cuota)}
                <span className="text-base font-bold text-primary-foreground/60"> /mes</span>
              </p>
            </div>
          </div>

          {/* Desglose: mostramos la matemática para que se entienda de dónde sale */}
          <div className="space-y-2.5 border-t border-white/15 pt-5 mt-6">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-primary-foreground/60 font-body">Valor de tu propiedad</span>
              <span className="text-primary-foreground/80 font-semibold">{formatSoles(resultado.valorComercial)}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gold font-body font-semibold">Monto máximo</span>
              <span className="text-gold font-bold">{formatSoles(resultado.montoMaximo)}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-primary-foreground/60 font-body">
                Gastos admin., notariales y registrales ({formatPct(GASTOS_OPERACION)})
              </span>
              <span className="text-primary-foreground/80 font-semibold">+ {formatSoles(resultado.gastos)}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-primary-foreground/60 font-body">Total financiado</span>
              <span className="text-primary-foreground/80 font-semibold">{formatSoles(resultado.totalFinanciado)}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm pt-2 border-t border-white/10">
              <span className="text-primary-foreground/60 font-body">Plazo elegido</span>
              <span className="text-primary-foreground/80 font-semibold">{resultado.plazo} meses</span>
            </div>
          </div>

          <p className="text-xs text-primary-foreground/60 font-body mt-4 leading-relaxed">
            Resultado referencial, sujeto a evaluación y tasación; no constituye una oferta. La cuota incluye
            el {formatPct(GASTOS_OPERACION)} de gastos administrativos, notariales y registrales, financiados
            junto al capital. Calculamos con una tasa referencial de {formatPct(TASA_REFERENCIAL)} mensual; tu
            tasa final se define tras la evaluación y puede ir de {formatPct(TASA_MIN_MENSUAL)} a{" "}
            {formatPct(TASA_MAX_MENSUAL)} mensual.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-cta mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 !py-3.5 !px-6"
          >
            Solicitar evaluación gratuita <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {resultado?.bajoMinimo && (
        <div className="mt-8 rounded-2xl border border-amber-400/50 bg-amber-400/10 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-primary-foreground mb-1">
                Tu propiedad está por debajo del mínimo que evaluamos.
              </p>
              <p className="text-sm text-primary-foreground/80 font-body leading-relaxed">
                Con {formatSoles(resultado.valorComercial)} el monto accesible sería{" "}
                {formatSoles(resultado.montoMaximo)}, y nuestro mínimo es {formatSoles(MONTO_MINIMO)}. Para
                llegar a ese piso, tu inmueble debería valer desde{" "}
                <strong className="text-primary-foreground">
                  {formatSoles(MONTO_MINIMO / (FACTOR_REALIZACION * LTV_SOBRE_REALIZACION))}
                </strong>
                .{" "}
                <a href="#precalificar" className="text-gold font-bold underline underline-offset-2 hover:brightness-110">
                  Aun así, escríbenos <ArrowRight className="inline h-3.5 w-3.5" />
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

    </div>

    <LocationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={proceedToWhatsApp}
    />
    </>
  );
};
