import type { Metadata } from "next";
import HipotecarioEmpresaPage from "@/features/hipotecario-empresa/HipotecarioEmpresaPage";

export const metadata: Metadata = {
    title: "Préstamos con Garantía Hipotecaria para Empresas - PrestaClub",
    description: "Liquidez de S/ 20,000 a S/ 5,000,000 para tu empresa en tiempo récord. Sin burocracia bancaria. Evaluación en 15 días.",
};

export default function Page() {
    return <HipotecarioEmpresaPage />;
}
