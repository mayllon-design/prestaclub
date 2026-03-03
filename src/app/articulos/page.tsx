import type { Metadata } from "next";
import ArticulosPage from "@/features/articulos/ArticulosPage";
import { Suspense } from "react"; // 1. Importamos Suspense

export const metadata: Metadata = {
    title: "Artículos y Blog Financiero - PrestaClub",
    description: "Aprende sobre préstamos con garantía hipotecaria, saneamiento predial y consejos financieros para tu negocio en nuestro blog especializado.",
};

export default function Page() {
    return (
        /* 2. Envolvemos el componente para evitar el error de useSearchParams */
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