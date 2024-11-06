/*const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'marathon_institudee' 
});

pool.query = util.promisify(pool.query); // Manejamos las promesas



module.exports = pool;

*/

//con mysql2

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'marathon_institudee'
});

// Verificar la conexión al iniciar
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión exitosa a la base de datos');
    connection.release(); // Libera la conexión después de probarla
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

module.exports = pool;

