import type { Metadata } from "next";
import ContactoPage from "@/features/contacto/ContactoPage";
import { Suspense } from "react"; // 1. Importamos Suspense

export const metadata: Metadata = {
    title: "Contacto - PrestaClub",
    description: "Ponte en contacto con nuestros asesores financieros. Estamos ubicados en San Isidro, Lima. Atención personalizada por WhatsApp, teléfono y correo.",
};

export default function Page() {
    return (
        /* 2. Envolvemos el componente en Suspense */
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground animate-pulse">Cargando formulario...</p>
            </div>
        }>
            <ContactoPage />
        </Suspense>
    );
}