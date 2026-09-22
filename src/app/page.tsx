import type { Metadata } from "next";
import Principal from "@/features/home/PrincipalPage";

export const metadata: Metadata = {
  title: "PrestaClub | Financiamiento con garantía real en Perú - Registrados en SBS",
  description: "PrestaClub: fintech peruana de financiamiento con garantía hipotecaria mediante fondos de inversión, registrada en la SBS. +24 años y +15,000 operaciones respaldando a personas y empresas en el Perú.",
  keywords: ["PrestaClub", "financiamiento con garantía real", "fintech Perú", "financiamiento Perú", "registrados en SBS"],
};

export default function Home() {
  return <Principal />;
}
