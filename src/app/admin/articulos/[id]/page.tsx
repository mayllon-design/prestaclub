"use client";

import { useEffect, useState, use } from 'react';
import { AdminHeader } from "@/features/articulos/admin/AdminHeader";
import { ArticleForm } from "@/features/articulos/admin/ArticleForm";
import { Article } from "@/features/articulos/types";
import { articlesApi } from "@/features/articulos/api";
import { toast } from "sonner";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const data = await articlesApi.getById(id);
        setArticle(data);
      } catch (err) {
        toast.error('Error al cargar el artículo');
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!article) return <div>Artículo no encontrado</div>;

  return (
    <div className="min-h-screen bg-muted/20">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <ArticleForm initialData={article} />
      </main>
    </div>
  );
}
