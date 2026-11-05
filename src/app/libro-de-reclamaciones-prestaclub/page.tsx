import type { Metadata } from "next";
import Layout from "@/core/layouts/MainLayout";
import ReclamacionForm from "@/features/reclamaciones/ReclamacionForm";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones - PrestaClub",
  description: "Libro de Reclamaciones virtual de PRESTACLUB S.A.C., conforme a la Ley N.° 29571. Registra tu reclamo o queja y recibe tu código de constancia.",
  alternates: { canonical: "/libro-de-reclamaciones-prestaclub" },
};

export default function Page() {
  return (
    <Layout>
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-3">Ley N.° 29571 · INDECOPI</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">Libro de Reclamaciones</h1>
          <p className="text-lg text-primary-foreground/80 font-body">
            Conforme al Código de Protección y Defensa del Consumidor, PrestaClub pone a tu disposición su Libro de
            Reclamaciones virtual. Completa el formulario y recibirás un código como constancia.
          </p>
        </div>
      </section>
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-3xl px-4">
          <ReclamacionForm />
        </div>
      </section>
    </Layout>
  );
}
