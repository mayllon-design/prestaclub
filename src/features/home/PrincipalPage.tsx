import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Shield, Clock, TrendingUp, Users, Building2, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import VideoSection from "@/shared/components/VideoSection";
import Image from "next/image";
import heroPrincipal from "@/assets/prestamo-garantia-hipotecaria-home.png";

const stats = [
  { value: "+23", label: "Años en el mercado" },
  { value: "+15,000", label: "Operaciones gestionadas" },
  { value: "+S/700M", label: "Desembolsados gestionados" },
  { value: "+ Confianza", label: "Registrados en la SBS" },
];

const products = [
  {
    icon: Building2,
    title: "Financiamiento con Garantía Hipotecaria",
    description: "Obtén capital respaldado por tu propiedad a través de fondos de inversión. Soluciones para capital de trabajo, construcción, consolidación de deudas y compra de hipoteca.",
    link: "/financiamiento-con-garantia-hipotecaria",
  },
  {
    icon: TrendingUp,
    title: "Crédito con Garantía Vehicular",
    description: "Usa tu vehículo como respaldo y accede a financiamiento rápido con tasas competitivas.",
    link: "/prestamo-con-garantia-vehicular",
  },
  {
    icon: Shield,
    title: "Saneamiento Predial",
    description: "Regulariza la situación legal de tu propiedad con nuestro equipo especializado.",
    link: "/saneamiento-predial",
  },
];

const benefits = [
  { icon: Clock, text: "Precalificación en minutos" },
  { icon: Shield, text: "Respaldo de inversionistas institucionales" },
  { icon: Users, text: "Atención personalizada" },
  { icon: CheckCircle2, text: "Estamos registrados en la SBS" },
];

const testimonials = [
  {
    name: "Carlos M.",
    role: "Emprendedor, San Juan de Lurigancho",
    text: "PrestaClub me ayudó a obtener el capital de trabajo que necesitaba para expandir mi negocio. El proceso fue rápido y transparente.",
    rating: 5,
  },
  {
    name: "María L.",
    role: "Propietaria, Cercado de Lima",
    text: "Consolidé todas mis deudas en una sola cuota. Gracias a PrestaClub ahora tengo tranquilidad financiera.",
    rating: 5,
  },
  {
    name: "Roberto S.",
    role: "Constructor, Ventanilla",
    text: "El financiamiento para mi proyecto de construcción fue aprobado rápidamente. Excelente servicio y acompañamiento.",
    rating: 5,
  },
];

const Principal = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <Image src={heroPrincipal} alt="PrestaClub oficinas Lima" className="w-full h-full object-cover opacity-15" priority fill />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-gold" />
              <span className="text-sm font-semibold text-gold">Registrados en la SBS</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Financiamiento con <span className="text-gradient-gold">respaldo real </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl font-body">
              Conectamos personas y empresas que necesitan financiamiento con inversionistas institucionales. El repago se garantiza con una propiedad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link href="/financiamiento-con-garantia-hipotecaria#precalificar">
                  PRECALIFICAR AHORA <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="rounded-[20px] border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 hover:text-white font-semibold px-8 h-14"
                asChild
              >
                <Link href="/nosotros">Conoce más</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="card-elevated p-6 text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-2xl md:text-3xl font-extrabold text-primary">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1 font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Nuestros servicios financieros</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Soluciones diseñadas para cada necesidad, con el respaldo de más de 23 años de experiencia.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product, i) => (
              <Link
                key={i}
                href={product.link}
                className="card-elevated p-8 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <product.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{product.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body mb-4">{product.description}</p>
                <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Conocer más <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">¿Por qué elegir PrestaClub?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6">
                <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <b.icon className="h-6 w-6 text-gold" />
                </div>
                <p className="font-semibold text-foreground font-body">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <VideoSection />

      {/* Testimonials */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="card-elevated p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 font-body">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6">
            ¿Listo para obtener tu financiamiento?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 font-body">
            Precalifica en pocos minutos.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link href="/financiamiento-con-garantia-hipotecaria#precalificar">
              PRECALIFICAR AHORA <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Principal;
