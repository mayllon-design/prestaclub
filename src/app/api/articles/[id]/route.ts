import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const [rows]: any = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { 
      slug, title, excerpt, content, image_url, 
      category, author, seo_title, seo_description, published_at
    } = body;

    await pool.execute(
      `UPDATE articles SET 
        slug = ?, title = ?, excerpt = ?, content = ?, image_url = ?, 
        category = ?, author = ?, seo_title = ?, seo_description = ?, published_at = ?
      WHERE id = ?`,
      [slug, title, excerpt, content, image_url, category, author, seo_title, seo_description, published_at, id]
    );

    return NextResponse.json({ id, ...body });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await pool.execute('DELETE FROM articles WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
