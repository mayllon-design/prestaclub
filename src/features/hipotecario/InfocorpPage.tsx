"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Scale,
  FileText,
  MapPin,
  AlertTriangle,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import heroInfocorp from "@/assets/financiamiento-con-garantia-hipotecaria.png";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { trackWhatsAppClick } from "@/shared/lib/tracking";
import { faqsInfocorp } from "@/features/hipotecario/faqsInfocorp";

const heroBadges: { icon: LucideIcon; label: string; href?: string }[] = [
  { icon: FileText, label: "Registrados en la SBS", href: "/uploads/articulos/Resolucion-SBS.PDF" },
  { icon: Scale, label: "Asesoría legal en todo el proceso" },
  { icon: MapPin, label: "Lima Metropolitana y Callao" },
];

const paraQuien = [
  "El banco te rechazó por estar reportado.",
  "Tienes deudas atrasadas que ensuciaron tu calificación.",
  "Eres independiente y no puedes demostrar ingresos con boletas.",
  "Necesitas capital con urgencia y no quieres caer con un prestamista informal.",
  "Si no tienes un inmueble propio, un familiar con propiedad puede participar como garante para ayudarte.",
];

const requisitos = [
  "Una propiedad inscrita en SUNARP (tuya o de un garante)",
  "Tu DNI (y el del cónyuge o garante)",
  "La partida registral del inmueble y el HR y PU (Autovalúo Municipal)",
];

const noRequisitos = [
  "Historial crediticio limpio",
  "Boletas de pago",
  "Estados financieros",
];

const steps = [
  { step: "1", title: "Nos cuentas tu caso", description: "Sobre qué propiedad y cuál es tu situación real." },
  { step: "2", title: "Evaluamos el inmueble", description: "Se realiza la tasación con un perito REPEV." },
  { step: "3", title: "Estructuramos la operación", description: "Con fondos de inversión institucionales y formalización ante notario, con la hipoteca inscrita en SUNARP." },
  { step: "4", title: "Recibes el desembolso", description: "Antes de firmar recibes asesoría legal y el detalle de condiciones y costos por escrito." },
];

const ventajas = [
  "+24 años de trayectoria",
  "+15,000 operaciones",
  "+S/700 millones desembolsados",
  "Inscritos en la SBS (Resolución N° 02627-2020)",
  "Reportamos a la UIF",
  "Escritura pública e inscripción en SUNARP",
];

const WHATSAPP_MESSAGE =
  "Hola PrestaClub, estoy reportado en Infocorp y tengo una propiedad inscrita en [Lima/Callao]. Quiero saber si puedo ser evaluado para un préstamo con garantía hipotecaria.";

