import type { Metadata } from "next";
import VehicularPage from "@/features/vehicular/VehicularPage";

export const metadata: Metadata = {
    title: "Crédito con Garantía Vehicular - PrestaClub",
    description: "Obtén un préstamo rápido usando tu vehículo como garantía, en plazos de hasta 180 días. Tu vehículo queda protegido en custodia segura hasta cancelar el crédito.",
};

export default function Page() {
    return <VehicularPage />;
}
