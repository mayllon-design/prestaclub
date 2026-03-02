import type { Metadata } from "next";
import FinanciamientoHipotecario from "@/features/hipotecario/HipotecarioPage";

export const metadata: Metadata = {
    title: "Financiamiento con Garantía Hipotecaria - PrestaClub",
    description: "Obtén financiamiento usando tu propiedad como garantía. Capital de trabajo, construcción, consolidación de deudas y compra de hipoteca. Proceso en 7-15 días hábiles.",
};

export default function Page() {
    return <FinanciamientoHipotecario />;
}
