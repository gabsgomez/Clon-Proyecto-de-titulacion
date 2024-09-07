const mysql = require('mysql');
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

