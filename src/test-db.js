
require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('Testing connection with:');
  console.log('Host:', process.env.MYSQL_HOST);
  console.log('User:', process.env.MYSQL_USER);
  console.log('Database:', process.env.MYSQL_DATABASE);
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
    });
    
    console.log('Successfully connected to the database!');
    
    const [rows] = await connection.execute('SHOW TABLES');
    console.log('Tables in database:', rows);
    
    await connection.end();
  } catch (error) {
    console.error('Connection failed:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Errno:', error.errno);
  }
}

testConnection();
