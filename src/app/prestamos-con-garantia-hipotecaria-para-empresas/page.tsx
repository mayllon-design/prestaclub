import type { Metadata } from "next";
import HipotecarioEmpresaPage from "@/features/hipotecario-empresa/HipotecarioEmpresaPage";
import { faqsEmpresa } from "@/features/hipotecario-empresa/faqsEmpresa";
import { faqPageSchema } from "@/shared/lib/structuredData";

export const metadata: Metadata = {
    title: "Préstamos con Garantía Hipotecaria para Empresas - PrestaClub",
    description: "Liquidez desde S/ 200,000 para tu empresa con garantía hipotecaria, en tiempo récord. Sin burocracia bancaria. Evaluación en 15 días.",
    alternates: {
        canonical: "/prestamos-con-garantia-hipotecaria-para-empresas",
    },
};

export default function Page() {
    const faqLd = faqPageSchema(faqsEmpresa);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <HipotecarioEmpresaPage />
        </>
    );
}
