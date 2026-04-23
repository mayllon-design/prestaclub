export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    image_url: string | null;
    category: string | null;
    author: string | null;
    published_at: string;
    seo_title: string | null;
    seo_description: string | null;
    created_at: string;
    updated_at: string;
}

export type CreateArticleInput = Omit<Article, 'id' | 'created_at' | 'updated_at'>;
export type UpdateArticleInput = Partial<CreateArticleInput>;
