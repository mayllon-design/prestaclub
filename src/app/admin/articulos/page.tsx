import { AdminHeader } from "@/features/articulos/admin/AdminHeader";
import { ArticleList } from "@/features/articulos/admin/ArticleList";

export const metadata = {
  title: "Gestor de Artículos - Admin",
};

export default function AdminArticlesPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Artículos</h2>
            <p className="text-muted-foreground">
              Gestiona el contenido del blog y optimiza el SEO de cada publicación.
            </p>
          </div>
          <ArticleList />
        </div>
      </main>
    </div>
  );
}
