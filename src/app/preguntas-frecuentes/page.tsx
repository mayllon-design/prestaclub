import type { Metadata } from "next";
import FaqPage from "@/features/content/FaqPage";

export const metadata: Metadata = {
    title: "Preguntas Frecuentes - PrestaClub",
    description: "Resuelve todas tus dudas sobre préstamos con garantía hipotecaria, requisitos, procesos y más. Información clara y transparente.",
    alternates: {
        canonical: "/preguntas-frecuentes",
    },
};

export default function Page() {
    return <FaqPage />;
}
