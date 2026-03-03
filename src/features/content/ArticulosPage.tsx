import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";

const articles = [
  {
    slug: "que-es-financiamiento-con-garantia-hipotecaria",
    title: "¿Qué es el financiamiento con garantía hipotecaria y cómo funciona?",
    excerpt: "Descubre cómo puedes usar tu propiedad como respaldo para obtener el capital que necesitas. Te explicamos el proceso paso a paso.",
    date: "2025-02-15",
    category: "Financiamiento",
    link: "/financiamiento-con-garantia-hipotecaria",
  },
  {
    slug: "beneficios-consolidacion-deudas",
    title: "5 beneficios de consolidar tus deudas con garantía hipotecaria",
    excerpt: "Si tienes múltiples deudas, consolidarlas puede ser la mejor opción para reducir tu carga financiera mensual.",
    date: "2025-02-10",
    category: "Consolidación",
    link: "/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas",
  },
  {
    slug: "saneamiento-predial-lima",
    title: "Saneamiento predial en Lima: Todo lo que necesitas saber",
    excerpt: "¿Tu propiedad no está inscrita en SUNARP? Conoce el proceso de saneamiento predial y por qué es importante regularizar tu inmueble.",
    date: "2025-02-05",
    category: "Saneamiento",
    link: "/saneamiento-predial",
  },
  {
    slug: "capital-de-trabajo-para-pymes",
    title: "Capital de trabajo para PYMEs: Alternativas fuera del sistema bancario",
    excerpt: "Las PYMEs en Perú enfrentan barreras para acceder a financiamiento bancario. Conoce las alternativas disponibles.",
    date: "2025-01-28",
    category: "Capital de Trabajo",
    link: "/capital-de-trabajo",
  },
  {
    slug: "credito-vehicular-vs-prestamo-personal",
    title: "Crédito con garantía vehicular vs. préstamo personal: ¿Cuál conviene más?",
    excerpt: "Comparamos ambas opciones para que tomes la mejor decisión financiera según tu situación.",
    date: "2025-01-20",
    category: "Crédito Vehicular",
    link: "/prestamo-con-garantia-vehicular",
  },
  {
    slug: "como-elegir-empresa-financiamiento",
    title: "¿Cómo elegir una empresa de financiamiento confiable?",
    excerpt: "Aprende a identificar empresas reguladas y confiables. Te damos las claves para proteger tu patrimonio.",
    date: "2025-01-15",
    category: "Educación Financiera",
    link: "/nosotros",
  },
  {
    slug: "requisitos-financiamiento-hipotecario",
    title: "Requisitos para obtener un financiamiento con garantía hipotecaria",
    excerpt: "Conoce los documentos y condiciones necesarias para acceder a un financiamiento respaldado por tu propiedad.",
    date: "2025-01-10",
    category: "Financiamiento",
    link: "/financiamiento-con-garantia-hipotecaria",
  },
  {
    slug: "importancia-registro-sunarp",
    title: "La importancia de tener tu propiedad inscrita en SUNARP",
    excerpt: "No tener tu propiedad inscrita puede costarte caro. Te explicamos por qué es fundamental y cómo solucionarlo.",
    date: "2025-01-05",
    category: "Saneamiento",
    link: "/saneamiento-predial",
  },
];

const Articulos = () => {
  return (
    <Layout>
      <section className="hero-gradient section-padding">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
            Artículos y <span className="text-gradient-gold">Educación Financiera</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Información útil para tomar mejores decisiones financieras.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, i) => (
              <Link key={i} href={article.link} className="card-elevated p-6 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
                <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">{article.excerpt}</p>
                <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Leer más <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articulos;
