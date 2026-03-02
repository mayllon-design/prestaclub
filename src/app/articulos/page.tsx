import type { Metadata } from "next";
import ArticulosPage from "@/features/articulos/ArticulosPage";

export const metadata: Metadata = {
    title: "Artículos y Blog Financiero - PrestaClub",
    description: "Aprende sobre préstamos con garantía hipotecaria, saneamiento predial y consejos financieros para tu negocio en nuestro blog especializado.",
};

export default function Page() {
    return <ArticulosPage />;
}