const InfocorpPage = () => {
  const { getWhatsAppUrl, clearTracking } = useTrafficTracking();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackWhatsAppClick({ button_location: "infocorp_cta", destino: "Estando en Infocorp" });
    clearTracking();
    const url = getWhatsAppUrl(WHATSAPP_MESSAGE);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <Image src={heroInfocorp} alt="Préstamo con garantía hipotecaria estando en Infocorp" className="w-full h-full object-cover opacity-15" fill />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-6">
              <ShieldCheck className="h-4 w-4 text-gold" />
              <span className="text-sm font-semibold text-gold">Reportado en Infocorp</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Préstamo con garantía hipotecaria <span className="text-gradient-gold">aunque estés en Infocorp</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl font-body">
              Puedes ser evaluado en Lima y Callao: la garantía pesa más que tu historial. Ser
              evaluado no es aprobación garantizada, pero sí es un camino formal cuando el banco te dijo que no.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="/financiamiento-con-garantia-hipotecaria#precalificar">
                  Quiero que evalúen mi caso <ArrowRight className="h-5 w-5" />
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

      {/* 1. Puedo hipotecar si estoy en Infocorp */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">La pregunta clave</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Puedo hipotecar mi casa si estoy en Infocorp?
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              <strong className="text-foreground">Sí, puedes ser evaluado.</strong> Estar reportado en Infocorp o tener
              un historial con observaciones no te descalifica de forma automática en una operación con garantía hipotecaria.
              La razón es simple: cuando existe un inmueble que respalda el préstamo, la evaluación deja de depender
              exclusivamente de tu score crediticio y pasa a considerar el valor de la garantía, el destino del dinero y
              la viabilidad de tu caso.
            </p>
            <p>
              Ahí está la diferencia con el banco: donde la banca ve una calificación negativa y cierra la puerta, este
              modelo mira el activo que sí tienes. Importante y honesto: &ldquo;puedes ser evaluado&rdquo; no significa
              aprobación garantizada; cada operación queda sujeta a los criterios del fondo de inversión que otorga el
              financiamiento.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Por qué la garantía de inmueble cambia la ecuación */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">El fundamento</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            Por qué la garantía de inmueble cambia la ecuación
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Un{" "}
              <Link
                href="/financiamiento-con-garantia-hipotecaria"
                className="font-semibold text-primary hover:text-gold transition-colors"
              >
                préstamo con garantía hipotecaria
              </Link>{" "}
              es una operación respaldada por tu inmueble. Ese respaldo es lo que permite evaluar a personas que el
              sistema tradicional rechaza. Como el financiamiento representa como máximo el 40% del valor de realización
              de la propiedad, la garantía siempre vale mucho más que la deuda, y eso reduce el peso de tu historial en
              la decisión.
            </p>
            <p>
              No se trata de &ldquo;no revisar nada&rdquo; &mdash;sería una señal de alarma&mdash;, sino de evaluar tu
              realidad completa: la propiedad, el destino del crédito y tu capacidad de pago, además de tu situación en
              las centrales de riesgo.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Estando en Infocorp: qué es cierto y qué no */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Con transparencia</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            &ldquo;Estando en Infocorp&rdquo;, &ldquo;sin que revisen tu historial&rdquo;: qué es cierto y qué no
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Mucha gente busca un préstamo &ldquo;sin que revisen Infocorp&rdquo; o &ldquo;sin importar mi historial&rdquo;. Seamos
              claros: una operación formal y regulada siempre implica una evaluación, y PrestaClub reporta a la UIF. Lo
              que sí es cierto es que no exigimos un Infocorp impecable ni boletas de pago para iniciar tu evaluación.
            </p>
            <p>
              Lo que no es cierto es que exista financiamiento serio &ldquo;sin ninguna evaluación&rdquo;: cuando
              alguien te ofrece dinero sin mirar nada y sin contrato, ese es exactamente el terreno del prestamista
              informal, y ahí el riesgo lo corres tú. Con garantía hipotecaria tienes lo mejor de ambos mundos:
              flexibilidad con tu historial y, a la vez, una operación formal con escritura pública y respaldo
              institucional.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Para quién es */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Casos frecuentes</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Para quién es esta opción?
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10 max-w-3xl">
            Es para ti si tienes una propiedad inscrita en SUNARP &mdash;casa, departamento, local o terreno&mdash; y estás en alguna
            de estas situaciones:
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {paraQuien.map((c) => (
              <div key={c} className="card-elevated bg-background p-6 md:p-8 flex items-start gap-3">
                <Users className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border-l-4 border-gold bg-gold/5 p-6">
            <p className="text-foreground font-body leading-relaxed">
              En todos estos casos, la garantía es la que abre la evaluación.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Qué necesitas */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Menos de lo que imaginas</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-10">
            Qué necesitas para que evalúen tu caso
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10 max-w-3xl">
            Menos de lo que imaginas, y tu reporte en Infocorp no está en la lista de impedimentos. Para iniciar:
          </p>
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
                <h3 className="text-lg font-bold text-foreground">No te pedimos para empezar</h3>
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
            </div>
          </div>
          <div className="mt-8 rounded-2xl border-l-4 border-gold bg-gold/5 p-6">
            <p className="text-foreground font-body leading-relaxed">
              Lo que sí es indispensable es que el inmueble que ofreces en garantía esté{" "}
              <strong>libre de embargos, procesos judiciales y gravámenes</strong>: sobre esa base limpia se constituye
              la hipoteca. Si tu propiedad tiene alguna de estas cargas, te lo diremos con transparencia y, cuando
              exista una vía, te orientamos sobre cómo regularizarla antes de avanzar.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Cómo funciona */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Por etapas</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-10 text-center">
            Cómo funciona
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10 max-w-3xl mx-auto text-center">
            Nos cuentas tu caso y sobre qué propiedad; evaluamos el inmueble y tu situación real; se realiza la tasación
            con un perito REPEV; se estructura la operación con fondos de inversión institucionales; se formaliza ante
            notario con la hipoteca inscrita en SUNARP; y, cumplidas las condiciones, recibes el desembolso. Antes de
            firmar recibes asesoría legal y el detalle de condiciones y costos por escrito, para que decidas informado y
            no apurado.
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
        </div>
      </section>

      {/* 7. Transparencia */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-2.5 mb-3">
            <AlertTriangle className="h-5 w-5 text-gold shrink-0" />
            <p className="text-sm font-bold text-gold uppercase tracking-widest">Sin promesas milagrosas</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            Transparencia: nuestra responsabilidad y la tuya
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Hipotecar tu propiedad es una decisión seria, más aún si vienes de una situación financiera difícil. Por
              eso no prometemos milagros. Te decimos con claridad qué firmas, qué te obligas y qué pasa si no pagas: como
              en cualquier hipoteca, la propiedad queda como garantía y, ante un incumplimiento no resuelto, el fondo
              puede ejecutarla. Nuestro trabajo es que esa nunca sea la salida: estructuramos la cuota según tu capacidad
              de pago y, si surge un problema, se conversa antes.
            </p>
            <p>
              PrestaClub está inscrita en la SBS (Resolución N° 02627-2020) y reporta a la UIF; +24 años, +15,000
              operaciones y +S/700 millones respaldan que existe un camino formal aun estando reportado.
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
            {faqsInfocorp.map((faq, i) => (
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
                href="/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors"
              >
                <ArrowRight className="h-4 w-4" /> consolidar tus deudas en una sola cuota
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="hero-gradient section-padding" id="precalificar">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6 leading-tight">
            Cuéntanos tu caso hoy
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 font-body">
            Si el banco ya te dijo que no por estar en Infocorp, la respuesta no es el prestamista de la esquina.
            Cuéntanos tu caso y tu propiedad; en pocos minutos sabrás si eres evaluable, sin costo ni compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href="/financiamiento-con-garantia-hipotecaria#precalificar">
                Quiero que evalúen mi caso <ArrowRight className="h-5 w-5" />
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

export default InfocorpPage;
