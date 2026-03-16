"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article, CreateArticleInput } from '../types';
import { articlesApi } from '../api';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Card, CardContent } from '@/shared/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Save, Globe, Settings, Eye } from 'lucide-react';
import Link from 'next/link';
import { RichTextEditor } from './RichTextEditor';

interface ArticleFormProps {
  initialData?: Article;
}

export function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateArticleInput>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    image_url: initialData?.image_url || '',
    category: initialData?.category || '',
    author: initialData?.author || 'Equipo PrestaClub',
    seo_title: initialData?.seo_title || '',
    seo_description: initialData?.seo_description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-slug from title
    if (name === 'title' && !initialData) {
      const slug = value.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData) {
        await articlesApi.update(initialData.id, formData);
        toast.success('Artículo actualizado');
      } else {
        await articlesApi.create(formData);
        toast.success('Artículo creado');
      }
      router.push('/admin/articulos');
    } catch (err) {
      console.error('Error saving article:', err);
      toast.error('Error al guardar el artículo. Revisa si el slug ya existe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/admin/articulos">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
          </Link>
        </Button>
        <Button type="submit" disabled={loading}>
          <Save className="h-4 w-4 mr-2" /> 
          {loading ? 'Guardando...' : initialData ? 'Actualizar' : 'Publicar'}
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Contenido
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Detalles
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2 text-gold">
            <Eye className="h-4 w-4" /> SEO (Configuración Yoast)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título del Artículo</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="Ej: Ventajas de la garantía hipotecaria" 
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/articulos/</span>
                  <Input 
                    id="slug" 
                    name="slug" 
                    value={formData.slug} 
                    onChange={handleChange} 
                    placeholder="ej-mi-articulo" 
                    required 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Cuerpo del Artículo (Editor Enriquecido)</Label>
                <RichTextEditor 
                  value={formData.content} 
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))} 
                  placeholder="Escribe el contenido aquí e inserta imágenes si lo deseas..." 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="excerpt">Extracto / Resumen</Label>
                <Textarea 
                  id="excerpt" 
                  name="excerpt" 
                  value={formData.excerpt || ''} 
                  onChange={handleChange} 
                  placeholder="Breve resumen para la lista" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    value={formData.category || ''} 
                    onChange={handleChange} 
                    placeholder="Ej: Educación Financiera" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author">Autor</Label>
                  <Input 
                    id="author" 
                    name="author" 
                    value={formData.author || ''} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image_url">URL de Imagen Principal</Label>
                <Input 
                  id="image_url" 
                  name="image_url" 
                  value={formData.image_url || ''} 
                  onChange={handleChange} 
                  placeholder="https://images.unsplash.com/..." 
                />
                {formData.image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border h-32 w-64">
                    <img src={formData.image_url} alt="Vista previa" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card className="border-gold/30">
            <CardContent className="pt-6 space-y-6">
              <div className="p-4 bg-muted rounded-lg border border-gold/20">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4" /> Vista previa en Google
                </h3>
                <div className="bg-white p-3 rounded border shadow-sm max-w-md">
                  <div className="text-[#1a0dab] text-lg hover:underline cursor-pointer truncate">
                    {formData.seo_title || formData.title || 'Título de ejemplo'} - PrestaClub
                  </div>
                  <div className="text-[#006621] text-xs truncate">
                    https://prestaclub.com/articulos/{formData.slug || '...'}/
                  </div>
                  <div className="text-sm text-[#4d5156] line-clamp-2">
                    {formData.seo_description || formData.excerpt || 'Empieza a escribir para ver cómo se verá tu artículo en los resultados de búsqueda de Google...'}
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="seo_title" className="flex justify-between">
                  Título SEO 
                  <span className={`text-xs ${(formData.seo_title?.length || 0) > 60 || (formData.seo_title?.length || 0) < 10 ? 'text-destructive' : 'text-green-600'}`}>
                    {formData.seo_title?.length || 0} / 60
                  </span>
                </Label>
                <Input 
                  id="seo_title" 
                  name="seo_title" 
                  value={formData.seo_title || ''} 
                  onChange={handleChange} 
                  placeholder="Título optimizado para buscadores" 
                />
                <p className="text-xs text-muted-foreground">Lo ideal es que sea atractivo y contenga palabras clave.</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="seo_description" className="flex justify-between">
                  Meta Descripción
                  <span className={`text-xs ${(formData.seo_description?.length || 0) > 160 || (formData.seo_description?.length || 0) < 50 ? 'text-destructive' : 'text-green-600'}`}>
                    {formData.seo_description?.length || 0} / 160
                  </span>
                </Label>
                <Textarea 
                  id="seo_description" 
                  name="seo_description" 
                  value={formData.seo_description || ''} 
                  onChange={handleChange} 
                  placeholder="Resumen atractivo para invitar a hacer clic" 
                />
                <p className="text-xs text-muted-foreground">Utiliza verbos de acción y una propuesta de valor clara.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
