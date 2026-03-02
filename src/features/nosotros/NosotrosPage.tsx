import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Shield, Users, Target, Award, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import Image from "next/image";
import teamWorking from "@/assets/team-working.jpg";

const NosotrosPage = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient section-padding">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={teamWorking}
                        alt="Equipo PrestaClub trabajando"
                        className="w-full h-full object-cover opacity-20"
                        priority
                        fill
                    />
                </div>
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6">
                        Más de <span className="text-gradient-gold">23 años</span> conectando oportunidades
                    </h1>
                    <p className="text-lg md:text-xl text-primary-foreground/80 font-body mb-8">
                        Somos la plataforma líder en soluciones financieras con garantía real, comprometidos con el crecimiento de los peruanos.
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            <section className="section-padding bg-background">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
                        <div>
                            <h2 className="text-3xl font-extrabold mb-6">Nuestra Misión</h2>
                            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                                Brindar soluciones financieras ágiles y seguras a personas y microempresas que no tienen acceso a la banca tradicional, conectándolas con inversionistas institucionales bajo un modelo de garantía hipotecaria.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Inclusión Financiera",
                                    "Transparencia absoluta",
                                    "Rapidez en el servicio",
                                    "Respaldo institucional"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-gold" />
                                        <span className="font-semibold text-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-8 bg-muted rounded-3xl text-center">
                                <div className="text-4xl font-extrabold text-primary mb-2">+23</div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Años</div>
                            </div>
                            <div className="p-8 bg-primary/10 rounded-3xl text-center">
                                <div className="text-4xl font-extrabold text-primary mb-2">+15K</div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Operaciones</div>
                            </div>
                            <div className="p-8 bg-gold/10 rounded-3xl text-center">
                                <div className="text-4xl font-extrabold text-gold mb-2">+600M</div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Soles</div>
                            </div>
                            <div className="p-8 bg-muted rounded-3xl text-center">
                                <div className="text-4xl font-extrabold text-primary mb-2">SBS</div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Registrados</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ethics & Values */}
            <section className="section-padding bg-muted/30">
                <div className="container mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">Pilares que nos definen</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-body">Fundamentamos nuestra operación en la ética y el cumplimiento normativo.</p>
                </div>
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card-elevated p-8">
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Registro en SBS</h3>
                            <p className="text-muted-foreground font-body">Estamos inscritos en el Registro de Empresas de Préstamos y Empeños de la SBS (Resolución N° 02627-2020).</p>
                        </div>
                        <div className="card-elevated p-8">
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Prevención de Lavado</h3>
                            <p className="text-muted-foreground font-body">Contamos con un Oficial de Cumplimiento y reportamos directamente a la Unidad de Inteligencia Financiera (UIF).</p>
                        </div>
                        <div className="card-elevated p-8">
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Respaldo Institucional</h3>
                            <p className="text-muted-foreground font-body">Nuestras operaciones cuentan con el respaldo de inversionistas institucionales de primer nivel.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-background text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-extrabold mb-8 text-foreground">¿Listo para empezar?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="hero" size="xl" asChild>
                            <Link href="/financiamiento-con-garantia-hipotecaria">Ver Préstamos Hipotecarios</Link>
                        </Button>
                        <Button variant="outline" size="xl" asChild>
                            <Link href="/contacto">Contáctanos</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default NosotrosPage;
