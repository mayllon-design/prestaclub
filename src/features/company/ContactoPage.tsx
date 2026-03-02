"use client";

import { Button } from "@/shared/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

const Contacto = () => {
  const { whatsappUrl, whatsappNumber, clearTracking } = useTrafficTracking();
  return (
    <Layout>
      <section className="hero-gradient section-padding">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
            <span className="text-gradient-gold">Contáctanos</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Estamos aquí para ayudarte. Elige el canal que prefieras.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a href={whatsappUrl} onClick={clearTracking} target="_blank" rel="noopener noreferrer" className="card-elevated p-6 text-center hover:shadow-2xl transition-shadow group">
              <div className="h-12 w-12 rounded-xl bg-[hsl(142,70%,45%)]/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-[hsl(142,70%,45%)]" />
              </div>
              <h3 className="font-bold text-foreground mb-1">WhatsApp</h3>
              <p className="text-sm text-muted-foreground font-body">{whatsappNumber === '51921010200' ? '+51 921 010 200' : '+51 919 000 200'}</p>
            </a>
            <a href="tel:012021500" className="card-elevated p-6 text-center hover:shadow-2xl transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Teléfono</h3>
              <p className="text-sm text-muted-foreground font-body">(01) 202-1500</p>
            </a>
            <a href="mailto:informes@prestaclub.com" className="card-elevated p-6 text-center hover:shadow-2xl transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Email</h3>
              <p className="text-sm text-muted-foreground font-body">informes@prestaclub.com</p>
            </a>
            <div className="card-elevated p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-celeste/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-celeste" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Horario</h3>
              <p className="text-sm text-muted-foreground font-body">Lun-Vie 9am - 6pm</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-elevated p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Oficina Principal</h3>
                  <p className="text-sm text-muted-foreground font-body">Av. Nicolás de Piérola 950 (frente a la Plaza San Martín), Cercado de Lima</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden h-48 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.9641!2d-77.0347!3d-12.0500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAzJzAwLjAiUyA3N8KwMDInMDUuMCJX!5e0!3m2!1ses!2spe!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Oficina Principal PrestaClub"
                />
              </div>
            </div>
            <div className="card-elevated p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Oficina Comercial Ventanilla</h3>
                  <p className="text-sm text-muted-foreground font-body">Pj. 51 Mz G6 Lt. 4 (Angamos), Ventanilla</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden h-48 bg-muted flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Mapa disponible próximamente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-6">¿Prefieres que te llamemos?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 font-body">Escríbenos por WhatsApp y coordinamos una llamada.</p>
          <Button variant="hero" size="xl" asChild>
            <a href={whatsappUrl} onClick={clearTracking} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
