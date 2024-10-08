// conexcion a una base de datos mysql usando mysql2

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'farmacia'
});

export default pool;