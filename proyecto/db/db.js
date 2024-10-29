const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "marathon_institudee",
  waitForConnections: true,
  queueLimit: 0
});

// Promisify para usar async/await
pool.getConnection = util.promisify(pool.getConnection);
pool.query = util.promisify(pool.query);

const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    
    console.log("✅ Conexión exitosa a la base de datos MySQL");
    console.log(`📊 Base de datos: ${pool.config.connectionConfig.database}`);
    console.log(`👤 Usuario: ${pool.config.connectionConfig.user}`);
    console.log(`🔌 Host: ${pool.config.connectionConfig.host}`);

    await connection.query("SELECT 1");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:");
    console.error(`💡 Mensaje: ${error.message}`);
    console.error(`🔍 Código: ${error.code}`);
    console.error("📝 Verifica que:");
    console.error("   - El servidor MySQL esté corriendo");
    console.error("   - Las credenciales sean correctas");
    console.error("   - La base de datos exista");
    return false;
  }
};

// Manejo de eventos del pool
pool.on("connection", () => {
  console.log("🔗 Nueva conexión establecida con la base de datos");
});

pool.on("error", (err) => {
  console.error("❌ Error en el pool de conexiones:", err.message);
});

// Iniciar verificación de conexión
checkDatabaseConnection();

module.exports = pool;
