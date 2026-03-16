"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useDesarrolloWhatsApp } from "../hooks/useDesarrolloWhatsApp";


const CTASection = () => {
    const whatsappUrl = useDesarrolloWhatsApp();
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center p-8 md:p-16 rounded-3xl bg-gradient-card border border-secondary/20 shadow-elevated relative overflow-hidden"
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <span className="text-secondary font-body text-sm uppercase tracking-wider mb-4 block">
                                ¿LISTO PARA SEGUIR AVANZANDO CON TU PROYECTO?
                            </span>

                            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                                Solicita una evaluación de tu{" "}
                                <span className="text-gradient-gold">proyecto</span>
                            </h2>

                            <p className="text-muted-foreground font-body text-lg mb-8 max-w-2xl mx-auto">
                                Sin compromiso. Evaluamos la viabilidad de tu proyecto y te presentamos opciones de estructuración financiera.
                            </p>

                            {/* CTA Button */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                <Button variant="hero" asChild>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center"
                                    >
                                        Solicitar EVALUACIÓN
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </a>
                                </Button>
                            </div>

                            {/* Contact info */}
                            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-border">
                                <a
                                    href="tel:+51924274894"
                                    className="flex items-center justify-center gap-3 text-muted-foreground hover:text-secondary transition-colors"
                                >
                                    <Phone className="w-5 h-5 text-secondary shrink-0" />
                                    <span className="font-body">924 274 894</span>
                                </a>
                                <a
                                    href="mailto:proyectos.inmobiliarios@prestaclub.com"
                                    className="flex items-center justify-center gap-3 text-muted-foreground hover:text-secondary transition-colors"
                                >
                                    <Mail className="w-5 h-5 text-secondary shrink-0" />
                                    <span className="font-body break-all md:break-normal">
                                        proyectos.inmobiliarios@prestaclub.com
                                    </span>
                                </a>
                                <a
                                    href="https://maps.app.goo.gl/CtkZ1GMXthPCm4L3A"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 text-muted-foreground hover:text-secondary transition-colors"
                                >
                                    <MapPin className="w-5 h-5 text-secondary shrink-0" />
                                    <span className="font-body">Lima, Perú</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
