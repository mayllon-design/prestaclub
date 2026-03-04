"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Shield, Users, Building2, ArrowRight, ExternalLink } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import Image from "next/image";
import teamWorking from "@/assets/team-working.jpg";

const team = [
    { name: "Juan Diego Cañamero", role: "Gerente General", linkedin: "https://www.linkedin.com/in/juandiegocañamero" },
    { name: "Hellen Lengua", role: "Directora Comercial", linkedin: "https://www.linkedin.com/in/hellenlengua" },
    { name: "Leonides Mendiolaza", role: "Director Legal", linkedin: "https://www.linkedin.com/in/leonidesmendiolaza" },
];

const NosotrosPage = () => {
    return (
        <Layout>
            {/* Hero */}
            <section className="hero-gradient section-padding">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
                        Más de 23 años conectando <span className="text-gradient-gold">oportunidades financieras</span>
                    </h1>
                    <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body">
                        Somos una empresa inscrita en la SBS, especializada en conectar personas y empresas que necesitan financiamiento con inversionistas institucionales.
                    </p>
                </div>
            </section>

            {/* History */}
            <section className="section-padding bg-background">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-foreground mb-6">Nuestra Historia</h2>
                            <div className="space-y-4">
                                <p className="text-muted-foreground font-body leading-relaxed">
                                    Prestaclub nació hace más de dos décadas con la misión de democratizar el acceso al financiamiento en el Perú. Desde nuestros inicios, hemos trabajado para crear un puente entre quienes necesitan capital y los inversionistas institucionales dispuestos a respaldarlo.
                                </p>
                                <p className="text-muted-foreground font-body leading-relaxed">
                                    Con más de 15,000 operaciones realizadas y más de S/600 millones desembolsados, nos hemos consolidado como una referencia en el mercado de financiamiento con garantía real.
                                </p>
                                <p className="text-muted-foreground font-body leading-relaxed">
                                    Estamos inscritos en la SBS en el Registro de Empresas de Préstamo y reportamos a la UIF, garantizando la transparencia y legalidad de todas nuestras operaciones.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-xl relative aspect-[4/3]">
                            <Image
                                src={teamWorking}
                                alt="Equipo PrestaClub"
                                className="object-cover"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="section-padding bg-muted/50">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card-elevated p-8">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">Misión</h3>
                            <p className="text-muted-foreground font-body leading-relaxed">
                                Democratizar el acceso al financiamiento en el Perú, conectando a personas y empresas con inversionistas institucionales de manera transparente, rápida y segura.
                            </p>
                        </div>
                        <div className="card-elevated p-8">
                            <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                                <Building2 className="h-6 w-6 text-gold" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">Registro SBS</h3>
                            <p className="text-muted-foreground font-body leading-relaxed">
                                Estamos inscritos en la Superintendencia de Banca, Seguros y AFP (SBS) en el Registro de Empresas de Préstamo. Reportamos a la Unidad de Inteligencia Financiera (UIF).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section-padding bg-background">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-extrabold text-foreground mb-4 text-center">Equipo Directivo</h2>
                    <p className="text-muted-foreground text-center mb-12 font-body">Profesionales comprometidos con tu éxito financiero.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {team.map((member, i) => (
                            <div key={i} className="card-elevated p-6 text-center">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                                    Ver perfil en LinkedIn <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="section-padding bg-muted/50">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center">Nuestras Oficinas</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card-elevated overflow-hidden">
                            <div className="h-48 bg-primary/5 flex items-center justify-center">
                                <Building2 className="h-16 w-16 text-primary/30" />
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-foreground">Oficina Principal - Cercado de Lima</h3>
                                <p className="text-sm text-muted-foreground font-body">Av. Nicolás de Piérola 950, frente a la Plaza San Martín</p>
                            </div>
                        </div>
                        <div className="card-elevated overflow-hidden">
                            <div className="h-48 bg-primary/5 flex items-center justify-center">
                                <Building2 className="h-16 w-16 text-primary/30" />
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-foreground">Oficina Comercial - Ventanilla</h3>
                                <p className="text-sm text-muted-foreground font-body">Pj. 51 Mz G6 Lt. 4 (Angamos), Ventanilla</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="hero-gradient section-padding">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-3xl font-extrabold text-primary-foreground mb-6">¿Listo para trabajar con nosotros?</h2>
                    <Button variant="hero" size="xl" asChild>
                        <Link href="/financiamiento-con-garantia-hipotecaria#precalificar">PRECALIFICAR AHORA <ArrowRight className="h-5 w-5" /></Link>
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default NosotrosPage;
