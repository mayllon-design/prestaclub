"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Shield, Clock, Handshake, FileCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
const deckPdf = "/assets/DESARROLLO-INMOBILIARIO.pdf";

const HeroSection = () => {
    return (
        <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroBg.src})` }}
            >
                <div className="absolute inset-0 bg-gradient-hero" />
            </div>

            {/* Animated geometric elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 2 }}
                    className="absolute top-20 left-10 w-64 h-64 border border-secondary/30 rotate-45"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute bottom-20 right-10 w-96 h-96 border border-secondary/20 rounded-full"
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-secondary/30 bg-secondary/5"
                    >
                        <Building2 className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-body text-muted-foreground">Financiamiento Estructurado Inmobiliario</span>
                    </motion.div>

                    {/* Main Headline */}
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Financiamiento puente para{" "}
                        <span className="text-gradient-gold">Desarrollo inmobiliario</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-muted-foreground font-body mb-10 max-w-2xl mx-auto leading-relaxed">
                        Financiamiento con garantía hipotecaria, estructurado por Prestaclub y otorgado por fondos de inversión, alineado al flujo real de tu proyecto.
                    </p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button variant="hero" asChild>
                            <a
                                href="https://api.whatsapp.com/send?phone=51924274894&text=Hola%20*PrestaClub*.%20Deseo%20a%20evaluar%20mi%20Proyecto."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Solicitar EVALUACIÓN
                            </a>
                        </Button>

                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                    >
                        {[
                            { icon: TrendingUp, label: "Hasta 40% LTV" },
                            { icon: Clock, label: "Plazos flexibles" },
                            { icon: Shield, label: "Garantía hipotecaria" },
                            { icon: Handshake, label: "Fondos de inversión" },
                        ].map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm"
                            >
                                <item.icon className="w-6 h-6 text-secondary" />
                                <span className="text-sm font-body text-muted-foreground text-center">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-secondary/30 rounded-full flex items-start justify-center p-2"
                >
                    <div className="w-1.5 h-3 bg-secondary rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
