import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { House, ArrowLeft } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import { Suspense } from "react"; // 1. Importación esencial

// 2. Creamos un componente "Hijo" que contiene todo el diseño
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

// 3. El componente principal envuelve TODO (incluyendo el Layout) en Suspense
export default function NotFound() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Layout>
                <NotFoundContent />
            </Layout>
        </Suspense>
    );
}