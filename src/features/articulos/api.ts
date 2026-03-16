import { Article, CreateArticleInput, UpdateArticleInput } from './types';

const API_BASE = '/api/articles';

export const articlesApi = {
  async getAll(): Promise<Article[]> {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Failed to fetch articles');
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create article');
    return res.json();
  },

  async update(id: string, data: UpdateArticleInput): Promise<Article> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update article');
    return res.json();
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete article');
  },
};
