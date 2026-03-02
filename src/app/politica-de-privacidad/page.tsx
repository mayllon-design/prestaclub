import type { Metadata } from "next";
import PrivacyPage from "@/features/legal/PrivacyPage";

export const metadata: Metadata = {
    title: "Política de Privacidad - PrestaClub",
    description: "Conoce cómo protegemos y tratamos tus datos personales en PrestaClub. Transparencia y seguridad en cada paso.",
};

export default function Page() {
    return <PrivacyPage />;
}
