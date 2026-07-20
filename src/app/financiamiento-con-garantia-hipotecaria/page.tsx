import type { Metadata } from "next";
import FinanciamientoHipotecario from "@/features/hipotecario/HipotecarioPage";
import { faqsHipotecario } from "@/features/hipotecario/faqs";

export const metadata: Metadata = {
    title: "Financiamiento con Garantía Hipotecaria - PrestaClub",
    description: "Obtén financiamiento usando tu propiedad como garantía. Capital de trabajo, construcción, consolidación de deudas y compra de hipoteca. Evaluamos aunque estés en Infocorp.",
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
