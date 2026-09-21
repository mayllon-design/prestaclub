import type { Metadata } from "next";
import { CompraHipoteca } from "@/features/hipotecario/BuyerHipotecarioPage";

export const metadata: Metadata = {
    title: "Compra de Hipoteca - Refinanciamiento Hipotecario - PrestaClub",
    description: "Mejora las condiciones de tu hipoteca actual. Refinancia con mejores tasas y condiciones más flexibles.",
    alternates: {
        canonical: "/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca",
    },
};

export default function Page() {
    return <CompraHipoteca />;
}
