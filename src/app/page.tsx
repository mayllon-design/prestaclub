import type { Metadata } from "next";
import Principal from "@/features/home/PrincipalPage";

export const metadata: Metadata = {
  title: "PrestaClub | Financiamiento con garantía real - Registrados en SBS",
  description: "Fintech peruana registrada en la SBS: financiamiento con garantía real para personas y empresas mediante fondos de inversión. +24 años y +15,000 operaciones.",
  keywords: ["PrestaClub", "financiamiento con garantía real", "fintech Perú", "financiamiento Perú", "registrados en SBS"],
};

export default function Home() {
  return <Principal />;
}
