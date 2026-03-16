import { AdminHeader } from "@/features/articulos/admin/AdminHeader";
import { ArticleForm } from "@/features/articulos/admin/ArticleForm";

export const metadata = {
  title: "Nuevo Artículo - Admin",
};

export default function NewArticlePage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <ArticleForm />
      </main>
    </div>
  );
}
