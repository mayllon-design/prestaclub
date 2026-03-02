"use client";

import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Layout from "@/core/layouts/MainLayout";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

const FaqPage = () => {
  const { whatsappUrl, clearTracking } = useTrafficTracking();
  const faqs = [
    {
      group: "General",
      items: [
        { q: "¿Qué es PrestaClub?", a: "PrestaClub es una plataforma que facilita el acceso a financiamiento conectando a personas y empresas que tienen una propiedad con inversionistas institucionales. Tenemos más de 23 años en el mercado peruano." },
        { q: "¿Están supervisados por la SBS?", a: "Sí, estamos inscritos en el Registro de Empresas de Préstamos y Empeños de la SBS (Resolución N° 02627-2020) y reportamos a la Unidad de Inteligencia Financiera (UIF)." }
      ]
    },
    {
      group: "Préstamos Hipotecarios",
      items: [
        { q: "¿Qué requisitos necesito para precalificar?", a: "Documento de identidad (DNI), copia literal de la partida registral del inmueble actualizada (HR/PU) y un recibo de servicios." },
        { q: "¿Puedo obtener un préstamo si estoy en Infocorp?", a: "Sí, evaluamos tu caso de forma personalizada. Al contar con una garantía real, tu historial crediticio no es el único factor determinante." }
      ]
    },
    {
      group: "Saneamiento",
      items: [
        { q: "¿Qué es el saneamiento predial?", a: "Es el proceso técnico-legal para regularizar la situación de una propiedad e inscribirla correctamente ante la SUNARP, permitiendo que sea apta para hipotecas o venta." }
      ]
    }
  ];

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-foreground mb-4">Preguntas Frecuentes</h1>
            <p className="text-muted-foreground font-body">Todo lo que necesitas saber sobre nuestras soluciones financieras.</p>
          </div>

          <div className="space-y-12">
            {faqs.map((group, i) => (
              <div key={i}>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6" /> {group.group}
                </h2>
                <div className="space-y-4">
                  {group.items.map((item, j) => (
                    <details key={j} className="card-elevated group overflow-hidden">
                      <summary className="p-6 cursor-pointer font-bold text-foreground flex justify-between items-center bg-card hover:bg-muted/30 transition-colors">
                        {item.q}
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-6 pt-0 text-muted-foreground font-body leading-relaxed border-t border-border/50 bg-muted/10">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-3xl gold-gradient text-center">
            <h3 className="text-2xl font-bold text-gold-foreground mb-4">¿Aún tienes dudas?</h3>
            <p className="text-gold-foreground/90 mb-8 font-body">Nuestro equipo de asesores está listo para ayudarte personalmente.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link href="/contacto">Contáctanos</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href={whatsappUrl} onClick={clearTracking}>WhatsApp Directo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FaqPage;
