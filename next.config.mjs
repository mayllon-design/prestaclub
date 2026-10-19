/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/articulos/:path*',
        destination: 'https://xhruujqowmosbocjhvmt.supabase.co/storage/v1/object/public/articulos/:path*',
      },
    ];
  },
  async redirects() {
    return [
      // 301: www -> dominio sin www. Sin esto, las mismas páginas se servían en los dos
      // dominios y las analíticas (Clarity, embudos por URL) las contaban como sitios distintos.
      // La query (UTM, gclid, ttclid) se conserva en la redirección.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.prestaclub.com' }],
        destination: 'https://prestaclub.com/:path*',
        statusCode: 301,
      },
      // 301: artículo "proceso…" se fusiona en el artículo "financiamiento…" (consolidar señales SEO).
      // El contenido de B sigue en la BD (editable por ID en el admin) para hacer la fusión luego.
      {
        source: '/articulos/proceso-financiamiento-garantia-hipotecaria-peru',
        destination: '/articulos/financiamiento-garantia-hipotecaria-peru',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
