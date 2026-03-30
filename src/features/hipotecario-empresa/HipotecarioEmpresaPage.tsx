"use client";

import Layout from "@/core/layouts/MainLayout";
import { HeroSection } from "./components/HeroSection";
import { GapSection } from "./components/GapSection";
import { CalculatorSection } from "./components/CalculatorSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { RequirementsSection } from "./components/RequirementsSection";
import { ConversionForm } from "./components/ConversionForm";

const HipotecarioEmpresaPage = () => {
  return (
    <Layout>
      <main className="overflow-x-hidden">
        {/* Bloque 1: Hero Section */}
        <HeroSection />
        
        {/* Bloque 2: La Brecha */}
        <GapSection />
        
        {/* Bloque 3: Calculadora Dinámica */}
        <CalculatorSection />
        
        {/* Bloque 4: Beneficios Estratégicos */}
        <BenefitsSection />
        
        {/* Bloque 5: Testimonials (Videos) */}
        <TestimonialsSection />
        
        {/* Bloque 6: Requisitos Simplificados */}
        <RequirementsSection />
        
        {/* Bloque 7: Footer de Conversión */}
        <ConversionForm />
      </main>
    </Layout>
  );
};

export default HipotecarioEmpresaPage;
