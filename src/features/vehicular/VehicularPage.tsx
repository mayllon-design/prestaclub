"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Car, CheckCircle2, ArrowRight, Shield, Clock, Phone, MessageCircle } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import VideoSection from "@/shared/components/VideoSection";
import Image from "next/image";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

const VehicularPage = () => {
  const { getWhatsAppUrl, clearTracking } = useTrafficTracking();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    nombre: "",
    celular: "",
    marca: "",
    modelo: "",
    anio: "",
    monto: "",
  });

  const update = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };
  const handleWhatsApp = () => {
    const message = `Hola, estoy interesado en un crédito con garantía vehicular.\n\n` +
      `Datos del vehículo:\n` +
      `Marca: ${data.marca}\n` +
      `Modelo: ${data.modelo}\n` +
      `Año: ${data.anio}\n\n` +
      `Datos personales:\n` +
      `Nombre: ${data.nombre}\n` +
      `Celular: ${data.celular}`;

    window.open(getWhatsAppUrl(message), "_blank");
    clearTracking();
  };

  return (
    <Layout>
      <section className="relative overflow-hidden hero-gradient section-padding">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 mb-6">
            <Car className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-gold">Crédito con Garantía Vehicular</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
            Obtén liquidez inmediata con tu <span className="text-gradient-gold">vehículo</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body mb-8">
            Usa tu auto como respaldo y obtén el capital que necesitas sin dejar de manejarlo. Proceso rápido y seguro.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link href="#simulador">EMPEZAR AHORA <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Simulator / Form */}
      <section id="simulador" className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="card-elevated p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Simulador de Crédito</h2>

            {step === 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Marca</label>
                    <input
                      type="text"
                      placeholder="Ej: Toyota"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background"
                      value={data.marca}
                      onChange={(e) => update("marca", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Modelo</label>
                    <input
                      type="text"
                      placeholder="Ej: Corolla"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background"
                      value={data.modelo}
                      onChange={(e) => update("modelo", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Año</label>
                    <input
                      type="number"
                      placeholder="Ej: 2020"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background"
                      value={data.anio}
                      onChange={(e) => update("anio", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Monto solicitado</label>
                    <input
                      type="text"
                      placeholder="Ej: S/ 10,000"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background"
                      value={data.monto}
                      onChange={(e) => update("monto", e.target.value)}
                    />
                  </div>
                </div>
                <Button variant="gold" className="w-full py-6" onClick={() => setStep(1)} disabled={!data.marca || !data.modelo || !data.anio}>
                  CONTINUAR
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full h-11 px-4 rounded-xl border border-input bg-background"
                    value={data.nombre}
                    onChange={(e) => update("nombre", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">WhatsApp / Celular</label>
                  <input
                    type="tel"
                    placeholder="999 999 999"
                    className="w-full h-11 px-4 rounded-xl border border-input bg-background"
                    value={data.celular}
                    onChange={(e) => update("celular", e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 py-6" onClick={() => setStep(0)}>ATRÁS</Button>
                  <Button variant="whatsapp" className="flex-2 py-6" onClick={handleWhatsApp} disabled={!data.nombre || !data.celular}>
                    SOLICITAR POR WHATSAPP <MessageCircle className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <VideoSection title="¿Cómo funciona el crédito vehicular?" videoId="DYqcB5vEq_g" />

      {/* Benefits */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12">Beneficios Exclusive</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-2xl shadow-sm border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Sigue manejando</h3>
              <p className="text-sm text-muted-foreground">No custodiamos tu vehículo. Sigue usándolo para tu trabajo o vida diaria.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl shadow-sm border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Rapidez</h3>
              <p className="text-sm text-muted-foreground">Desembolsos en tiempo récord una vez aprobada la garantía.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl shadow-sm border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Tasas Justas</h3>
              <p className="text-sm text-muted-foreground">Condiciones competitivas comparadas con préstamos personales tradicionales.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VehicularPage;
