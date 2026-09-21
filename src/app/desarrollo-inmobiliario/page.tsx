import { Metadata } from "next";
import DesarrolloInmobiliarioPage from "@/features/desarrollo-inmobiliario/DesarrolloInmobiliarioPage";

export const metadata: Metadata = {
    title: "PrestaClub - Desarrollo Inmobiliario",
    description: "Financiamiento puente para tu proyecto inmobiliario.",
    alternates: {
        canonical: "/desarrollo-inmobiliario",
    },
};

export default function Page() {
    return <DesarrolloInmobiliarioPage />;
}
