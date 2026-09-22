import type { Metadata } from "next";
import InfocorpPage from "@/features/hipotecario/InfocorpPage";
import { faqsInfocorp } from "@/features/hipotecario/faqsInfocorp";

export const metadata: Metadata = {
    title: "Préstamo con Garantía Hipotecaria estando en Infocorp",
    description: "¿Reportado en Infocorp? Con una garantía hipotecaria puedes ser evaluado para un préstamo en Lima y Callao: la garantía real pesa más que tu historial.",
    alternates: {
        canonical: "/financiamiento-con-garantia-hipotecaria/estando-en-infocorp",
    },
};

// Datos estructurados FAQPage (schema.org). Se generan desde el mismo array que
// alimenta el acordeón visible, para que schema y contenido nunca se desincronicen.
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsInfocorp.map((faq) => ({
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
            <InfocorpPage />
        </>
    );
}
