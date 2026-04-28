"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { CheckCircle2, ArrowRight, ArrowLeft, Star, Banknote, Ban } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import VideoSection from "@/shared/components/VideoSection";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

import { WizardData } from "@/shared/types/hipotecario";
import { LocationModal } from "@/shared/components/LocationModal";
import { useRouter } from "next/navigation";


const WizardHipotecario = ({ buyerType, onComplete }: { buyerType: string; onComplete: (data: WizardData) => void }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({
    nombre: "", celular: "", email: "", tipoPersona: "", montoAprox: "",
    ubicacionInmueble: "", tipoInmueble: "", situacionRegistral: "", usoDelCapital: buyerType, privacidad: false,
  });

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const update = (field: keyof WizardData, value: string | boolean) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const canNext = () => {
    if (step === 0) return data.nombre && data.celular;
    if (step === 1) return data.tipoPersona && data.montoAprox;
    if (step === 2) return data.ubicacionInmueble && data.ubicacionInmueble !== "Provincia" && data.tipoInmueble && data.situacionRegistral;
    if (step === 3) return data.privacidad;
    return false;
  };

  return (
    <div className="card-elevated p-8 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-semibold text-muted-foreground mb-2">
          <span>Paso {step + 1} de {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full gold-gradient rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Tus datos de contacto</h3>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Nombre completo *</label>
            <input type="text" value={data.nombre} onChange={e => update("nombre", e.target.value)} className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Tu nombre completo" maxLength={100} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Celular *</label>
            <input type="tel" value={data.celular} onChange={e => update("celular", e.target.value)} className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="999 999 999" maxLength={15} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Email (opcional)</label>
            <input type="email" value={data.email} onChange={e => update("email", e.target.value)} className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="tu@email.com" maxLength={255} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Sobre tu solicitud</h3>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Tipo de persona *</label>
            <div className="grid grid-cols-2 gap-3">
              {["Persona Natural", "Empresa"].map(opt => (
                <button key={opt} onClick={() => update("tipoPersona", opt)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${data.tipoPersona === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{opt}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Monto aproximado *</label>
            <div className="grid grid-cols-2 gap-3">
              {["S/ 50 mil - S/ 150 mil", "S/ 150 mil - S/ 300 mil", "S/ 300 mil - S/ 500 mil", "Más de S/ 500 mil"].map(opt => (
                <button key={opt} onClick={() => update("montoAprox", opt)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${data.montoAprox === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{opt}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Sobre la propiedad</h3>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Ubicación del inmueble *</label>
            <div className="grid grid-cols-3 gap-3">
              {["Lima", "Callao", "Provincia"].map(opt => (
                <button key={opt} onClick={() => update("ubicacionInmueble", opt)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${data.ubicacionInmueble === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{opt}</button>
              ))}
            </div>
          </div>
          
          {data.ubicacionInmueble === "Provincia" ? (
            <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ban className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="text-lg font-bold text-foreground">🚫 Lo sentimos</h4>
              <p className="text-sm text-muted-foreground mt-2 font-body">
                Por el momento solo válido para inmuebles ubicados en <strong>Lima Metropolitana y Callao</strong>.
              </p>
              <Button variant="outline" size="sm" className="mt-4 rounded-xl" asChild>
                <Link href="/nosotros">Conoce más aquí</Link>
              </Button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Tipo de inmueble *</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Casa", "Departamento", "Terreno", "Local Comercial"].map(opt => (
                    <button key={opt} onClick={() => update("tipoInmueble", opt)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${data.tipoInmueble === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{opt}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Situación registral *</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Inscrito en SUNARP", "En proceso", "No sé"].map(opt => (
                    <button key={opt} onClick={() => update("situacionRegistral", opt)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${data.situacionRegistral === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{opt}</button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Resumen de tu solicitud</h3>
          <div className="bg-muted/50 rounded-xl p-5 space-y-3">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Nombre:</span><span className="text-sm font-semibold text-foreground">{data.nombre}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Celular:</span><span className="text-sm font-semibold text-foreground">{data.celular}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Tipo:</span><span className="text-sm font-semibold text-foreground">{data.tipoPersona}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Monto:</span><span className="text-sm font-semibold text-foreground">{data.montoAprox}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Inmueble:</span><span className="text-sm font-semibold text-foreground">{data.tipoInmueble}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Ubicación:</span><span className="text-sm font-semibold text-foreground">{data.ubicacionInmueble}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Uso:</span><span className="text-sm font-semibold text-foreground">{data.usoDelCapital}</span></div>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={data.privacidad} onChange={e => update("privacidad", e.target.checked)} className="mt-1 h-4 w-4 rounded border-input accent-primary" />
            <span className="text-sm text-muted-foreground">Acepto la <a href="/politica-de-privacidad-de-prestaclub.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">Política de Privacidad</a> y autorizo el tratamiento de mis datos personales.</span>
          </label>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center gap-4 mt-8 w-full">
        {step > 0 ? (
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="h-4 w-4" /> Anterior
          </Button>
        ) : <div className="hidden sm:block" />}
        {step < totalSteps - 1 ? (
          <Button variant="gold" className="w-full sm:w-auto" onClick={() => setStep(step + 1)} disabled={!canNext()}>
            Siguiente <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="gold" size="lg" className="w-full sm:w-auto" onClick={() => onComplete(data)} disabled={!canNext()}>
            ENVIAR POR WHATSAPP <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

interface BuyerPageProps {
  title: string;
  subtitle: string;
  heroDescription: string;
  problems: string[];
  solution: string;
  buyerType: string;
  videoId?: string;
  isVertical?: boolean;
}

const BuyerPage = ({ title, subtitle, heroDescription, problems, solution, buyerType, videoId, isVertical }: BuyerPageProps) => {
  const { getWhatsAppUrl, clearTracking, campaign } = useTrafficTracking();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}`;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLocationModalOpen(true);
  };

  const proceedToWhatsApp = (data: { location: string; useType: string }) => {
    clearTracking();
    const customMessage = `Hola *PrestaClub*. Mi inmueble está en *${data.location}* y lo usaré para *${data.useType}*. Necesito más información sobre financiamientos.`;
    const url = getWhatsAppUrl(customMessage);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWizardComplete = (data: WizardData) => {
    const message = `Hola, estoy interesado en un financiamiento con garantía hipotecaria.\n\nYa completé las preguntas en la web y estos son mis datos:\n\n` +
      `Nombre: ${data.nombre}\nCelular: ${data.celular}\nEmail: ${data.email || 'No proporcionado'}\n` +
      `Tipo: ${data.tipoPersona}\nMonto: ${data.montoAprox}\n` +
      `Inmueble: ${data.tipoInmueble} en ${data.ubicacionInmueble}\n` +
      `Registral: ${data.situacionRegistral}\nUso: ${data.usoDelCapital}${campaign ? `\n\nRef: [${campaign}]` : ''}`;

    window.open(getWhatsAppUrl(message), "_blank");
    clearTracking();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-6">
            <Banknote className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-gold">{subtitle}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">{title}</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body mb-8">{heroDescription}</p>
          <Button variant="hero" size="xl" asChild>
            <a href="#wizard">PRECALIFICAR AHORA <ArrowRight className="h-5 w-5" /></a>
          </Button>
        </div>
      </section>

      {/* Problems */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center">Problemas frecuentes que resolvemos</h2>
          <div className="space-y-3">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-4 card-elevated">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <p className="text-foreground font-body">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground mb-6">Nuestra solución</h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">{solution}</p>
        </div>
      </section>

      {/* Videos */}
      <VideoSection title="Conoce cómo funciona" videoId={videoId} isVertical={isVertical} />
      {/* <VideoSection title="Video específico sobre esta solución" /> */}

      {/* Advantages vs banks */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center">Ventajas frente a bancos tradicionales</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Apruebas aunque tu historial creditico sea negativo",
              "Proceso más rápido: Puedes tener tu desembolso hasta en 3 días hábiles, luego de la firma de minuta",
              "Menos requisitos documentarios",
              "Atención personalizada de inicio a fin",
              "Flexibilidad en montos y condiciones",
              "Respaldo de inversionistas institucionales",
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-4 card-elevated">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <p className="font-semibold text-foreground text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">Proceso simple y transparente</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "1", t: "Precalifica", d: "Responde las preguntas en 3 minutos" },
              { n: "2", t: "Evaluación", d: "Revisamos tu caso y propiedad" },
              { n: "3", t: "Aprobación", d: "Recibes tu propuesta personalizada" },
              { n: "4", t: "Desembolso", d: "Firma y recibe tu dinero" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="h-14 w-14 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-xl font-extrabold text-gold-foreground">{s.n}</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground font-body">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="card-elevated p-10">
            <div className="flex gap-1 justify-center mb-4">
              {[1, 2, 3, 4, 5].map(j => <Star key={j} className="h-5 w-5 fill-gold text-gold" />)}
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 font-body italic">
              "Obtuve el financiamiento que necesitaba en muy poco tiempo. El equipo de PrestaClub fue muy profesional y transparente durante todo el proceso."
            </p>
            <p className="font-bold text-foreground">María L.</p>
            <p className="text-sm text-muted-foreground">Propietaria, Lima</p>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="section-padding bg-muted/50" id="wizard">
        <div className="container mx-auto">
          <h2 className="text-3xl font-extrabold text-foreground mb-4 text-center">Precalifica ahora</h2>
          <p className="text-muted-foreground text-center mb-8 font-body">Completa estas preguntas en menos de 3 minutos. Sin compromiso.</p>
          <WizardHipotecario buyerType={buyerType} onComplete={handleWizardComplete} />
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6">¿Tienes dudas? Escríbenos</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 font-body">Nuestro equipo está listo para ayudarte.</p>
          <Button variant="gold" size="xl" onClick={handleWhatsAppClick}>
            Hablar por WhatsApp
          </Button>
        </div>
      </section>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onConfirm={proceedToWhatsApp}
      />
    </Layout>
  );
};

// Individual buyer pages
export const CapitalDeTrabajo = () => (
  <BuyerPage
    title="Capital de Trabajo con Garantía Hipotecaria"
    subtitle="Capital de Trabajo"
    heroDescription="Obtén la liquidez que tu negocio necesita para crecer. Usa tu propiedad como garantía y accede a montos importantes con condiciones flexibles."
    problems={[
      "Tu negocio necesita capital pero los bancos te rechazan",
      "No tienes acceso a crédito formal",
      "Necesitas comprar mercadería o insumos con urgencia",
      "Tu flujo de caja no alcanza para cubrir operaciones",
      "Los bancos te piden demasiados requisitos documentarios",
    ]}
    solution="Te conectamos con inversionistas institucionales que financian tu capital de trabajo usando tu propiedad como respaldo. Proceso rápido, tasas competitivas y acompañamiento personalizado."
    buyerType="Capital de Trabajo"
    videoId="W-yAvCtOj1E"
  />
);

export const Construccion = () => (
  <BuyerPage
    title="Financiamiento para Construcción"
    subtitle="Construcción"
    heroDescription="Haz realidad tu proyecto de construcción o remodelación. Financiamos con tu terreno o propiedad como garantía."
    problems={[
      "Tienes un terreno pero no capital para construir",
      "Tu proyecto de construcción se detuvo por falta de fondos",
      "Los bancos no financian construcción sin historial",
      "Necesitas remodelar tu propiedad para venderla o alquilarla",
      "Los costos de materiales subieron y necesitas más presupuesto",
    ]}
    solution="Financiamos tu proyecto de construcción o remodelación con tu propiedad o terreno como garantía. Desembolsos progresivos según avance de obra."
    buyerType="Construcción"
    videoId="OXdKXds4mds"
    isVertical={true}
  />
);

export const ConsolidacionDeudas = () => (
  <BuyerPage
    title="Consolidación de Deudas"
    subtitle="Consolidación de Deudas"
    heroDescription="Unifica todas tus deudas en una sola cuota. Reduce tu carga financiera mensual y recupera la tranquilidad."
    problems={[
      "Tienes múltiples deudas con diferentes entidades",
      "Las cuotas mensuales totales son muy altas",
      "Estás pagando tasas de interés elevadas en tarjetas de crédito",
      "Tu historial crediticio se ha deteriorado",
      "No puedes acceder a un refinanciamiento bancario",
    ]}
    solution="Consolidamos todas tus deudas en un solo crédito con garantía hipotecaria. Una sola cuota, una sola tasa, y respiras tranquilo."
    buyerType="Consolidación de Deudas"
  />
);

export const CompraHipoteca = () => (
  <BuyerPage
    title="Compra de Hipoteca"
    subtitle="Compra de Hipoteca"
    heroDescription="Mejora las condiciones de tu hipoteca actual. Refinancia con mejores tasas y condiciones más flexibles."
    problems={[
      "Tu hipoteca actual tiene una tasa muy alta",
      "Quieres cambiar de banco pero no calificas",
      "Necesitas reducir tu cuota mensual",
      "Tu banco no te ofrece opciones de refinanciamiento",
      "Quieres liberar capital de tu propiedad",
    ]}
    solution="Compramos tu hipoteca actual y te ofrecemos mejores condiciones. Reducimos tu cuota mensual y te damos la posibilidad de liberar capital adicional."
    buyerType="Compra de Hipoteca"
  />
);

export default BuyerPage;
