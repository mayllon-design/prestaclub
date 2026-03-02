import type { Metadata } from "next";
import ContactoPage from "@/features/contacto/ContactoPage";

export const metadata: Metadata = {
    title: "Contacto - PrestaClub",
    description: "Ponte en contacto con nuestros asesores financieros. Estamos ubicados en San Isidro, Lima. Atención personalizada por WhatsApp, teléfono y correo.",
};

export default function Page() {
    return <ContactoPage />;
}
