import type { Metadata } from "next";
import { CapitalDeTrabajo } from "@/features/hipotecario/BuyerHipotecarioPage";
import { faqsCapitalTrabajo } from "@/features/hipotecario/faqsCapitalTrabajo";
import { faqPageSchema } from "@/shared/lib/structuredData";

export const metadata: Metadata = {
    title: "Capital de Trabajo con Garantía Hipotecaria - PrestaClub",
    description: "Obtén capital de trabajo usando tu propiedad como garantía. Liquidez inmediata para tu negocio con tasas competitivas y proceso rápido.",
    alternates: {
        canonical: "/capital-de-trabajo",
    },
};

export default function Page() {
    const faqLd = faqPageSchema(faqsCapitalTrabajo);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <CapitalDeTrabajo />
        </>
    );
}
