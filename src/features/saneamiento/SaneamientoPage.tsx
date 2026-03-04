"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { CheckCircle2, ArrowRight, ArrowLeft, FileText, Star } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import VideoSection from "@/shared/components/VideoSection";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

const SaneamientoPredial = () => {
  const { getWhatsAppUrl, clearTracking } = useTrafficTracking();
  const [step, setStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [data, setData] = useState({
    nombre: "", celular: "", ubicacion: "", tipoProblema: "", tieneDocumentos: "", privacidad: false,
  });

  const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}`;
  const update = (field: string, value: string | boolean) => setData(prev => ({ ...prev, [field]: value }));

  const handleWhatsApp = () => {
    const message = `Hola, estoy interesado en el servicio de saneamiento predial.\n\nYa respondí las preguntas en la web y estos son mis datos:\n\n` +
      `Nombre: ${data.nombre}\nCelular: ${data.celular}\n` +
      `Ubicación: ${data.ubicacion}\nProblema: ${data.tipoProblema}\n` +
      `Documentos: ${data.tieneDocumentos}\n\nRef: ${leadId}`;

    window.open(getWhatsAppUrl(message), "_blank");
    clearTracking();
  };

  return (
    <Layout>
      <section className="hero-gradient section-padding">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-6">
            <FileText className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-gold">Saneamiento Predial</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
            Regulariza tu <span className="text-gradient-gold">propiedad</span> de manera legal y segura
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body mb-8">
            Nuestro equipo legal especializado te acompaña en todo el proceso de regularización de tu inmueble.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href="#formulario">CONSULTAR AHORA <ArrowRight className="h-5 w-5" /></a>
          </Button>
        </div>
      </section>

      {/* What is it */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground mb-6">¿Qué es el saneamiento predial?</h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Es el proceso legal mediante el cual se regulariza la situación jurídica de un inmueble ante los registros públicos (SUNARP).
            Esto permite que tu propiedad esté debidamente inscrita, lo cual es indispensable para venderla, hipotecarla o acceder a financiamiento.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center">Beneficios del saneamiento</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Podrás vender tu propiedad legalmente",
              "Accede a financiamiento con garantía hipotecaria",
              "Protege tu patrimonio ante terceros",
              "Incrementa el valor comercial de tu inmueble",
              "Evita problemas legales futuros",
              "Regulariza herencias y sucesiones",
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-4 card-elevated">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <p className="font-semibold text-foreground text-sm">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoSection videoId="JuUIIvug0h0" isVertical={true} />

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">¿Cómo funciona?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "1", t: "Consulta", d: "Evalúamos la situación de tu propiedad" },
              { n: "2", t: "Diagnóstico", d: "Identificamos qué trámites necesitas" },
              { n: "3", t: "Ejecución", d: "Realizamos todos los trámites legales" },
              { n: "4", t: "Inscripción", d: "Tu propiedad queda inscrita en SUNARP" },
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

      {/* Documents */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center">Documentos que podrías necesitar</h2>
          <div className="card-elevated p-6 space-y-3">
            {[
              "Copia literal de Registros Públicos (si la tienes)",
              "DNI del propietario",
              "Contrato de compraventa o escritura pública",
              "Planos del inmueble",
              "Autovalúo o declaración jurada",
              "Certificado de búsqueda catastral",
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-celeste shrink-0" />
                <p className="text-sm text-foreground font-body">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "¿Cuánto tiempo demora el saneamiento?", a: "Depende de la complejidad del caso. En general, puede tomar entre 30 y 90 días." },
              { q: "¿Qué pasa si no tengo ningún documento?", a: "No te preocupes. Nuestro equipo puede ayudarte a obtener los documentos necesarios." },
              { q: "¿Puedo sanear una propiedad heredada?", a: "Sí, manejamos casos de sucesión intestada y testamentaria." },
            ].map((faq, i) => (
              <details key={i} className="card-elevated group">
                <summary className="p-5 cursor-pointer font-semibold text-foreground flex justify-between items-center">
                  {faq.q}
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground font-body">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="section-padding bg-muted/50" id="formulario">
        <div className="container mx-auto">
          <h2 className="text-3xl font-extrabold text-foreground mb-4 text-center">Consulta gratuita</h2>
          <p className="text-muted-foreground text-center mb-8 font-body">Cuéntanos sobre tu propiedad y te asesoramos sin compromiso.</p>

          <div className="card-elevated p-8 max-w-2xl mx-auto">
            {!showSummary ? (
              <>
                {step === 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Tus datos</h3>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">Nombre completo *</label>
                      <input type="text" value={data.nombre} onChange={e => update("nombre", e.target.value)} className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Tu nombre" maxLength={100} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">Celular *</label>
                      <input type="tel" value={data.celular} onChange={e => update("celular", e.target.value)} className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="999 999 999" maxLength={15} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">Ubicación del inmueble *</label>
                      <input type="text" value={data.ubicacion} onChange={e => update("ubicacion", e.target.value)} className="w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Distrito, provincia" maxLength={100} />
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="gold" onClick={() => setStep(1)} disabled={!data.nombre || !data.celular || !data.ubicacion}>
                        Siguiente <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Sobre tu caso</h3>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">¿Cuál es el problema principal? *</label>
                      <div className="grid grid-cols-1 gap-3">
                        {["Propiedad no inscrita en SUNARP", "Herencia sin regularizar", "Documentos incompletos", "Problemas de linderos", "Otro"].map(opt => (
                          <button key={opt} onClick={() => update("tipoProblema", opt)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all text-left ${data.tipoProblema === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">¿Tienes documentos de la propiedad? *</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["Sí, todos", "Algunos", "Ninguno"].map(opt => (
                          <button key={opt} onClick={() => update("tieneDocumentos", opt)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${data.tieneDocumentos === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer mt-2">
                      <input type="checkbox" checked={data.privacidad} onChange={e => update("privacidad", e.target.checked)} className="mt-1 h-4 w-4 rounded border-input accent-primary" />
                      <span className="text-sm text-muted-foreground">Acepto la <a href="/politica-de-privacidad-de-prestaclub.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">Política de Privacidad</a></span>
                    </label>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={() => setStep(0)}><ArrowLeft className="h-4 w-4" /> Anterior</Button>
                      <Button variant="gold" onClick={() => setShowSummary(true)} disabled={!data.tipoProblema || !data.tieneDocumentos || !data.privacidad}>
                        Ver resumen <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground text-center">Resumen de tu consulta</h3>
                <div className="bg-muted/50 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Nombre:</span><span className="text-sm font-semibold text-foreground">{data.nombre}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Celular:</span><span className="text-sm font-semibold text-foreground">{data.celular}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Ubicación:</span><span className="text-sm font-semibold text-foreground">{data.ubicacion}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Problema:</span><span className="text-sm font-semibold text-foreground">{data.tipoProblema}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Documentos:</span><span className="text-sm font-semibold text-foreground">{data.tieneDocumentos}</span></div>
                </div>
                <div className="flex justify-center">
                  <Button variant="whatsapp" size="lg" onClick={handleWhatsApp}>
                    ENVIAR POR WHATSAPP <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-6">¿Tienes dudas sobre tu propiedad?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 font-body">Escríbenos y te orientamos sin compromiso.</p>
          <Button variant="hero" size="xl" asChild>
            <a href={getWhatsAppUrl()} onClick={clearTracking} target="_blank" rel="noopener noreferrer">Hablar por WhatsApp</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SaneamientoPredial;
