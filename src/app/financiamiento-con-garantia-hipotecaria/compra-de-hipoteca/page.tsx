import type { Metadata } from "next";
import { CompraHipoteca } from "@/features/hipotecario/BuyerHipotecarioPage";
import { faqsCompraHipoteca } from "@/features/hipotecario/faqsCompraHipoteca";
import { faqPageSchema } from "@/shared/lib/structuredData";

export const metadata: Metadata = {
    title: "Compra de Hipoteca - Refinanciamiento Hipotecario - PrestaClub",
    description: "Mejora las condiciones de tu hipoteca actual. Refinancia con mejores tasas y condiciones más flexibles.",
    alternates: {
        canonical: "/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca",
    },
};

export default function Page() {
    const faqLd = faqPageSchema(faqsCompraHipoteca);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <CompraHipoteca />
        </>
    );
}
