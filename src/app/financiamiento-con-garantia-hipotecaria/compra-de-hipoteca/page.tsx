import type { Metadata } from "next";
import { CompraHipoteca } from "@/features/hipotecario/BuyerHipotecarioPage";

export const metadata: Metadata = {
    title: "Compra de Hipoteca - Refinanciamiento Hipotecario - PrestaClub",
    description: "Mejora las condiciones de tu hipoteca actual. Refinancia con mejores tasas y condiciones más flexibles.",
};

export default function Page() {
    return <CompraHipoteca />;
}
