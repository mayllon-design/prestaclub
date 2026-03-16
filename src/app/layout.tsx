import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Suspense } from "react"; // 1. Importamos Suspense
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prestaclub.com"),
  title: "PrestaClub - Financiamiento con Garantía Hipotecaria",
  description: "Obtén el capital que tu negocio o proyecto necesita con el respaldo de tu propiedad. Préstamos rápidos, seguros y competitivos.",
  keywords: ["préstamos hipotecarios", "garantía hipotecaria", "financiamiento", "PrestaClub", "Perú"],
  icons: {
    icon: "/favicon.webp",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-53GQ6FB');
          `}
        </Script>
      </head>
      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-53GQ6FB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* 2. Envolvemos el contenido principal en Suspense */}
        {/* Esto protege a todas las páginas de errores de renderizado estático */}
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          {children}
        </Suspense>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}