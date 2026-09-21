import type { Metadata } from "next";
import ArticulosPage from "@/features/articulos/ArticulosPage";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Artículos y Blog - PrestaClub",
    description: "Guías y consejos sobre préstamos con garantía hipotecaria y vehicular, saneamiento predial y finanzas en Perú.",
    alternates: {
        canonical: "/articulos",
    },
};

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
