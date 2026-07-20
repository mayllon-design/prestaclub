"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Building2, CheckCircle2, ArrowRight, Shield, FileText, Banknote, Star, Scale, MapPin, X, Ruler, ScrollText, Landmark, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import Image from "next/image";
import heroHipotecario from "@/assets/financiamiento-con-garantia-hipotecaria.png";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";
import { trackWhatsAppClick } from "@/shared/lib/tracking";
import { useState } from "react";
import { LocationModal } from "@/shared/components/LocationModal";
import { SimuladorHipotecario } from "@/features/hipotecario/SimuladorHipotecario";
import { faqsHipotecario } from "@/features/hipotecario/faqs";

const heroBadges: { icon: LucideIcon; label: string; href?: string }[] = [
  { icon: FileText, label: "Registrados ante la SBS", href: "/uploads/articulos/Resolucion-SBS.PDF" },
  { icon: Scale, label: "Asesoría legal en todo el proceso" },
  { icon: MapPin, label: "Lima Metropolitana y Callao" },
];

const buyers = [
  { title: "Capital de Trabajo", description: "Liquidez inmediata para tu negocio. Personas naturales y jurídicas.", link: "/capital-de-trabajo", icon: Banknote },
  { title: "Construcción", description: "Financia tu proyecto de construcción o remodelación. Aplica a casas y terrenos.", link: "/financiamiento-con-garantia-hipotecaria/construccion", icon: Building2 },
  { title: "Consolidación de Deudas", description: "Unifica todas tus deudas en una sola cuota manejable.", link: "/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas", icon: FileText },
  { title: "Compra de Hipoteca", description: "Mejora las condiciones de tu hipoteca actual.", link: "/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca", icon: Shield },
];

const advantages = [
  "+23 años en el mercado",
  "+15,000 operaciones realizadas",
  "+S/700 millones desembolsados",
  "Registrados en la SBS",
  "Reportamos a la UIF",
  "Respaldo de inversionistas institucionales",
];

const comparativa = [
  {
    criterio: "Evaluación",
    banco: "Solo papeles: planillas, Infocorp limpio",
    informal: "Sin evaluación real",
    prestaclub: "Tu realidad completa: garantía + negocio",
  },
  {
    criterio: "Si estás en Infocorp",
    banco: "Rechazo casi seguro",
    informal: "“No importa” (y eso es un problema)",
    prestaclub: "Puedes ser evaluado",
  },
  {
    criterio: "Respaldo",
    banco: "Institucional",
    informal: "Ninguno — riesgo de abuso",
    prestaclub: "Fondos de inversión institucionales; registro SBS",
  },
  {
    criterio: "Contratos",
    banco: "Formales",
    informal: "Muchas veces sin escritura ni registro",
    prestaclub: "Escritura pública + SUNARP + asesoría legal",
  },
  {
    criterio: "Velocidad",
    banco: "Semanas o meses, y puede terminar en “no”",
    informal: "Inmediata (esa es la trampa)",
    prestaclub: "Hasta 3 días hábiles luego de la firma de minuta",
  },
];

const garantias = [
  {
    title: "El margen te protege",
    description:
      "Como el financiamiento es máximo el 40% del valor, tu propiedad siempre vale mucho más que la deuda. El negocio está en que pagues, no en ejecutar.",
  },
  {
    title: "Cuota a tu medida",
    description: "En la evaluación revisamos que el monto y el plazo tengan sentido con tu realidad.",
  },
  {
    title: "Si hay problema, habla antes",
    description:
      "Las dificultades de pago se conversan y se buscan salidas; el silencio es lo único sin solución.",
  },
  {
    title: "Asesoría legal siempre",
    description: "Sabes qué firmas, qué obligas y qué derechos tienes, desde el día uno.",
  },
];

const costos = [
  {
    icon: Ruler,
    title: "Tasación",
    description: "El informe profesional que determina el valor de tu propiedad. Se paga una vez, al inicio.",
  },
  {
    icon: ScrollText,
    title: "Notaría",
    description: "La escritura pública de la garantía se firma ante notario.",
  },
  {
    icon: Landmark,
    title: "Registros",
    description: "La inscripción de la hipoteca en SUNARP.",
  },
  {
    icon: Receipt,
    title: "Gastos administrativos",
    description: "Comisiones y otros gastos de gestión de la operación.",
  },
];

