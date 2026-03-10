import type { Metadata } from "next";
import DevolucionesPage from "@/features/devoluciones-de-saldo/DevolucionesPage";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Gestión de devoluciones de saldo - PrestaClub",
    description: "Gestión de devoluciones de saldo",
};

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground animate-pulse">Cargando...</p>
            </div>
        }>
            <DevolucionesPage />
        </Suspense>
    );
}
