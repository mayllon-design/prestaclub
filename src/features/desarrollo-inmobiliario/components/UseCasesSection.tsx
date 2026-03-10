"use client";

import { motion } from "framer-motion";
import { Building, Wrench, RefreshCcw } from "lucide-react";

const useCases = [
    {
        icon: Building,
        title: "Pre-banca",
        description: "Proyecto aún no calza en banca, pero el proyecto es sólido. Capital para arrancar.",
        tag: "Capital inicial"
    },
    {
        icon: RefreshCcw,
        title: "Reperfilamiento",
        description: "Reorganización de pasivos de corto plazo para ordenar el flujo financiero.",
        tag: "Reestructuración"
    },
    {
        icon: Wrench,
        title: "Continuidad de obra",
        description: "Liquidez estructurada para evitar paralización y pérdida de valor del proyecto.",
        tag: "Puente temporal"
    }
];

const UseCasesSection = () => {
    return (
        <section className="py-24 bg-gradient-navy relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-body text-sm uppercase tracking-wider mb-4 block">
                        Casos de uso
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        Financiamiento Puente que <span className="text-gradient-gold">resuelve</span>
                    </h2>
                    <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                        Estructuramos un financiamiento puente a medida de tu proyecto para cubrir gaps de liquidez, al inicio, durante o al final de la vida útil de tu proyecto inmobiliario, con tasas preferenciales (a nivel del sistema financiero).
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={useCase.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-6 rounded-xl bg-gradient-card border border-border hover:border-secondary/30 transition-all duration-300 hover:shadow-gold"
                        >
                            {/* Tag */}
                            <span className="inline-block px-3 py-1 text-xs font-body bg-secondary/10 text-secondary rounded-full mb-4">
                                {useCase.tag}
                            </span>

                            {/* Icon */}
                            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                <useCase.icon className="w-6 h-6 text-secondary" />
                            </div>

                            {/* Content */}
                            <h3 className="font-display text-xl font-semibold mb-2">{useCase.title}</h3>
                            <p className="text-muted-foreground font-body text-sm leading-relaxed">
                                {useCase.description}
                            </p>

                            {/* Hover accent */}
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UseCasesSection;
