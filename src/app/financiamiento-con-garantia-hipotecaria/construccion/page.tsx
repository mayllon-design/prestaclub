import type { Metadata } from "next";
import { Construccion } from "@/features/hipotecario/BuyerHipotecarioPage";

export const metadata: Metadata = {
    title: "Financiamiento para Construcción con Garantía Hipotecaria - PrestaClub",
    description: "Financia tu proyecto de construcción o remodelación con tu terreno o propiedad como garantía. Sin historial crediticio requerido.",
};

export default function Page() {
    return <Construccion />;
}
