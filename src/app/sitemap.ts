import { MetadataRoute } from 'next';
import pool from '@/shared/lib/db';

// Regeneramos el sitemap cada hora para incluir artículos nuevos sin rebuild.
export const revalidate = 3600;

const baseUrl = 'https://prestaclub.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/capital-de-trabajo`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/financiamiento-con-garantia-hipotecaria`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/financiamiento-con-garantia-hipotecaria/construccion`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/prestamos-con-garantia-hipotecaria-para-empresas`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/prestamo-con-garantia-vehicular`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/desarrollo-inmobiliario`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/saneamiento-predial`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/gestion-de-devoluciones-de-saldo`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/articulos`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/nosotros`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/preguntas-frecuentes`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/politica-de-privacidad`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terminos-y-condiciones`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Artículos publicados (dinámico desde la base de datos).
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const [rows]: any = await pool.query(
      'SELECT slug, updated_at, published_at FROM articles WHERE published_at <= NOW() ORDER BY published_at DESC'
    );
    articleRoutes = rows.map((a: any) => ({
      url: `${baseUrl}/articulos/${a.slug}`,
      lastModified: new Date(a.updated_at || a.published_at || now),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (e) {
    // Si la BD falla, entregamos solo las rutas estáticas (el sitemap no se rompe).
    console.error('Error generando sitemap de artículos:', e);
  }

  return [...staticRoutes, ...articleRoutes];
}
