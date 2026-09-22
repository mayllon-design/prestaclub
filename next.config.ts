import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
