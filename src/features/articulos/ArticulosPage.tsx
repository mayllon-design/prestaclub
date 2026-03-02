import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import Image from "next/image";

const articles = [
    {
        slug: "ventajas-garantia-hipotecaria",
        title: "Ventajas de financiarte con garantía hipotecaria frente a préstamos personales",
        excerpt: "Descubre por qué poner tu propiedad como respaldo puede darte mejores tasas y mayores plazos para pagar tu crédito.",
        date: "15 Oct, 2024",
        author: "Equipo PrestaClub",
        category: "Educación Financiera",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
    },
    {
        slug: "requisitos-saneamiento-predial",
        title: "Requisitos actuales para el saneamiento predial en el Perú 2024",
        excerpt: "Una guía completa sobre los documentos necesarios para regularizar tu propiedad ante registros públicos.",
        date: "02 Oct, 2024",
        author: "Legal Lab",
        category: "Legal",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
    },
    {
        slug: "capital-de-trabajo-campana-navidena",
        title: "Cómo obtener capital de trabajo para la campaña navideña",
        excerpt: "Prepara tu negocio para la temporada más importante del año con financiamiento inteligente y oportuno.",
        date: "20 Sep, 2024",
        author: "Asesores PyME",
        category: "Negocios",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    }
];

const ArticulosPage = () => {
    return (
        <Layout>
            <section className="section-padding bg-muted/30">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Blog & Educación Financiera</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto font-body">Consejos, noticias y guías para que tomes las mejores decisiones financieras.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {articles.map((article, i) => (
                            <Link key={i} href={`/articulos/${article.slug}`} className="group h-full">
                                <article className="card-elevated h-full overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" /> {article.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" /> {article.author}
                                            </div>
                                        </div>
                                        <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground font-body line-clamp-3 mb-4">
                                            {article.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center gap-1 text-primary font-bold text-sm">
                                            Leer artículo <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ArticulosPage;
