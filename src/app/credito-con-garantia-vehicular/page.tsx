import type { Metadata } from "next";
import VehicularPage from "@/features/vehicular/VehicularPage";

export const metadata: Metadata = {
    title: "Crédito con Garantía Vehicular - PrestaClub",
    description: "Obtén un préstamo rápido usando tu vehículo como garantía. No custodiamos tu auto, ¡sigue manejándolo! Proceso seguro y legal.",
};

export default function Page() {
    return <VehicularPage />;
}
