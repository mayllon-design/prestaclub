"use client";

import Link from "next/link";
import { ArrowRight, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import { useEffect, useState } from "react";
import { Article } from "./types";
import { articlesApi } from "./api";
import { Button } from "@/shared/components/ui/button";

const ArticulosPage = () => {
    const [dbArticles, setDbArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 12;

    useEffect(() => {
        async function load() {
            try {
                const data = await articlesApi.getAll();
                setDbArticles(data);
            } catch (e) {
                console.error("Error loading articles from DB:", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Lógica de paginación
    const totalPages = Math.ceil(dbArticles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const currentArticles = dbArticles.slice(startIndex, startIndex + articlesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Desplazar hacia arriba suavemente al cambiar de página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            <section className="section-padding bg-muted/30 min-h-screen">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Blog & Educación Financiera</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto font-body">Consejos, noticias y guías para que tomes las mejores decisiones financieras.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                                {currentArticles.length === 0 ? (
                                    <div className="col-span-full text-center py-20 text-muted-foreground">
                                        No hay artículos publicados todavía.
                                    </div>
                                ) : (
                                    currentArticles.map((article) => (
                                        <Link key={article.id} href={`/articulos/${article.slug}`} className="group h-full">
                                            <article className="card-elevated h-full overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    {article.image_url ? (
                                                        <img
                                                            src={article.image_url}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-[#EBF0F9] flex items-center justify-center">
                                                            <span className="text-[#002D72] font-bold text-2xl tracking-tight opacity-80">PrestaClub</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                                                            {article.category || 'General'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" /> {new Date(article.published_at).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <User className="h-3 w-3" /> {article.author || 'Equipo PrestaClub'}
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
                                    ))
                                )}
                            </div>

                            {/* Controles de Paginación */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                                    <Button 
                                        variant="outline" 
                                        size="icon"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="h-10 w-10"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={currentPage === page ? "default" : "outline"}
                                                onClick={() => handlePageChange(page)}
                                                className={`h-10 w-10 ${currentPage === page ? 'shadow-lg' : ''}`}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>

                                    <Button 
                                        variant="outline" 
                                        size="icon"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="h-10 w-10"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                            
                            {totalPages > 1 && (
                                <div className="text-center text-sm text-muted-foreground mb-20">
                                    Mostrando página <span className="font-bold">{currentPage}</span> de {totalPages} ({dbArticles.length} artículos totales)
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default ArticulosPage;
