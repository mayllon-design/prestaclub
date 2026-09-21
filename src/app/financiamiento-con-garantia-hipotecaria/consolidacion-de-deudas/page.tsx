import type { Metadata } from "next";
import { ConsolidacionDeudas } from "@/features/hipotecario/BuyerHipotecarioPage";

export const metadata: Metadata = {
    title: "Consolidación de Deudas con Garantía Hipotecaria - PrestaClub",
    description: "Unifica todas tus deudas en una sola cuota con garantía hipotecaria. Reduce tu carga financiera y recupera la tranquilidad.",
    alternates: {
        canonical: "/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas",
    },
};

export default function Page() {
    return <ConsolidacionDeudas />;
}