const requisitos = [
  "Propiedad inscrita en SUNARP — casa, departamento, local o terreno, tuya o de un familiar que participe como garante",
  "Tener 18 años o más",
  "Un destino claro para el dinero: negocio, deudas, construcción, otra hipoteca",
  "Estar en Lima Metropolitana o Callao",
];

const noRequisitos = [
  "Boletas de pago ni ingresos en planilla",
  "Estados financieros de tu negocio",
  "Un Infocorp impecable",
];

const steps = [
  { step: "1", title: "Nos cuentas tu caso", description: "Cuánto necesitas y qué propiedad tienes. Por WhatsApp o formulario, el mismo día." },
  { step: "2", title: "Te Evaluamos", description: "Tu inmueble y tu negocio — no solo tus papeles." },
  { step: "3", title: "Estructuramos la operación", description: "Con fondos de inversión institucionales, formalizada ante notario." },
  { step: "4", title: "Recibes el desembolso", description: "Y pagas en cuotas según la estructura acordada por escrito." },
];


const FinanciamientoHipotecario = () => {
  const { whatsappUrl, getWhatsAppUrl, clearTracking } = useTrafficTracking();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLocationModalOpen(true);
  };

  const proceedToWhatsApp = (data: { location: string; useType: string }) => {
    trackWhatsAppClick({
      button_location: "hipotecario_cta",
      destino: data.useType,
      ubicacion: data.location,
    });
    clearTracking();
    const customMessage = `Hola *PrestaClub*. Mi inmueble está en *${data.location}* y lo usaré para *${data.useType}*. Necesito más información sobre financiamientos.`;
    const url = getWhatsAppUrl(customMessage);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <Image src={heroHipotecario} alt="Financiamiento con garantía hipotecaria" className="w-full h-full object-cover opacity-15" fill />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-6">
              <Building2 className="h-4 w-4 text-gold" />
              <span className="text-sm font-semibold text-gold">Financiamiento con garantía Hipotecaria</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
              <span className="inline sm:block" style={{ color: "#f2ad36" }}>Préstamo con Garantía Hipotecaria</span>{" "}
              <span className="inline sm:block sm:text-2xl md:text-3xl lg:text-4xl">convierte tu propiedad en liquidez</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl font-body">
              ¿Tienes casa, local o terreno en SUNARP? Obtén de S/10,000 a 1 Millón de soles usando tu inmueble como respaldo y aunque estés en Infocorp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="#precalificar">PRECALIFICAR AHORA <ArrowRight className="h-5 w-5" /></a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="rounded-[20px] border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 hover:text-white font-semibold px-8 h-14"
                onClick={handleWhatsAppClick}
              >
                Hablar por WhatsApp
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

      {/* Qué es y cómo funciona */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">
            Empecemos por lo básico
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Qué es un préstamo con garantía hipotecaria y cómo funciona?
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Es un financiamiento en el que tu inmueble respalda la operación.{" "}
              <strong className="text-foreground">Tú sigues siendo el dueño</strong> y sigues viviendo o
              trabajando en él; <strong className="text-foreground">solo se inscribe una HIPOTECA en SUNARP</strong>.
            </p>
            <p>
              Ojo con la confusión más común:{" "}
              <strong className="text-foreground">esto NO es un crédito hipotecario para comprar casa.</strong>{" "}
              Es lo contrario — tú ya tienes la propiedad, y la usas como herramienta para obtener liquidez.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">¿Cómo funciona?</h2>

          {/* Video explicativo (sin título propio: lo encabeza el H2 de la sección) */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card max-w-4xl mx-auto mb-12">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/DYqcB5vEq_g?rel=0"
                title="¿Cómo funciona un préstamo con garantía hipotecaria?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

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
          <p className="text-lg text-muted-foreground text-center mt-12 max-w-3xl mx-auto font-body">
            En PrestaClub no somos un banco ni un prestamista:{" "}
            <strong className="text-foreground">estructuramos tu operación y te conectamos con fondos de inversión institucionales</strong>
            , con la flexibilidad que la banca no te da.
          </p>
        </div>
      </section>

      {/* Cuánto prestan */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">
            La pregunta clave
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Cuánto dinero me prestan por mi casa?
          </h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              La regla es simple:{" "}
              <strong className="text-foreground">hasta el 40% del valor de realización de tu propiedad.</strong>{" "}
              Dicho de otra forma: tu inmueble debe valer al menos 3.5 veces el monto que necesitas.
            </p>
            <p>
              ¿Por qué solo el 40%? Porque es un margen de protección — para el fondo, pero sobre todo{" "}
              <strong className="text-foreground">para ti</strong>: tu propiedad siempre conserva un valor
              muy superior a la deuda.
            </p>
          </div>

          <SimuladorHipotecario />
        </div>
      </section>

      {/* Requisitos */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">
            Menos de los que imaginas
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-10">
            Requisitos para un préstamo con garantía hipotecaria
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Lo esencial */}
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

            {/* Lo que NO te pediremos */}
            <div className="card-elevated bg-background p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <X className="h-5 w-5 text-destructive shrink-0" />
                <h3 className="text-lg font-bold text-foreground">NO es obligatorio presentar</h3>
              </div>
              <ul className="space-y-4">
                {noRequisitos.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <X className="h-4 w-4 text-destructive shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground font-body leading-relaxed line-through decoration-destructive/40">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dudas frecuentes sobre requisitos */}
          <div className="mt-10 space-y-8 max-w-3xl">
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">
                ¿Puedo hipotecar mi casa si estoy en Infocorp?
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                <strong className="text-foreground">Sí, puedes ser evaluado.</strong> Estar en Infocorp o tener
                un historial irregular no te descalifica con nosotros — ese es exactamente el punto donde el
                banco te dice que no y nosotros miramos más allá. Lo que pesa es el valor de tu garantía y la
                viabilidad de tu caso.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">¿Qué documentos necesito?</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Para empezar, solo tres: tu <strong className="text-foreground">DNI</strong> (y el de tu cónyuge
                o garante), la <strong className="text-foreground">partida registral</strong> de la propiedad (la
                obtenemos juntos si no la tienes) y el <strong className="text-foreground">HR y PU</strong> del
                inmueble. Tu asesor te acompaña con el resto — nadie te deja solo con una lista de 20 papeles.
              </p>
            </div>
          </div>

          {/* Cierre */}
          <div className="mt-10 rounded-2xl border-l-4 border-gold bg-gold/5 p-6">
            <p className="text-foreground font-body leading-relaxed">
              <strong>Evaluamos tu realidad completa:</strong> tu propiedad, tu negocio, tu historia. Muchos
              emprendedores generan más valor del que muestran sus papeles.
            </p>
          </div>
        </div>
      </section>

      {/* Costos */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">
            Sin sorpresas
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Cuánto cuesta? Tasación, notaría y gastos registrales explicados
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10 max-w-3xl">
            Esto casi nadie te lo explica antes de empezar. Nosotros sí. Además de los intereses, la operación
            tiene cuatro costos:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {costos.map((c) => (
              <div key={c.title} className="card-elevated p-6">
                <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <c.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-gold bg-gold/5 p-6">
            <p className="text-foreground font-body leading-relaxed">
              Los montos exactos dependen del valor de tu inmueble y de la notaría — tu asesor te los detalla{" "}
              <strong>por escrito en la propuesta, antes de que firmes nada.</strong> Si lo solicitas, los gastos notariales, registrales y adm. Pueden ser añadidos a tu financiamiento. No es necesario que los pagues antes.
            </p>
          </div>
        </div>
      </section>

      {/* Qué pasa si no pago */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">
            La pregunta que todos tienen
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            ¿Y si no pago? Qué pasa con tu propiedad (respuesta honesta)
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10 max-w-3xl">
            Tu propiedad queda como garantía: Si surgen problemas, el fondo te puede otorgar opciones de pago para que no incumplas tus obligaciones, si no se llega a un acuerdo el fondo puede ejecutarla — como en
            cualquier hipoteca, incluida la del banco. Eso es lo que hace posible que te financien sin pedirte
            planillas. Ahora, lo importante:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {garantias.map((g) => (
              <div key={g.title} className="card-elevated bg-background p-6 md:p-8">
                <h3 className="text-lg font-bold text-primary mb-3">{g.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-gold bg-gold/5 p-6">
            <p className="text-foreground font-body leading-relaxed">
              <strong>
                Hipotecar tu propiedad es una decisión seria. Nuestro trabajo es que la tomes informado, no
                apurado.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">
            Compara antes de decidir
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-8">
            ¿Banco, prestamista o fondos institucionales?
          </h2>

          {/* La tabla desborda en móvil: scroll horizontal en su propio contenedor */}
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="bg-navy p-4 md:p-5" />
                  <th className="bg-navy p-4 md:p-5 text-sm font-bold text-primary-foreground">Banco</th>
                  <th className="bg-navy p-4 md:p-5 text-sm font-bold text-primary-foreground">
                    Prestamista informal
                  </th>
                  <th className="bg-gold p-4 md:p-5 text-sm font-bold text-gold-foreground">
                    Prestaclub + fondos de inversión
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparativa.map((c, i) => (
                  <tr key={c.criterio} className={i % 2 === 1 ? "bg-muted/40" : "bg-background"}>
                    <td className="p-4 md:p-5 text-sm font-bold text-foreground align-top">{c.criterio}</td>
                    <td className="p-4 md:p-5 text-sm text-muted-foreground font-body align-top">{c.banco}</td>
                    <td className="p-4 md:p-5 text-sm text-muted-foreground font-body align-top">{c.informal}</td>
                    <td className="p-4 md:p-5 text-sm font-semibold text-primary font-body align-top bg-gold/5">
                      {c.prestaclub}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground font-body leading-relaxed mt-6 max-w-3xl">
            Si el banco ya te dijo que no, la respuesta <strong className="text-foreground">no</strong> es el
            prestamista de la esquina. Existe un camino formal y flexible a la vez.
          </p>
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

      {/* Testimonial */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="card-elevated p-10">
            <div className="flex gap-1 justify-center mb-4">
              {[1, 2, 3, 4, 5].map(j => <Star key={j} className="h-5 w-5 fill-gold text-gold" />)}
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 font-body italic">
              &ldquo;PrestaClub me ayudó cuando los bancos me cerraron las puertas. En menos de una semana obtuve el financiamiento con garantía hipotecariaque necesitaba para mi negocio, con condiciones transparentes y un trato muy profesional.&rdquo;
            </p>
            <p className="font-bold text-foreground">Andres F.</p>
            <p className="text-sm text-muted-foreground">Emprendedor, Surquillo</p>
          </div>
        </div>
      </section>

      {/* FAQ — OCULTA VISUALMENTE A PROPÓSITO (decisión de negocio).
          El contenido permanece en el HTML para que los crawlers de Google y de
          LLMs (GEO) lo lean, junto con el JSON-LD FAQPage que emite page.tsx.
          NO quitar la clase `hidden` sin consultar: es intencional, no un bug.
          Nota: Google exige que el contenido con schema FAQPage sea visible;
          se asumió ese riesgo conscientemente. */}
      <section className="section-padding bg-muted/50 hidden" id="faq">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-4">
            {faqsHipotecario.map((faq, i) => (
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

      {/* CTA - Precalificar */}
      <section className="hero-gradient section-padding" id="precalificar">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6 leading-tight">
            Ya hiciste el trabajo duro. Ahora deja que tu propiedad trabaje por ti
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 font-body">
            Responde unas preguntas en menos de 3 minutos. Sin compromiso.
          </p>

          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-5">
            ¿Para qué necesitas el dinero?
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {buyers.map((b) => (
              <Button key={b.link} variant="hero" size="xl" asChild>
                <Link href={b.link}>{b.title}</Link>
              </Button>
            ))}
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
