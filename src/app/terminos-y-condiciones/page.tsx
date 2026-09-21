import type { Metadata } from "next";
import TermsPage from "@/features/legal/TermsPage";

export const metadata: Metadata = {
    title: "Términos y Condiciones - PrestaClub",
    description: "Lee los términos y condiciones de uso de la plataforma PrestaClub. Transparencia legal para tu seguridad.",
    alternates: {
        canonical: "/terminos-y-condiciones",
    },
};

export default function Page() {
    return <TermsPage />;
}
