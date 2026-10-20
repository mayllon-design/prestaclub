import type { Metadata } from "next";
import PortadaV2Page from "@/features/home-v2/PortadaV2Page";

// Portada alternativa en evaluación. Fuera del índice y del sitemap para que no
// compita con la home ("/") mientras se decide cuál queda.
export const metadata: Metadata = {
  title: "PrestaClub | Financiamiento con garantía real - Registrados en SBS",
  description: "Elige tu camino: financiamiento con garantía para personas y pymes, o para empresas y proyectos inmobiliarios. +24 años y registrados en la SBS.",
  alternates: { canonical: "/inicio-v2" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <PortadaV2Page />;
}
