import { Metadata } from "next";
import DesarrolloInmobiliarioPage from "@/features/desarrollo-inmobiliario/DesarrolloInmobiliarioPage";

export const metadata: Metadata = {
    title: "PrestaClub - Desarrollo Inmobiliario",
    description: "Financiamiento y crédito puente para tu proyecto inmobiliario, a través de fondos de inversión institucionales. Cobertura en todo el Perú.",
    alternates: {
        canonical: "/desarrollo-inmobiliario",
    },
};

export default function Page() {
    return <DesarrolloInmobiliarioPage />;
}
