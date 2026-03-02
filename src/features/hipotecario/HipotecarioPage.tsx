"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Building2, CheckCircle2, ArrowRight, Shield, FileText, Banknote, Star } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import VideoSection from "@/shared/components/VideoSection";
import Image from "next/image";
import heroHipotecario from "@/assets/hero-hipotecario.jpg";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { useState } from "react";
import { LocationModal } from "@/shared/components/LocationModal";

const buyers = [
  { title: "Capital de Trabajo", description: "Impulsa tu negocio con liquidez inmediata usando tu propiedad como garantía.", link: "/financiamiento-con-garantia-hipotecaria/capital-de-trabajo", icon: Banknote },
  { title: "Construcción", description: "Financia tu proyecto de construcción o remodelación.", link: "/financiamiento-con-garantia-hipotecaria/construccion", icon: Building2 },
  { title: "Consolidación de Deudas", description: "Unifica todas tus deudas en una sola cuota manejable.", link: "/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas", icon: FileText },
  { title: "Compra de Hipoteca", description: "Mejora las condiciones de tu hipoteca actual.", link: "/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca", icon: Shield },
];

const advantages = [
  "+23 años en el mercado",
  "+15,000 operaciones realizadas",
  "+S/600 millones desembolsados",
  "Registrados en la SBS",
  "Reportamos a la UIF",
  "Respaldo de inversionistas institucionales",
];

const steps = [
  { step: "1", title: "Precalifica", description: "Completa tus datos en menos de 3 minutos." },
  { step: "2", title: "Evaluación", description: "Revisamos tu solicitud y la propiedad." },
  { step: "3", title: "Aprobación", description: "Recibes tu propuesta personalizada." },
  { step: "4", title: "Desembolso", description: "Firma y recibe tu dinero." },
];

const problems = [
  "Los bancos te rechazaron por historial crediticio",
  "Necesitas liquidez rápida para tu negocio",
  "Tienes múltiples deudas y quieres unificarlas",
  "Quieres financiar construcción sin requisitos bancarios",
  "Tu empresa necesita capital pero no califica en banca tradicional",
];

const FinanciamientoHipotecario = () => {
  const { whatsappUrl, clearTracking } = useTrafficTracking();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLocationModalOpen(true);
  };

  const proceedToWhatsApp = () => {
    clearTracking();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <Image src={heroHipotecario} alt="Financiamiento con garantía hipotecaria" className="w-full h-full object-cover opacity-15" fill />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-6">
              <Building2 className="h-4 w-4 text-gold" />
              <span className="text-sm font-semibold text-gold">Financiamiento Hipotecario</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Tu propiedad es tu mejor <span className="text-gradient-gold">respaldo financiero</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl font-body">
              Conectamos personas y empresas que necesitan financiamiento con inversionistas institucionales. El repago se garantiza con una propiedad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="#precalificar">PRECALIFICAR AHORA <ArrowRight className="h-5 w-5" /></a>
              </Button>
              <Button variant="hero-outline" size="xl" onClick={handleWhatsAppClick}>
                Hablar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">¿Te identificas con alguno de estos problemas?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-4 card-elevated">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <p className="text-foreground font-body">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions / Buyers */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 text-center">Soluciones para cada necesidad</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto font-body">Elige el tipo de financiamiento que mejor se adapte a tu situación.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {buyers.map((b, i) => (
              <Link key={i} href={b.link} className="card-elevated p-6 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground font-body mb-3">{b.description}</p>
                <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver más <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <VideoSection />

      {/* Advantages */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">Ventajas de trabajar con PrestaClub</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {advantages.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-5 card-elevated">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <p className="font-semibold text-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-12 text-center">¿Cómo funciona?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="h-16 w-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-extrabold text-gold-foreground">{s.step}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{s.description}</p>
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
              &ldquo;PrestaClub me ayudó cuando los bancos me cerraron las puertas. En menos de una semana obtuve el financiamiento que necesitaba para mi negocio, con condiciones transparentes y un trato muy profesional.&rdquo;
            </p>
            <p className="font-bold text-foreground">Carlos M.</p>
            <p className="text-sm text-muted-foreground">Empresario, Lima</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/50" id="faq">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "¿Qué tipo de propiedades aceptan como garantía?", a: "Aceptamos casas, departamentos, terrenos, locales comerciales e inmuebles industriales en Lima y provincias." },
              { q: "¿Puedo obtener financiamiento si tengo deudas?", a: "Sí, evaluamos cada caso de manera integral. Incluso podemos ayudarte a consolidar tus deudas." },
              { q: "¿Cuánto tiempo tarda el proceso?", a: "Desde la precalificación hasta el desembolso puede tomar entre 7 y 15 días hábiles." },
              { q: "¿Están regulados?", a: "Sí, estamos inscritos en la SBS en el Registro de Empresas de Préstamo y reportamos a la UIF." },
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

      {/* CTA - Precalificar */}
      <section className="hero-gradient section-padding" id="precalificar">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6">
            Precalifica ahora y recibe una respuesta rápida
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 font-body">
            Completa nuestras preguntas en menos de 3 minutos. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link href="/financiamiento-con-garantia-hipotecaria/capital-de-trabajo">Capital de Trabajo</Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link href="/financiamiento-con-garantia-hipotecaria/construccion">Construcción</Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link href="/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas">Consolidación</Link>
            </Button>
          </div>
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

export default FinanciamientoHipotecario;
