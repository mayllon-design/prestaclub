import type { Metadata } from "next";
import { Construccion } from "@/features/hipotecario/BuyerHipotecarioPage";
import { faqsConstruccion } from "@/features/hipotecario/faqsConstruccion";
import { faqPageSchema } from "@/shared/lib/structuredData";

export const metadata: Metadata = {
    title: "Financiamiento para Construcción con Garantía Hipotecaria - PrestaClub",
    description: "Financia tu proyecto de construcción o remodelación con tu terreno o propiedad como garantía. Sin historial crediticio requerido.",
    alternates: {
        canonical: "/financiamiento-con-garantia-hipotecaria/construccion",
    },
};

export default function Page() {
    const faqLd = faqPageSchema(faqsConstruccion);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <Construccion />
        </>
    );
}
