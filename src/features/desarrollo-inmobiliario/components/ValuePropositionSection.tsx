"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const ValuePropositionSection = () => {
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
                        Propuesta de valor
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        Financiamiento Puente <span className="text-gradient-gold">Estructurado</span>
                    </h2>
                    <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                        Soluciones de capital estructurado para proyectos inmobiliarios en distintas etapas de desarrollo.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* What we ARE */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 rounded-2xl bg-gradient-card border border-secondary/20 shadow-gold"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-secondary" />
                            </div>
                            <h3 className="font-display text-2xl font-bold">Esto SÍ es</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Financiamiento estructurado",
                                "Solución de capital basado en activos como garantía",
                                "Instrumento de corto a mediano plazo (hasta 12 meses)",
                                "Complemento y/o alternativa a líneas bancarias y pre-banca",
                                "Estructura de pagos según flujo del proyecto"
                            ].map((item, index) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                    className="flex items-start gap-3 font-body"
                                >
                                    <span className="text-secondary mt-1">→</span>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* What we are NOT */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 rounded-2xl bg-card border border-border/50"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-muted-foreground">Esto NO es</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Crédito hipotecario bancario",
                                "Préstamo retail o masivo",
                                "Crédito a sola firma",
                                "Sustituto permanente del banco",
                                "Crédito rápido o sin evaluación"
                            ].map((item, index) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                    className="flex items-start gap-3 font-body text-muted-foreground"
                                >
                                    <span className="mt-1">✕</span>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Central value proposition */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 p-8 md:p-12 rounded-2xl glass border-gold-glow max-w-4xl mx-auto text-center"
                >
                    <blockquote className="font-display text-xl md:text-2xl italic leading-relaxed mb-6">
                        "Estructuramos financiamiento para proyectos de desarrollo inmobiliario, utilizando garantías hipotecarias y capital proveniente de fondos de inversión, con esquemas de plazo y pago flexibles, alineados al flujo real del proyecto."
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-secondary/50" />
                        <span className="text-secondary font-body font-semibold">Prestaclub</span>
                        <div className="h-px w-12 bg-secondary/50" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ValuePropositionSection;
