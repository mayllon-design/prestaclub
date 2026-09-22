// Datos estructurados (schema.org / JSON-LD) para SEO + GEO (buscadores de IA).
// Fuente única para Organization, oficinas (LocalBusiness) y helper de FAQPage.

export const SITE_URL = "https://prestaclub.com";

const SAME_AS = [
  "https://www.linkedin.com/company/prestaclubsac/",
  "https://www.youtube.com/@PrestaclubPeru",
  "https://www.facebook.com/prestaclubperu/",
  "https://www.instagram.com/Prestaclub",
  "https://www.tiktok.com/@prestaclub",
];

// Entidad de marca, para inyectar en el layout raíz (site-wide).
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "PrestaClub",
  legalName: "PrestaClub S.A.C.",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: `${SITE_URL}/favicon.png`,
  description:
    "Fintech peruana de financiamiento con garantía real (hipotecaria y vehicular), inscrita en la SBS (Registro de Empresas de Préstamos y Empeños, Resolución N° 02627-2020) y que reporta a la UIF. Conecta a personas y empresas con fondos de inversión institucionales. No es un banco.",
  email: "informes@prestaclub.com",
  telephone: "+51-1-2021500",
  areaServed: { "@type": "Country", name: "Perú" },
  sameAs: SAME_AS,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51-1-2021500",
    contactType: "customer service",
    areaServed: "PE",
    availableLanguage: "Spanish",
  },
};

// Oficinas físicas (LocalBusiness / FinancialService), para la página de contacto.
export const officesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#oficina-principal`,
    name: "PrestaClub — Oficina Principal (Cercado de Lima)",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/contacto`,
    image: `${SITE_URL}/favicon.png`,
    telephone: "+51-1-2021500",
    email: "informes@prestaclub.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Nicolás de Piérola 950 (frente a la Plaza San Martín)",
      addressLocality: "Cercado de Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    geo: { "@type": "GeoCoordinates", latitude: -12.052285, longitude: -77.037499 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "18:30",
    },
    sameAs: SAME_AS,
  },
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#oficina-ventanilla`,
    name: "PrestaClub — Oficina Comercial Ventanilla",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/contacto`,
    image: `${SITE_URL}/favicon.png`,
    telephone: "+51-1-2021500",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pj. 51 Mz G6 Lt. 4 (Angamos)",
      addressLocality: "Ventanilla",
      addressRegion: "Callao",
      addressCountry: "PE",
    },
    geo: { "@type": "GeoCoordinates", latitude: -11.896015, longitude: -77.129963 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "18:30",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#oficina-caqueta`,
    name: "PrestaClub — Oficina Comercial Caquetá",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/contacto`,
    image: `${SITE_URL}/favicon.png`,
    telephone: "+51-1-2021500",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jirón Pocitos 380 (Ciudad Comercial Caquetá)",
      addressLocality: "San Martín de Porres",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    geo: { "@type": "GeoCoordinates", latitude: -12.0334349, longitude: -77.0472169 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "18:30",
    },
  },
];

// Helper: genera un FAQPage desde una lista plana de {q, a}.
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
