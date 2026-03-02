import type { Metadata } from "next";
import NosotrosPage from "@/features/nosotros/NosotrosPage";

export const metadata: Metadata = {
    title: "Sobre Nosotros - Conoce PrestaClub",
    description: "Conoce nuestra trayectoria de más de 23 años brindando soluciones financieras con garantía real en Perú. Registrados en la SBS.",
};

export default function Page() {
    return <NosotrosPage />;
}
