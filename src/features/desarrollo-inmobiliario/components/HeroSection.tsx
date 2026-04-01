"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Shield, Clock, Handshake, FileCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useDesarrolloWhatsApp } from "../hooks/useDesarrolloWhatsApp";
const deckPdf = "/assets/DESARROLLO-INMOBILIARIO.pdf";

const HeroSection = () => {
    const whatsappUrl = useDesarrolloWhatsApp();
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left"
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
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Financiamiento para <span className="text-gradient-gold">Proyectos Inmobiliarios</span> sin depender del banco
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-muted-foreground font-body mb-8 max-w-xl leading-relaxed">
                            Obtén capital para tu proyecto usando una propiedad como respaldo. Evaluación en 24–48h
                        </p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-start items-center"
                        >
                            <Button variant="hero" onClick={() => document.getElementById('evaluacion')?.scrollIntoView({ behavior: 'smooth' })}>
                                Evaluar mi proyecto
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - YouTube Video Container */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="w-full"
                    >
                        <p className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4 text-center lg:text-left">Mira este breve video</p>
                        <div className="rounded-2xl overflow-hidden border border-secondary/20 shadow-[0_0_50px_-12px_rgba(212,163,44,0.3)] glassmorphism">
                            <div className="aspect-video">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/qjR9qxJuNKQ?autoplay=0&rel=0"
                                    title="Financiamiento Puente PrestaClub"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Trust indicators - outside the grid to span width or follow grid? 
                    Keep them outside for better balance at the bottom of the hero section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
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
