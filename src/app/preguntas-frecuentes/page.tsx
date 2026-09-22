import type { Metadata } from "next";
import FaqPage from "@/features/content/FaqPage";
import { faqFlat } from "@/features/content/faqData";
import { faqPageSchema } from "@/shared/lib/structuredData";

export const metadata: Metadata = {
    title: "Preguntas Frecuentes - PrestaClub",
    description: "Resuelve todas tus dudas sobre préstamos con garantía hipotecaria, requisitos, procesos y más. Información clara y transparente.",
    alternates: {
        canonical: "/preguntas-frecuentes",
    },
};

export default function Page() {
    const faqLd = faqPageSchema(faqFlat);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <FaqPage />
        </>
    );
}
