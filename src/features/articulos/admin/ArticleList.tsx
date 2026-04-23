"use client";

import { useEffect, useState } from 'react';
import { Article } from '../types';
import { articlesApi } from '../api';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import { Edit2, Trash2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const data = await articlesApi.getAll(true);
      setArticles(data);
    } catch (err) {
      console.error('Error loading articles:', err);
      toast.error('Error al cargar artículos');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar este artículo?')) return;

    try {
      await articlesApi.delete(id);
      setArticles(articles.filter(a => a.id !== id));
      toast.success('Artículo eliminado');
    } catch (error) {
      toast.error('Error al eliminar artículo');
    }
  }

  // Lógica de paginación
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Cargando artículos...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  {articles.length === 0 ? 'No hay artículos todavía.' : 'No hay artículos en esta página.'}
                </TableCell>
              </TableRow>
            ) : (
              currentArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">
                    <div>
                      {article.title}
                      <div className="text-xs text-muted-foreground font-normal">/{article.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {article.category || 'General'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {new Date(article.published_at).toLocaleDateString()} {new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {new Date(article.published_at) > new Date() ? (
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-1">
                          ● Programado
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider mt-1">
                          ● Publicado
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild title="Ver en la web">
                        <Link href={`/articulos/${article.slug}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Editar artículo">
                        <Link href={`/admin/articulos/${article.id}`}>
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)} title="Eliminar artículo">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Controles de Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 px-1">
          <div className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{startIndex + 1}</span> a <span className="font-medium">{Math.min(startIndex + articlesPerPage, articles.length)}</span> de <span className="font-medium">{articles.length}</span> artículos
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 p-0 ${currentPage === page ? 'pointer-events-none' : ''}`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3"
            >
              Siguiente <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
