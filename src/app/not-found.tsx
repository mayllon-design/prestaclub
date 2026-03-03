"use client"; // 1. ESTA ES LA CLAVE: Permite usar onClick y window.history

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { House, ArrowLeft } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import { Suspense } from "react";

function NotFoundContent() {
    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center section-padding text-center">
            <div className="h-24 w-24 bg-gold/10 rounded-full flex items-center justify-center mb-8">
                <House className="h-10 w-10 text-gold" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-primary mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Página no encontrada</h2>
            <p className="text-lg text-muted-foreground font-body max-w-md mx-auto mb-10">
                Lo sentimos, la página que buscas no existe o ha sido movida a una nueva ubicación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                    <Link href="/">VOLVER AL INICIO</Link>
                </Button>
                {/* Ahora el onClick funcionará sin romper el build */}
                <Button
                    variant="outline"
                    size="xl"
                    onClick={() => typeof window !== 'undefined' && window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-5 w-5" /> REGRESAR
                </Button>
            </div>
        </section>
    );
}

export default function NotFound() {
    return (
        <Layout>
            <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center"><p>Cargando...</p></div>}>
                <NotFoundContent />
            </Suspense>
        </Layout>
    );
}