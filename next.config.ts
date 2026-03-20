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
};

export default nextConfig;
