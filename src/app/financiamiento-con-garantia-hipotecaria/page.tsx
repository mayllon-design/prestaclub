import type { Metadata } from "next";
import FinanciamientoHipotecario from "@/features/hipotecario/HipotecarioPage";
import { faqsHipotecario } from "@/features/hipotecario/faqs";

export const metadata: Metadata = {
    title: "Préstamo con Garantía Hipotecaria - PrestaClub",
    description: "Préstamo con garantía hipotecaria en Lima y Callao: usa tu casa, local o terreno para obtener liquidez desde S/10,000, aunque estés en Infocorp.",
};

// Datos estructurados FAQPage (schema.org). Se generan desde el mismo array que
// alimenta el acordeón visible, para que schema y contenido nunca se desincronicen.
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsHipotecario.map((faq) => ({
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
            <FinanciamientoHipotecario />
        </>
    );
}
