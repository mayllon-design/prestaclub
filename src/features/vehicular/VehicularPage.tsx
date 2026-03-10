"use client";

import { useRef, useState } from "react";
import { MessageCircle, Shield, Clock, CheckCircle2, Landmark, Building2, Award, ChevronDown, FileCheck, BookOpen, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Layout from "@/core/layouts/MainLayout";
import VideoSection from "@/shared/components/VideoSection";
import CreditWizard from "@/features/credit-wizard/components/CreditWizard";
import heroVehicular from "@/assets/hero-vehicular.jpg";

const institutions = [
  {
    icon: Landmark,
    title: "Registrada en la SBS",
    description: "Resolución SBS N.º 2150-2020",
  },
  {
    icon: Building2,
    title: "Asociación Fintech Perú",
    description: "Miembro activo",
  },
  {
    icon: Award,
    title: "Cámara de Comercio de Lima",
    description: "Empresa asociada a la CCL",
  },
];

const faqs = [
  {
    question: "¿Cómo funciona el crédito con garantía vehicular?",
    answer:
      "Presentas tu vehículo de marca comercial con hasta 10 años de antigüedad. Evaluamos sus condiciones y te ofrecemos un monto preaprobado. Tu vehículo queda en custodia segura en nuestras instalaciones en Lima hasta que canceles el crédito. Los plazos disponibles van desde 30 hasta 180 días. Todo el proceso se formaliza ante notario y se registra en SUNARP.",
  },
  {
    question: "¿Qué marcas de vehículos aceptan para el préstamo?",
    answer:
      "Aceptamos las principales marcas comerciales del mercado peruano: Toyota, Hyundai, Kia, Nissan, Chevrolet, Honda, Ford, Mazda, Volkswagen, Subaru, Renault, entre otras. Si tu marca no aparece en nuestro listado, un asesor puede evaluar tu caso de forma personalizada.",
  },
  {
    question: "¿Qué pasa si no pago el crédito con garantía vehicular?",
    answer:
      "El crédito se formaliza mediante escritura pública ante notario y se registra en SUNARP. Si no se cumple el pago según los términos del contrato, se procede conforme a las disposiciones legales vigentes en Perú. Recomendamos comunicarte con tu asesor ante cualquier dificultad para buscar una solución.",
  },
  {
    question: "¿Cuánto me pueden prestar dejando mi auto en garantía?",
    answer:
      "El monto del préstamo depende de la marca, año, kilometraje y tipo de combustible de tu vehículo. Puedes usar nuestro simulador online para obtener una estimación en minutos. El valor mínimo del vehículo debe ser de S/ 20,000. Prestaclub está registrada en la SBS, por lo que ofrecemos condiciones formales y transparentes.",
  },
  {
    question: "¿Cuánto tiempo queda mi vehículo en custodia?",
    answer:
      "Tu vehículo permanece en custodia segura en nuestras instalaciones en Lima hasta que canceles el total del crédito. Los plazos van desde 30 hasta 180 días. La custodia incluye espacio con vigilancia permanente, póliza de seguros, control periódico y acta formal de entrega y devolución. Además, te entregamos tu vehiculo lavado y listo para usarlo.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-[#f3f4f7]" id="preguntas-frecuentes">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2b4b] mb-4 leading-tight">
            Preguntas frecuentes sobre el préstamo con garantía vehicular
          </h2>
          <p className="text-slate-500 text-lg">
            Resolvemos tus dudas sobre el crédito con garantía vehicular en Lima, Perú.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left py-6 px-8 flex items-center justify-between gap-4 outline-none"
                aria-expanded={openIndex === index}
              >
                <h3 className="font-bold text-[#1a2b4b] text-lg sm:text-xl leading-snug">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : ""
                    }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-8 pb-6 text-slate-600 leading-relaxed text-base sm:text-lg border-t border-slate-50 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const trustFeatures = [
  { icon: FileCheck, label: "Escritura pública ante notario" },
  { icon: Lock, label: "Custodia protegida" },
  { icon: Shield, label: "Acta de entrega y devolución" },
  { icon: Landmark, label: "Empresa registrada en SBS" },
];

const TrustFooter = () => (
  <section className="section-padding bg-primary">
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl font-bold text-primary-foreground text-center mb-12"
      >
        Tu crédito con total seguridad
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {trustFeatures.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex flex-col items-center gap-3 text-center p-4"
          >
            <div className="w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center">
              <item.icon className="w-7 h-7 text-[#ffa200]" />
            </div>
            <p className="text-primary-foreground/90 text-sm font-medium">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const InstitutionalTrust = () => (
  <section className="section-padding bg-muted/30">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Respaldo institucional
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Prestaclub se encuentra registrada en la SBS como empresa de préstamos,
          según Resolución SBS N.º 2150-2020.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {institutions.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="trust-badge"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <item.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-foreground text-lg">{item.title}</h3>
            <p className="text-muted-foreground text-sm text-center">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const VehicularVideoSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Conoce cómo funciona el crédito con garantía vehicular
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-foreground/5 aspect-[9/16]">
            <iframe
              src="https://www.youtube-nocookie.com/embed/bU46bUnckFw"
              title="Cómo funciona el préstamo con garantía vehicular en Lima - Prestaclub"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Hero = ({ onSimulate }: { onSimulate: () => void }) => {
  const whatsappUrl = "https://wa.me/51921010200?text=Hola%2C%20quiero%20información%20sobre%20el%20crédito%20con%20garantía%20vehicular";

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroVehicular}
          alt="SUV moderna para crédito con garantía vehicular en Lima"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      </div>

      <div className="relative z-10 container mx-auto section-padding">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Convierte tu vehículo en{" "}
            <span className="text-[#ffa200]">liquidez</span> en pocas horas.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/85 text-lg sm:text-xl mb-4 leading-relaxed"
          >
            Si tienes un vehículo de marca comercial y hasta 10 años de antigüedad,
            puedes obtener un crédito en plazos de hasta 180 días usando tu vehículo como respaldo.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-primary-foreground/70 text-base mb-8"
          >
            Tu vehículo queda protegido en custodia segura hasta cancelar el crédito.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onSimulate}
              className="btn-cta text-center py-4 px-8"
            >
              Simular mi crédito
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center justify-center gap-2 py-4 px-8"
            >
              <MessageCircle size={22} />
              Hablar por WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const VehicularPage = () => {
  const wizardRef = useRef<HTMLDivElement>(null);

  const scrollToSimulate = () => {
    wizardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <Hero onSimulate={scrollToSimulate} />

      <InstitutionalTrust />

      <VehicularVideoSection />

      {/* Simulator / Wizard */}
      <CreditWizard ref={wizardRef} />

      <FAQSection />

      <TrustFooter />
    </Layout>
  );
};

export default VehicularPage;
