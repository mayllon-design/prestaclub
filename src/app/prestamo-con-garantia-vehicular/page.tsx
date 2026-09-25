import type { Metadata } from "next";
import VehicularPage from "@/features/vehicular/VehicularPage";
import { faqsVehicular } from "@/features/vehicular/faqsVehicular";
import { faqPageSchema } from "@/shared/lib/structuredData";

export const metadata: Metadata = {
    title: "Crédito con Garantía Vehicular con custodia - PrestaClub",
    description: "Obtén un préstamo rápido usando tu vehículo como garantía, en plazos de hasta 180 días. Tu vehículo queda protegido en custodia segura hasta cancelar el crédito.",
    alternates: {
        canonical: "/prestamo-con-garantia-vehicular",
    },
};

export default function Page() {
    const faqLd = faqPageSchema(faqsVehicular);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <VehicularPage />
        </>
    );
}
