"use client";

import { motion } from "framer-motion";
import { FileSearch, Scale, FileText, Banknote } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: FileSearch,
        title: "Precalificación y Diagnóstico",
        description: "Validación inicial del proyecto, garantía y estructura del desarrollador."
    },
    {
        number: "02",
        icon: Scale,
        title: "Evaluación Legal",
        description: "Revisión de la garantía hipotecaria, titularidad y cargas registrales."
    },
    {
        number: "03",
        icon: FileText,
        title: "Estructuración y Term Sheet",
        description: "Diseño del financiamiento en monto, plazo, cuotas y condiciones. Presentación a fondos de inversión para aprobación de la operación de financiamiento."
    },
    {
        number: "04",
        icon: Banknote,
        title: "Desembolso",
        description: "Aceptación, contratos, coordinación notarial y liberación de fondos."
    }
];

const ProcessSection = () => {
    return (
        <section className="py-24 bg-gradient-navy relative overflow-hidden">
            {/* Top border */}
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
                        Proceso
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        Del diagnóstico al <span className="text-gradient-gold">desembolso</span>
                    </h2>
                    <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                        Un proceso estructurado con filtros progresivos de riesgo, información y decisión.
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connection line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex items-start gap-6 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Content */}
                            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                <div className={`p-6 rounded-xl bg-gradient-card border border-border hover:border-secondary/30 transition-all duration-300 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                                    } max-w-md`}>
                                    <div className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                            <step.icon className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <span className="text-secondary font-body text-sm">{step.number}</span>
                                            <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground font-body text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center dot - hidden on mobile */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background z-10" />

                            {/* Spacer for alternating layout */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
