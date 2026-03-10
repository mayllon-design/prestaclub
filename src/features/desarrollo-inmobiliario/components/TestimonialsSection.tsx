"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import avatarCarlos from "@/assets/testimonio01.png";
import avatarAna from "@/assets/testimonio02.png";
import avatarEmpresa from "@/assets/testimonio03.png";


const testimonials = [
    {
        name: "Carlos Rodríguez",
        role: "Desarrollador Inmobiliario",
        location: "Pueblo Libre, Lima",
        quote: "Prestasclub nos ayudó a cubrir nuestras necesidades de liquidez para el proyecto. El proceso fue rápido y seguro. Es una excelente alternativa a la banca.",
        avatar: avatarCarlos
    },
    {
        name: "Ana Morales",
        role: "Arquitecta & Gestora",
        location: "Lince, Lima",
        quote: "Nos ayudaron a mantener la continuidad del proyecto en recta final (acabados) y entregar sin problemas. Es una solución muy buena a corto plazo para proyectos inmobiliarios.",
        avatar: avatarAna
    },
    {
        name: "Grupo Constructor 360",
        role: "Empresa Constructora",
        location: "San Miguel, Lima",
        quote: "Gracias a Prestaclub pudimos destrabar la obra y continuar hasta lograr que un banco sea sponsor del proyecto. Es un socio estratégico para nosotras las inmobiliarias.",
        avatar: avatarEmpresa
    }
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-muted/30 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-body text-sm uppercase tracking-wider mb-4 block">
                        Testimonios
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        Lo que dicen nuestros <span className="text-gradient-gold">socios</span>
                    </h2>
                    <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                        Historias de éxito de desarrolladores que confiaron en nosotros para impulsar sus proyectos.
                    </p>
                </motion.div>

                {/* Main Video Testimonial */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-secondary/20 shadow-elevated bg-card group">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/t8WuJhqTfbQ"
                            title="Testimonio Destacado"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                        <div className="absolute inset-0 pointer-events-none border-2 border-secondary/5 rounded-3xl" />
                    </div>
                    <div className="mt-6 text-center">
                        <h3 className="font-display text-xl font-bold">Caso de Éxito Destacado</h3>
                        <p className="text-muted-foreground font-body text-sm">Conoce cómo ayudamos a transformar proyectos a gran escala.</p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="bg-card p-8 rounded-2xl border border-border hover:border-secondary/30 transition-all duration-300 hover:shadow-gold relative group"
                        >
                            <Quote className="absolute top-8 right-8 w-8 h-8 text-secondary/10 group-hover:text-secondary/20 transition-colors" />

                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-12 w-12 border-2 border-secondary/20">
                                    <AvatarImage src={testimonial.avatar.src} alt={testimonial.name} className="object-cover" />
                                    <AvatarFallback className="bg-secondary/10 text-secondary font-bold">
                                        {testimonial.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-display font-bold text-lg leading-tight">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground font-body">{testimonial.role}</p>
                                    <p className="text-xs text-secondary font-body">{testimonial.location}</p>
                                </div>
                            </div>

                            <p className="text-muted-foreground font-body italic relative z-10">
                                "{testimonial.quote}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
