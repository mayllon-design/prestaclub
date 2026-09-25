"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import {
  MapPinned,
  CheckCircle2,
  ArrowRight,
  Scale,
  FileText,
  MapPin,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import heroTerreno from "@/assets/financiamiento-con-garantia-hipotecaria.png";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { trackWhatsAppClick } from "@/shared/lib/tracking";
import { faqsTerreno } from "@/features/hipotecario/faqsTerreno";

const heroBadges: { icon: LucideIcon; label: string; href?: string }[] = [
  { icon: FileText, label: "Registrados en la SBS", href: "/uploads/articulos/Resolucion-SBS.PDF" },
  { icon: Scale, label: "Asesoría legal en todo el proceso" },
  { icon: MapPin, label: "Lima Metropolitana y Callao" },
];

const requisitos = [
  "Tu DNI (y el del cónyuge o garante)",
  "La partida registral del terreno y el HR y PU (Autovalúo Municipal)",
  "La información para revisar su situación legal",
];

const noRequisitos = [
  "Boletas de pago",
  "Estados financieros",
  "Un historial crediticio impecable",
];

const steps = [
  { step: "1", title: "Nos cuentas tu caso", description: "Cuánto necesitas y sobre qué terreno. Sin costo para consultar." },
  { step: "2", title: "Evaluamos el lote y tu caso", description: "Se realiza la tasación con un perito inscrito en el REPEV para determinar el valor de realización." },
  { step: "3", title: "Estructuramos la operación", description: "Con fondos de inversión institucionales y formalización ante notario, con la hipoteca inscrita en SUNARP." },
  { step: "4", title: "Recibes el desembolso", description: "Cumplidas las condiciones, recibes el dinero y pagas en cuotas según lo pactado por escrito." },
];

const casos = [
  "Dueños de un lote urbano que quieren capital de trabajo para su negocio.",
  "Propietarios de un terreno comercial que buscan financiar una obra o remodelación.",
  "Personas con un lote heredado e inscrito que necesitan consolidar deudas caras en una sola cuota.",
  "Quienes tienen las escrituras de un terreno pero fueron rechazados por el banco por no tener boletas o por estar reportados en Infocorp.",
];

const ventajas = [
  "+24 años de trayectoria",
  "+15,000 operaciones",
  "+S/700 millones desembolsados",
  "Inscritos en el registro de la SBS (Resolución N° 02627-2020)",
  "Reportamos a la UIF",
  "Escritura pública, inscripción en SUNARP y asesoría legal",
];

const WHATSAPP_MESSAGE =
  "Hola PrestaClub, tengo un terreno inscrito en SUNARP en [Lima/Callao] y quiero información sobre un préstamo con garantía de terreno.";

