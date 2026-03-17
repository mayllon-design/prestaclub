
import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET() {
  try {
    // 1. Check connection
    const [tables] = await pool.query('SHOW TABLES');
    
    // 2. If articles table exists, check its columns
    let columns = null;
    const tableExists = (tables as any[]).some(t => Object.values(t)[0] === 'articles');
    
    if (tableExists) {
      const [cols] = await pool.query('DESCRIBE articles');
      columns = cols;
    }

    return NextResponse.json({
      status: 'Connected',
      database: process.env.MYSQL_DATABASE,
      tables: tables,
      articlesTableInfo: columns ? { exists: true, columns } : { exists: false }
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'Error',
      message: error.message,
      code: error.code,
      stack: error.stack
    }, { status: 500 });
  }
}
