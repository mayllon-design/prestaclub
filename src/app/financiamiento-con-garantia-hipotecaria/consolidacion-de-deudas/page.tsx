import type { Metadata } from "next";
import { ConsolidacionDeudas } from "@/features/hipotecario/BuyerHipotecarioPage";

export const metadata: Metadata = {
    title: "Unificar y pagar deudas con garantía hipotecaria - PrestaClub",
    description: "Junta y paga todas tus deudas en una sola cuota con la garantía de tu casa, aunque estés en Infocorp. Menos intereses y una sola fecha de pago.",
    alternates: {
        canonical: "/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas",
    },
};

export default function Page() {
    return <ConsolidacionDeudas />;
}
