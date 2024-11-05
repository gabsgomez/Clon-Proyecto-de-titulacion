const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "marathon_institudee",
  port: 3307,
});

const executeQuery = async (sql, params = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Error en consulta:', error);
    throw error;
  }
};

const checkDatabaseConnection = async () => {
  try {
    await pool.execute("SELECT 1");
    console.log("✅ Conexión exitosa a la base de datos MySQL");
    return true;
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error);
    return false;
  }
};

checkDatabaseConnection();

module.exports = { executeQuery };