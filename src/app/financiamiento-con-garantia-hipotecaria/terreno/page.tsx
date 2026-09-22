import type { Metadata } from "next";
import TerrenoPage from "@/features/hipotecario/TerrenoPage";
import { faqsTerreno } from "@/features/hipotecario/faqsTerreno";

export const metadata: Metadata = {
    title: "Préstamo con Garantía de Terreno en Lima - PrestaClub",
    description: "Obtén liquidez con tu terreno inscrito en SUNARP como garantía. Préstamo desde S/10,000 en Lima y Callao, con título de propiedad y aunque estés en Infocorp.",
    alternates: {
        canonical: "/financiamiento-con-garantia-hipotecaria/terreno",
    },
};

// Datos estructurados FAQPage (schema.org). Se generan desde el mismo array que
// alimenta el acordeón visible, para que schema y contenido nunca se desincronicen.
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsTerreno.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
        },
    })),
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <TerrenoPage />
        </>
    );
}
