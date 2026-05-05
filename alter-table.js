const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'u248942928_usu_blog',
    password: '^5uu!Ey7Q',
    database: 'u248942928_bd_blog',
    port: 3306
  });

  try {
    const [rows] = await connection.query("SHOW COLUMNS FROM articles LIKE 'section'");
    if (rows.length === 0) {
      await connection.query("ALTER TABLE articles ADD COLUMN section VARCHAR(255) NULL AFTER category");
      console.log('Columna "section" añadida a la tabla "articles".');
    } else {
      console.log('La columna "section" ya existe.');
    }
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await connection.end();
  }
}
main();
