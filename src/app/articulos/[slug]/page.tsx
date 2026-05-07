import { Metadata } from 'next';
import pool from '@/shared/lib/db';
import Layout from '@/core/layouts/MainLayout';
import { Calendar, User, ArrowLeft, BookOpen, MessageCircle, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Article } from '@/features/articulos/types';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM articles WHERE slug = ?', [slug]);
    return rows[0] || null;
  } catch (e) {
    return null;
  }
}

async function getRelatedArticles(currentId: string, section: string | null, category: string | null): Promise<Article[]> {
  try {
    // Prioritize by section, fallback to category
    if (section) {
      const [rows]: any = await pool.query(
        `SELECT id, slug, title, excerpt, image_url, category, section, author, published_at
         FROM articles
         WHERE section = ? AND id != ? AND published_at <= NOW()
         ORDER BY published_at DESC
         LIMIT 2`,
        [section, currentId]
      );
      if (rows.length > 0) return rows;
    }
    // Fallback: same category
    if (category) {
      const [rows]: any = await pool.query(
        `SELECT id, slug, title, excerpt, image_url, category, section, author, published_at
         FROM articles
         WHERE category = ? AND id != ? AND published_at <= NOW()
         ORDER BY published_at DESC
         LIMIT 2`,
        [category, currentId]
      );
      return rows;
    }
    return [];
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) return { title: 'Artículo - PrestaClub' };

  return {
    title: `${article.seo_title || article.title} - PrestaClub`,
    description: article.seo_description || article.excerpt,
    alternates: {
      canonical: `/articulos/${slug}`,
    },
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || '',
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) notFound();

  const related = await getRelatedArticles(String(article.id), article.section, article.category);

  return (
    <Layout>
      <article className="min-h-screen pb-20 overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-[45vh] md:h-[60vh] w-full">
          {article.image_url ? (
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#EBF0F9] flex items-center justify-center">
                <span className="text-[#002D72] font-bold text-3xl md:text-5xl lg:text-7xl tracking-tighter opacity-70">PrestaClub</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center md:items-end">
            <div className="container mx-auto px-4 pb-10 md:pb-40">
              <Link href="/articulos" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Blog
              </Link>
              <div className="max-w-3xl">
                <span className="bg-gold text-gold-foreground text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-3 md:mb-4 inline-block">
                  {article.category || 'General'}
                </span>
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight break-words">
                  {article.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 -mt-24 relative z-10 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-16 overflow-hidden border border-muted/20">
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10 pb-8 border-b border-muted/30">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span className="font-medium text-foreground">
                    {new Date(article.published_at).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gold" />
                  <span className="font-medium text-foreground">{article.author || 'Equipo PrestaClub'}</span>
                </div>
              </div>

              {/* Actual Content - Injected as HTML */}
              <div 
                className="article-content prose prose-lg md:prose-xl max-w-none prose-headings:text-primary prose-gold font-body prose-img:rounded-2xl prose-img:shadow-xl prose-a:text-gold hover:prose-a:text-gold/80 break-words"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* CTA WhatsApp */}
              <div className="mt-14 rounded-2xl overflow-hidden border border-muted/20 shadow-lg bg-gradient-to-br from-[#002D72] to-[#003d99] p-8 md:p-10">
                <div className="max-w-2xl mx-auto text-center">
                  <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">¿Te interesó este artículo?</p>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">
                    Nuestros asesores están listos para ayudarte
                  </h3>
                  <p className="text-white/70 text-sm mb-8">
                    Cuéntanos tu caso y te orientamos sin compromiso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`https://wa.me/51921010200?text=${encodeURIComponent('[Blog] - Hola deseo evaluar mi caso')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 bg-gold text-gold-foreground font-bold px-6 py-3.5 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md hover:shadow-gold/40 text-sm"
                    >
                      <ClipboardList className="h-4 w-4 flex-shrink-0" />
                      Evaluar mi caso
                    </a>
                    <a
                      href={`https://wa.me/51921010200?text=${encodeURIComponent('[Blog] - Hola quisiera más información')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 bg-white/10 border border-white/25 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 active:scale-95 transition-all duration-200 text-sm"
                    >
                      <MessageCircle className="h-4 w-4 flex-shrink-0" />
                      Hablar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {related.length > 0 && (
                <div className="mt-16 pt-12 border-t border-muted/30">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-xl bg-gold/10">
                      <BookOpen className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gold uppercase tracking-widest">Continuar leyendo</p>
                      <h2 className="text-xl md:text-2xl font-bold text-primary leading-tight">
                        Artículos relacionados
                        {article.section && (
                          <span className="ml-2 text-base font-medium text-muted-foreground">
                            — {article.section}
                          </span>
                        )}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {related.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/articulos/${rel.slug}`}
                        className="group flex flex-col rounded-2xl overflow-hidden border border-muted/20 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                      >
                        {/* Card Image */}
                        <div className="relative h-44 overflow-hidden bg-[#EBF0F9] flex-shrink-0">
                          {rel.image_url ? (
                            <img
                              src={rel.image_url}
                              alt={rel.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-[#002D72] font-bold text-2xl tracking-tighter opacity-40">PrestaClub</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          {rel.category && (
                            <span className="absolute top-3 left-3 bg-gold text-gold-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
                              {rel.category}
                            </span>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="flex flex-col flex-1 p-5">
                          <h3 className="font-bold text-base text-foreground leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                            {rel.title}
                          </h3>
                          {rel.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                              {rel.excerpt}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-muted/20">
                            <span className="text-xs text-muted-foreground">
                              {new Date(rel.published_at).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="text-xs font-semibold text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
                              Leer más <ArrowLeft className="h-3 w-3 rotate-180" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
