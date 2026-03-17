"use client";

import { motion } from "framer-motion";
import { Building2, Users, Target, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useDesarrolloWhatsApp } from "../hooks/useDesarrolloWhatsApp";

const segments = [
    {
        icon: Building2,
        tier: "Tier A",
        title: "Desarrollador institucional",
        subtitle: "Sin límite, de acuerdo a evaluación",
        characteristics: [
            "2-5 proyectos activos",
            "Relación bancaria existente",
            "Estructura organizacional"
        ],
        message: "Optimiza tu estructura financiera sin frenar obra ni comercialización",
        priority: "Máxima prioridad"
    },
    {
        icon: Users,
        tier: "Tier B",
        title: "Desarrollo patrimonial",
        subtitle: "Hasta S/ 3 millones",
        characteristics: [
            "Aún gestionando financiamiento bancario",
            "Construcción con recursos propios",
            "Socios personas naturales",
            "1-3 proyectos"
        ],
        message: "Obtén liquidez con tu activo inmobiliario sin perder control del proyecto",
        priority: "Prioridad media"
    },
    {
        icon: Target,
        tier: "Tier C",
        title: "Nuevos desarrollos inmobiliarios",
        subtitle: "Project-based",
        characteristics: [
            "Proyecto puntual",
            "Autofinanciado",
            "Garantía clara"
        ],
        message: "Liquidez con garantía para sacar adelante tu proyecto",
        priority: "Inbound calificado"
    }
];

const SegmentsSection = () => {
    const whatsappUrl = useDesarrolloWhatsApp();
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-body text-sm uppercase tracking-wider mb-4 block">
                        Segmentación
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        ¿Quién <span className="text-gradient-gold">califica</span>?
                    </h2>
                    <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                        Trabajamos con desarrolladores que cumplen criterios específicos.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {segments.map((segment, index) => (
                        <motion.div
                            key={segment.tier}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative p-6 rounded-2xl border transition-all duration-300 bg-gradient-card border-secondary/30 shadow-lg hover:shadow-gold"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-secondary/20">
                                <segment.icon className="w-6 h-6 text-secondary" />
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-xl font-bold mb-1">{segment.title}</h3>
                            <p className="text-sm font-body mb-4 text-secondary">
                                {segment.subtitle}
                            </p>

                            {/* Characteristics */}
                            <ul className="space-y-2 mb-6">
                                {segment.characteristics.map((char) => (
                                    <li key={char} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                                        <span className="text-secondary">•</span>
                                        {char}
                                    </li>
                                ))}
                            </ul>

                            {/* Message */}
                            <div className="p-4 rounded-lg bg-secondary/10">
                                <p className="text-sm font-body italic">"{segment.message}"</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Button variant="gold" size="lg" onClick={() => document.getElementById('evaluacion')?.scrollIntoView({ behavior: 'smooth' })}>
                        Evaluar proyecto
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default SegmentsSection;
