import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM articles WHERE slug = ? AND published_at <= NOW()', 
      [slug]
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
