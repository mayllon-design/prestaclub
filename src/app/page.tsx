import type { Metadata } from "next";
import Principal from "@/features/home/PrincipalPage";

export const metadata: Metadata = {
  title: "PrestaClub - Financiamiento con Garantía Hipotecaria y Vehicular",
  description: "Obtén el capital que tu negocio o proyecto necesita con el respaldo de tu propiedad o vehículo. +23 años, +15,000 operaciones. Registrados en la SBS.",
  keywords: ["préstamos hipotecarios", "garantía hipotecaria", "financiamiento Perú", "PrestaClub", "crédito vehicular"],
};

export default function Home() {
  return <Principal />;
}