const TerrenoPage = () => {
  const { getWhatsAppUrl, clearTracking } = useTrafficTracking();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackWhatsAppClick({ button_location: "terreno_cta", destino: "Garantía de Terreno" });
    clearTracking();
    const url = getWhatsAppUrl(WHATSAPP_MESSAGE);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <Image src={heroTerreno} alt="Préstamo con garantía de terreno" className="w-full h-full object-cover opacity-15" fill />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-6">
              <MapPinned className="h-4 w-4 text-gold" />
              <span className="text-sm font-semibold text-gold">Garantía de terreno / título de propiedad</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Préstamo con garantía de <br />tu <span className="text-gradient-gold">terreno en Lima y Callao</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl font-body">
              Tu terreno inscrito en SUNARP puede darte liquidez sin que lo vendas. Sigues siendo el dueño y
              obtienes capital para tu negocio, para consolidar deudas o para construir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="/financiamiento-con-garantia-hipotecaria#precalificar">
                  Precalificar con mi terreno <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="rounded-[20px] border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 hover:text-white font-semibold px-8 h-14"
                onClick={handleWhatsAppClick}
              >
                Consultar por WhatsApp
              </Button>
            </div>

            {/* Badges de confianza */}
            <div className="flex flex-wrap gap-3 mt-8">
              {heroBadges.map((badge) => {
                const content = (
                  <>
                    <badge.icon className="h-4 w-4 text-gold shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-primary-foreground whitespace-nowrap">
                      {badge.label}
                    </span>
                  </>
                );
                const baseClass =
                  "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 backdrop-blur-sm";

                return badge.href ? (
                  <a
                    key={badge.label}
                    href={badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClass} transition-colors hover:bg-white/15 hover:border-white/50 cursor-pointer`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={badge.label} className={baseClass}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 1. Qué es */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Empecemos por lo básico</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Qué es un préstamo con garantía de terreno?
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Es un financiamiento en el que tu terreno respalda la operación sin que tengas que venderlo. Sigues
              siendo el dueño del lote; lo único que ocurre es que se inscribe una hipoteca sobre él en SUNARP
              mientras dure el préstamo y, al terminar de pagar, la garantía se levanta. No es un crédito para comprar
              un terreno: es lo contrario, tú ya tienes el terreno inscrito y lo usas como herramienta para obtener
              capital.
            </p>
            <p>
              Muchos propietarios tienen su patrimonio &ldquo;dormido&rdquo; en un lote que no genera renta; aquí ese
              activo se convierte en liquidez para tu negocio, para consolidar deudas o para construir.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Qué terrenos sirven */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Qué evaluamos</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Qué terrenos sirven como garantía?
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Trabajamos con terrenos urbanos inscritos en SUNARP y con cerco perimétrico, tanto de uso residencial
              como comercial. En la práctica evaluamos casos como: un lote urbano en una habilitación consolidada, un
              terreno comercial sobre avenida, o un lote dentro de una lotización con título saneado.
            </p>
            <p>
              Lo que define si tu terreno es apto no es solo el tamaño, sino tres cosas: que esté inscrito a tu nombre
              (o al de un familiar que participe como garante), su valor de realización según la tasación, y su
              situación legal y registral.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Terreno vs. casa */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Conviene saberlo</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            Terreno vs. casa: ¿pesa distinto como garantía?
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Sí, y conviene saberlo. Un terreno es una garantía real igual de válida que una casa o un local, pero se
              tasa con criterios propios: ubicación, zonificación, si cuenta con habilitación urbana, servicios y cerco
              perimétrico. Un lote urbano bien ubicado y con título limpio es una garantía sólida.
            </p>
            <p>
              Nos enfocamos en terrenos urbanos, inscritos y con cerco perimétrico. Por eso, con un terreno, el peso de
              la tasación y de la situación registral es aún mayor que con una vivienda: es ahí donde se decide el monto
              que puedes obtener.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Para quién es */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Casos frecuentes</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Para quién es? Casos frecuentes
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10 max-w-3xl">
            Esta opción es para ti si tienes un terreno con título de propiedad y necesitas capital sin desprenderte de
            él. Vemos con frecuencia:
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {casos.map((c) => (
              <div key={c} className="card-elevated bg-background p-6 md:p-8 flex items-start gap-3">
                <Users className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border-l-4 border-gold bg-gold/5 p-6">
            <p className="text-foreground font-body leading-relaxed">
              En todos estos casos, la garantía real permite estructurar la operación mirando el activo y no solo tu
              historial.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Requisitos */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Menos de los que imaginas</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-10">
            Requisitos específicos para garantía de terreno
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-elevated bg-background p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <h3 className="text-lg font-bold text-foreground">Lo esencial</h3>
              </div>
              <ul className="space-y-4">
                {requisitos.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground font-body leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elevated bg-background p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <FileText className="h-5 w-5 text-gold shrink-0" />
                <h3 className="text-lg font-bold text-foreground">No es obligatorio presentar</h3>
              </div>
              <ul className="space-y-4">
                {noRequisitos.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="text-sm text-muted-foreground font-body leading-relaxed line-through decoration-gold/40">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground font-body leading-relaxed">
                Tu asesor te acompaña a reunir lo que falte; si el terreno necesita regularización previa, te orientamos
                sobre el{" "}
                <Link href="/saneamiento-predial" className="font-semibold text-primary hover:text-gold transition-colors">
                  saneamiento predial
                </Link>{" "}
                (*) antes de avanzar.
              </p>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground/80 font-body italic">
            (*) El Saneamiento Predial podría tener un costo, dependiendo de la evaluación legal.
          </p>
        </div>
      </section>

      {/* 6. Cómo funciona */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Por etapas</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-10 text-center">
            ¿Cómo funciona?
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10 max-w-3xl mx-auto text-center">
            Primero nos cuentas cuánto necesitas y sobre qué
            terreno; luego evaluamos el lote y tu caso; se realiza la tasación con un perito inscrito en el REPEV para
            determinar el valor de realización; se estructura la operación con fondos de inversión institucionales; se
            formaliza ante notario con la hipoteca inscrita en SUNARP; y, cumplidas las condiciones, recibes el
            desembolso. Pagas en cuotas según lo pactado por escrito.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-16 w-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-extrabold text-gold-foreground">{s.step}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border-l-4 border-gold bg-gold/5 p-6 max-w-3xl mx-auto">
            <p className="text-foreground font-body leading-relaxed">
              El financiamiento puede alcanzar{" "}
              <strong>hasta el 40% del valor de realización del terreno.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 7. Por qué PrestaClub */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Respaldo formal</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Por qué PrestaClub?
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed max-w-3xl mb-10">
            <p>
              No somos un banco ni un prestamista informal: estructuramos tu operación y te conectamos con fondos de
              inversión institucionales, con la flexibilidad que la banca no da y la formalidad que el prestamista de la
              esquina nunca te dará. PrestaClub está inscrita en el registro de la SBS (Resolución N° 02627-2020) y
              reporta a la UIF. Son más de 24 años de trayectoria, +15,000 operaciones y +S/700 millones desembolsados.
            </p>
            <p>
              Cada operación se formaliza con escritura pública, inscripción en SUNARP y asesoría legal, para que sepas
              exactamente qué firmas desde el primer día.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ventajas.map((v) => (
              <div key={v} className="flex items-center gap-3 p-5 card-elevated">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <p className="font-semibold text-foreground text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/50" id="faq">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col gap-4">
            {faqsTerreno.map((faq, i) => (
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

      {/* Contenido relacionado */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="card-elevated p-8">
            <h3 className="text-lg font-bold text-foreground mb-4">Contenido relacionado</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/financiamiento-con-garantia-hipotecaria"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors"
              >
                <ArrowRight className="h-4 w-4" /> préstamo con garantía hipotecaria
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="hero-gradient section-padding" id="precalificar">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6 leading-tight">
            Consulta hoy usando tu terreno
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 font-body">
            Tu terreno puede trabajar por ti sin que lo vendas. Cuéntanos dónde está y qué necesitas; en pocos minutos
            sabrás si tu caso es evaluable, sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href="/financiamiento-con-garantia-hipotecaria#precalificar">
                Precalificar con mi terreno <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="rounded-[20px] border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 hover:text-white font-semibold px-8 h-14"
              onClick={handleWhatsAppClick}
            >
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TerrenoPage;
