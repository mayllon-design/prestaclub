import { Metadata } from 'next';
import { articlesApi } from '@/features/articulos/api';
import pool from '@/shared/lib/db';
import Layout from '@/core/layouts/MainLayout';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  try {
    const [rows]: any = await pool.query('SELECT * FROM articles WHERE slug = ?', [slug]);
    return rows[0] || null;
  } catch (e) {
    return null;
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
                className="prose prose-lg md:prose-xl max-w-none prose-headings:text-primary prose-gold font-body prose-img:rounded-2xl prose-img:shadow-xl prose-a:text-gold hover:prose-a:text-gold/80 break-words"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
