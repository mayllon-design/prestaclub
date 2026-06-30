import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';

    // Para el listado público NO traemos el `content` (HTML completo, muy pesado):
    // solo las columnas que la tarjeta necesita. El admin sí trae todo.
    const fields = isAdmin
      ? '*'
      : 'id, slug, title, excerpt, image_url, category, section, author, published_at';

    let query = `SELECT ${fields} FROM articles`;
    if (!isAdmin) {
      query += ' WHERE published_at <= NOW()';
    }
    query += ' ORDER BY published_at DESC';

    const [rows] = await pool.query(query);

    // Caché: el listado público se sirve desde caché (CDN + navegador),
    // así las visitas repetidas son instantáneas. El admin nunca se cachea.
    const headers = isAdmin
      ? { 'Cache-Control': 'no-store' }
      : { 'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' };

    return NextResponse.json(rows, { headers });
  } catch (error: any) {
    console.error('Database error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
    return NextResponse.json({ 
      error: 'Error de conexión con la base de datos',
      message: error.sqlMessage || error.message,
      code: error.code
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      slug, title, excerpt, content, image_url, 
      category, section, author, seo_title, seo_description, published_at 
    } = body;

    const [result] = await pool.execute(
      `INSERT INTO articles (
        slug, title, excerpt, content, image_url, 
        category, section, author, seo_title, seo_description, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, excerpt, content, image_url, category, section, author, seo_title, seo_description, published_at]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body });
  } catch (error: any) {
    console.error('Database error in POST /api/articles:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
    return NextResponse.json({ 
      error: 'Error de base de datos',
      message: error.sqlMessage || error.message,
      code: error.code
    }, { status: 500 });
  }
}
