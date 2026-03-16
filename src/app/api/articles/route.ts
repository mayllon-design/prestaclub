import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM articles ORDER BY published_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      slug, title, excerpt, content, image_url, 
      category, author, seo_title, seo_description 
    } = body;

    const [result] = await pool.execute(
      `INSERT INTO articles (
        slug, title, excerpt, content, image_url, 
        category, author, seo_title, seo_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, excerpt, content, image_url, category, author, seo_title, seo_description]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
