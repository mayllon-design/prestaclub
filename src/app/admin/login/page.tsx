import { Metadata } from "next";
import LoginPage from "@/features/admin/auth/LoginPage";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Administrador Prestaclub",
  description: "Acceso al panel de administración de artículos",
};

export default function Page() {
  return <LoginPage />;
}
