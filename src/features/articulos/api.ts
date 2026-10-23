import { Article, CreateArticleInput, UpdateArticleInput } from './types';
import { supabase } from '@/shared/lib/supabase';

// Token de la sesión del admin (Supabase). Las rutas de escritura lo exigen.
export async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const API_BASE = '/api/articles';

export const articlesApi = {
  async getAll(admin: boolean = false): Promise<Article[]> {
    const url = admin ? `${API_BASE}?admin=true` : API_BASE;
    const res = await fetch(url, { headers: admin ? await authHeaders() : {} });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch articles');
    }
    return res.json();
  },

  async getById(id: string): Promise<Article> {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch article');
    return res.json();
  },

  async getBySlug(slug: string): Promise<Article> {
    const res = await fetch(`${API_BASE}/by-slug/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch article by slug');
    return res.json();
  },

  async create(data: CreateArticleInput): Promise<Article> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al crear el artículo');
    }
    return res.json();
  },

  async update(id: string, data: UpdateArticleInput): Promise<Article> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar el artículo');
    }
    return res.json();
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: await authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete article');
  },
};
