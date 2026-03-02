import type { Metadata } from "next";
import SaneamientoPage from "@/features/saneamiento/SaneamientoPage";

export const metadata: Metadata = {
    title: "Saneamiento Predial y Legal - PrestaClub",
    description: "Regulariza tu propiedad con expertos. Saneamiento predial, independización, declaratoria de fábrica e inscripción en SUNARP.",
};

export default function Page() {
    return <SaneamientoPage />;
}
