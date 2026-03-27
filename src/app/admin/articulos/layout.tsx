"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/shared/lib/supabase";

export default function AdminArticulosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // Redirigir al login si no hay sesión activa
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();

    // Escuchar cambios en la sesión por si el usuario cierra sesión o caduca
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push("/admin/login");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Mientras valida la sesión, puedes mostrar un loader o pantalla en blanco
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-10 h-10 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
