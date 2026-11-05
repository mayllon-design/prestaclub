import { AdminHeader } from "@/features/articulos/admin/AdminHeader";
import ReclamacionesAdmin from "@/features/reclamaciones/ReclamacionesAdmin";

export const metadata = {
  title: "Libro de Reclamaciones - Admin",
  robots: { index: false, follow: false },
};

export default function AdminReclamacionesPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <ReclamacionesAdmin />
      </main>
    </div>
  );
}
