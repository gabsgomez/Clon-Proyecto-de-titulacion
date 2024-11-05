const { getFinanzasSemestral, getFinanzasMensual } = require('../../controllers/authController');
const pool = require('../../db/db'); // Ajusta la ruta a tu conexión de base de datos

// Obtener todos los precios
const getPrecios = async () => {
  const query = 'SELECT * FROM precios';
  const [results] = await pool.query(query);
  return results;
};

// Actualizar un precio
const updatePrecio = async (id, price) => {
  const query = 'UPDATE precios SET price = ? WHERE id = ?';
  const [result] = await pool.query(query, [price, id]);
  if (result.affectedRows === 0) throw new Error('Precio no encontrado');
  return { message: 'Precio actualizado correctamente' };
};

// Obtener usuarios por tipo
const getUsuariosPorTipo = async (tipo) => {
    if (!tipo) throw new Error('Tipo no puede estar vacío, null o undefined');
    
    const query = `
      SELECT * FROM Usuarios
      WHERE tipo = ?
    `;
    const [results] = await pool.query(query, [tipo]);
    return results;
  };
  
  
// Obtener todos los datos de finanzas
const getFinanzas = async () => {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno
      FROM caja c
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
    `;
    const [results] = await pool.query(query);
    return results;
  };
  
  // Reporte de finanzas semanal
  const getFinanzasSemanal = async () => {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno
      FROM caja c
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
      WHERE c.Fecha_De_Pago BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
    `;
    const [results] = await pool.query(query);
    return results;
  };
  
  // Reporte de finanzas mensual
  const getterFinanzasMensual = async () => {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno
      FROM caja c
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
      WHERE c.Fecha_De_Pago BETWEEN CURDATE() - INTERVAL 1 MONTH AND CURDATE()
    `;
    const [results] = await pool.query(query);
    return results;
  };
  
  // Reporte de finanzas semestral
  const gettFinanzasSemestral = async () => {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno
      FROM caja c
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
      WHERE c.Fecha_De_Pago BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE()
    `;
    const [results] = await pool.query(query);
    return results;
  };

  // Obtener usuarios por estatus
const getUsuariosPorEstatus = async (estatus) => {
    try {
      const query = `
        SELECT u.ID_Usuario, u.Correo, u.Tipo, u.fecha_creacion, 
               a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno
        FROM usuario u
        JOIN alumnos a ON u.ID_Usuario = a.Usuario_Generado
        WHERE u.Estatus = ?
      `;
      const [results] = await pool.query(query, [estatus]);
  
      // Verifica si se encontraron usuarios
      if (results.length === 0) {
        return { error: 'No se encontraron usuarios para este estatus', status: 404 };
      }
  
      return { data: results, status: 200 };
    } catch (error) {
      console.error('Error al obtener los usuarios por estatus:', error);
      return { error: 'Error al obtener los usuarios', status: 500 };
    }
  };
  
  // Habilitar usuario
  const habilitarUsuario = async (id) => {
    try {
      const query = "UPDATE Usuario SET Estatus = 'Habilitado' WHERE ID_Usuario = ?";
      const [result] = await pool.query(query, [id]);
  
      // Verifica si se actualizó algún usuario
      if (result.affectedRows === 0) {
        return { error: 'Usuario no encontrado', status: 404 };
      }
  
      return { message: 'Usuario habilitado correctamente', status: 200 };
    } catch (error) {
      console.error('Error al habilitar usuario:', error);
      return { error: 'Error al habilitar usuario', status: 500 };
    }
  };
  
  // Deshabilitar usuario
  const deshabilitarUsuario = async (id) => {
    try {
      const query = "UPDATE Usuario SET Estatus = 'Deshabilitado' WHERE ID_Usuario = ?";
      const [result] = await pool.query(query, [id]);
  
      // Verifica si se actualizó algún usuario
      if (result.affectedRows === 0) {
        return { error: 'Usuario no encontrado', status: 404 };
      }
  
      return { message: 'Usuario deshabilitado correctamente', status: 200 };
    } catch (error) {
      console.error('Error al deshabilitar usuario:', error);
      return { error: 'Error al deshabilitar usuario', status: 500 };
    }
  };
  
  // Obtener generaciones
const obtenerGeneraciones = async () => {
    try {
      const [result] = await pool.query('SELECT DISTINCT Nombre_Gen FROM manejados ORDER BY ID_Generacion');
      return { data: result, status: 200 };
    } catch (error) {
      console.error('Error al obtener generaciones:', error);
      return { error: 'Error al obtener generaciones', status: 500 };
    }
  };
  
  // Crear generación
  const crearGeneracion = async (Nombre_Gen, Administrador, alumnos) => {
    if (alumnos.length < 8 || alumnos.length > 32) {
      return { error: 'La generación debe tener entre 8 y 32 alumnos.', status: 400 };
    }
  
    const valores = alumnos
      .map(idAlumno => `('${Nombre_Gen}', ${Administrador}, ${idAlumno})`)
      .join(', ');
  
    const sql = `INSERT INTO manejados (Nombre_Gen, Administrador, ID_Alumno) VALUES ${valores};`;
  
    try {
      await pool.query(sql);
      return { message: 'Generación creada exitosamente', status: 200 };
    } catch (error) {
      console.error("Error al crear generación:", error);
      return { error: 'Error al crear la generación', status: 500 };
    }
  };
  
  // Obtener la última generación
  const obtenerUltimaGeneracion = async () => {
    try {
      const [result] = await pool.query('SELECT Nombre_Gen FROM manejados ORDER BY ID_Generacion DESC LIMIT 1');
      return result[0]?.Nombre_Gen || null;
    } catch (error) {
      console.error('Error al obtener la última generación:', error);
      throw error;
    }
  };
  
  // Validar nueva generación
  const validarNuevaGeneracion = async () => {
    try {
      const ultimaGeneracion = await obtenerUltimaGeneracion();
      if (!ultimaGeneracion) return 'A';
  
      const siguienteGeneracion = String.fromCharCode(ultimaGeneracion.charCodeAt(0) + 1);
      return siguienteGeneracion > 'Z' ? 'A' : siguienteGeneracion;
    } catch (error) {
      console.error('Error en la validación de la nueva generación:', error);
      throw error;
    }
  };

  // Exportar funciones
  module.exports = {
    getPrecios,
    updatePrecio,
    getUsuariosPorTipo,
    getFinanzas,
    getFinanzasSemanal,
    getterFinanzasMensual,
    gettFinanzasSemestral,
    getUsuariosPorEstatus,
    habilitarUsuario,
    deshabilitarUsuario,
    obtenerGeneraciones, 
    crearGeneracion, 
    obtenerUltimaGeneracion, 
    validarNuevaGeneracion  
    };

  