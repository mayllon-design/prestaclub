"use client"; // 1. Añadimos esto para permitir manejadores de eventos

import ArticulosPage from "@/features/articulos/ArticulosPage";
import { Suspense } from "react";

// Nota: Cuando usas "use client", la metadata se debe manejar de forma distinta 
// o dejarla en un archivo separado. Para no complicarnos, mantengamos la estructura:

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground animate-pulse">Cargando artículos...</p>
                </div>
            </div>
        }>
            <ArticulosPage />
        </Suspense>
    );
}