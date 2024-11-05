const nodemailer = require('nodemailer');
const { generateVerificationCode } = require('../utils/codeGenerator');
const { executeQuery } = require('../db/db.js');

/*lo nuevo */

const path = require('path');

// Función para generar palabras aleatorias de 6 caracteres
exports.generateVerificationCode = () => {
  const alphabetEnglish = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetSpanish = 'abcdefghijklmnñopqrstuvwxyz';
  const alphabet = Math.random() < 0.5 ? alphabetEnglish : alphabetSpanish;
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet[randomIndex];
  }
  return code;
};

// Función para generar el ID del contrato
const generateContratoId = async () => {
  const ultimoId = await obtenerUltimoIdContrato();
  return ultimoId + 1;
};

// Función para obtener el último ID de contrato de la base de datos
const obtenerUltimoIdContrato = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT MAX(ID_Contrato) as maxId FROM contratos';
    executeQuery(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      const maxId = results[0].maxId || 0;
      console.log(maxId);
      resolve(maxId);
    });
  });
};

/*-------------------  VALIDACIONES ----------------------------------------------------------------*/

function validarCorreo(correo) {
  return /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(correo) && correo.length <= 100;
}


// Función de validación de nombre y apellidos
function validarNombre(nombre) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre) && nombre.length <= 50;
}

// Función de validación de CURP
function validarCURP(CURP) {

  

  // Validar que la CURP tenga 18 caracteres
  if (CURP.length !== 18) {
      return false;
  }

  // Definir expresiones regulares para cada parte
  const regexIniciales = /^[A-Z]{4}/;  // Primeras 4 letras mayúsculas
  const regexFecha = /^[0-9]{6}/;      // 6 dígitos para la fecha de nacimiento
  const regexSexo = /^[HM]/;           // 'H' o 'M' para el sexo
  const regexEntidad = /^[A-Z]{2}/;    // 2 letras para la entidad federativa
  const regexConsonantes = /^[A-Z]{3}/; // 3 consonantes internas
  const regexHomoclave = /^[0-9A-Z]/;  // 1 dígito o letra para la homoclave
  const regexDigitoVerificador = /^[0-9]{1}$/; //  dígito finale

  // Validar cada parte
  const iniciales = CURP.substring(0, 4);
  const fecha = CURP.substring(4, 10);
  const sexo = CURP.substring(10, 11);
  const entidad = CURP.substring(11, 13);
  const consonantes = CURP.substring(13, 16);
  const homoclave = CURP.substring(16, 17);
  const digitoVerificador = CURP.substring(17, 19);

  if (!regexIniciales.test(iniciales)) {
    return false;
  }

  if (!regexFecha.test(fecha)) {
      return false;
  }

  if (!regexSexo.test(sexo)) {
      return false;
  }

  if (!regexEntidad.test(entidad)) {
      return false;
  }

  if (!regexConsonantes.test(consonantes)) {
      return false;
  }

  if (!regexHomoclave.test(homoclave)) {
      return false;
  }

  if (!regexDigitoVerificador.test(digitoVerificador)) {
      return false;
  }

  // Si pasa todas las validaciones, entonces es una CURP válida
  return true;
}



// Función de validación de número de teléfono
function validarTelefono(telefono) {
  return /^\d{10}$/.test(telefono);
}

// Función de validación de contraseña
function validarPassword(password) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/.test(password);
}



// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, sexo, curp, telefono, correo, password, tipo } = req.body;
  if (!nombre || !apellidoPaterno || !apellidoMaterno || !sexo || !curp || !telefono || !correo || !password || !tipo) {
    return res.status(400).send('Por favor, llena todos los campos');
  }

  if (!validarCorreo(correo)) {
    return res.status(400).send('Correo inválido o demasiado largo (RQF3, RQNF19)');
    }
    if (!validarNombre(nombre)) {
        return res.status(400).send('Nombre inválido o demasiado largo (RQF5, RQNF6)');
    }
    if (!validarNombre(apellidoPaterno)) {
        return res.status(400).send('Apellido paterno inválido o demasiado largo (RQF5, RQNF7)');
    }
    if (!validarNombre(apellidoMaterno)) {
        return res.status(400).send('Apellido materno inválido o demasiado largo (RQF5, RQNF8)');
    }
    if (!validarCURP(curp)) {
        return res.status(400).send('CURP inválido o no cumple con las especificaciones: Los primeros 4 caracteres deben ser letras mayúsculas. Los siguientes 6 caracteres deben ser números representando la fecha de nacimiento (AA/MM/DD).  El séptimo carácter debe ser H o M para indicar el sexo.  Los siguientes 2 caracteres deben ser letras que representan la entidad federativa.  Los siguientes 3 caracteres deben ser consonantes internas de los apellidos y nombre.  El penúltimo carácter debe ser un dígito o letra que representa la homoclave.  El último caracter debe ser número.');
    }
    if (!validarTelefono(telefono)) {
        return res.status(400).send('Número de teléfono inválido (RQF5, RQNF18)');
    }
    if (!validarPassword(password)) {
        return res.status(400).send('Contraseña inválida (RQF5, RQNF20)');
    }
    if (!['M', 'F', 'O'].includes(sexo)) {
        return res.status(400).send('Selección de sexo inválida (RQF6, RQNF21)');
    }

    

  try {

    
    

    const contratoId = await generateContratoId();
    const contratoQuery = 'INSERT INTO contratos (ID_Contrato) VALUES (?)';
    await executeQuery(contratoQuery, [contratoId]);

    const usuarioGenerado = curp.substring(0, 10);
    const userQuery = 'INSERT INTO usuario (ID_Usuario, Correo, Contrasena, Tipo) VALUES (?, ?, ?, ?)';
    await executeQuery(userQuery, [usuarioGenerado, correo, password, tipo]);

    const studentQuery = 'INSERT INTO alumnos (Nombres, ApellidoPaterno, ApellidoMaterno, CURP, Sexo, Telefono, Usuario_Generado, Contrato) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    await executeQuery(studentQuery, [nombre, apellidoPaterno, apellidoMaterno, curp, sexo, telefono, usuarioGenerado, contratoId]);

    const verificationCode = generateVerificationCode();
    const insertCodeQuery = 'INSERT INTO codigo_de_verificacion (Codigo) VALUES (?)';
    const result = await executeQuery(insertCodeQuery, [verificationCode]);
    const codigoId = result.insertId;

    const updateUserQuery = 'UPDATE usuario SET Codigo_verificacion = ? WHERE ID_Usuario = ?';
    await executeQuery(updateUserQuery, [codigoId, usuarioGenerado]);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'a20300685@ceti.mx',
        pass: 'fcxhatvwmyijejus'
      }
    });

    const mailOptions = {
      from: 'a20300685@ceti.mx',
      to: correo,
      subject: 'Código de verificación',
      text: `Tu código de verificación es: ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send('Usuario registrado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
};

// Función para iniciar sesión

exports.login = async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) {
    return res.status(400).send('Por favor, proporciona correo y contraseña');
  }

  try {
    const userQuery = 'SELECT * FROM usuario WHERE Correo = ? AND Contrasena = ?';
    executeQuery(userQuery, [correo, password], (err, results) => {
      if (err) {
        console.error('Error en la consulta de la base de datos:', err);
        return res.status(500).send('Error en la consulta de la base de datos');
      }

      if (results.length === 0) {
        return res.status(401).send('Correo o contraseña incorrectos');
      }

      const userId = results[0].ID_Usuario;
      
      
      const verificationCode = generateVerificationCode();  // Generar nuevo código

      const insertCodeQuery = 'INSERT INTO codigo_de_verificacion (Codigo) VALUES (?)';
      executeQuery(insertCodeQuery, [verificationCode], async (err, result) => {
        if (err) {
          console.error('Error al insertar el código de verificación:', err);
          return res.status(500).send('Error al guardar el código de verificación');
        }

        const codigoId = result.insertId;

        const updateUserQuery = 'UPDATE usuario SET Codigo_verificacion = ? WHERE ID_Usuario = ?';
        executeQuery(updateUserQuery, [codigoId, userId], async (err) => {
          if (err) {
            console.error('Error al actualizar el código de verificación:', err);
            return res.status(500).send('Error al actualizar el código de verificación');
          }

          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'a20300685@ceti.mx',
              pass: 'fcxhatvwmyijejus'
            }
          });

          const mailOptions = {
            from: 'a20300685@ceti.mx',
            to: correo,
            subject: 'Código de verificación',
            text: ` Tu código de verificación es: ${verificationCode}`
          };

          await transporter.sendMail(mailOptions);
          res.status(200).send('Correo y contraseña correctos, ingresa el código de verificación');
        });
      });
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error al iniciar sesión');
  }
};


///DEBO CAMBIAR EL METODO DE LOGIN
exports.loginadministradores = async (req, res) => {
  const { id_Administrador, usuario_Administrador } = req.body;
  // Validación de entrada
  if (!id_Administrador || !usuario_Administrador) {
    return res.status(400).json({ error: 'Por favor, proporciona ID y usuario' });
  }

  try {
    // Consulta para verificar el administrador
    const adminQuery = 'SELECT * FROM administradores WHERE ID_Administradores = ? AND Usuario_Admin = ?';
    
    executeQuery(adminQuery, [id_Administrador, usuario_Administrador], (err, results) => {
      console.log(results);
      if (err) {
        console.error('Error en la consulta de la base de datos:', err);
        return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'ID o usuario incorrectos' });
      }

      // Si se encuentra el administrador
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};




// Función para verificar el código de verificación durante el inicio de sesión
exports.verifyCode = async (req, res) => {
  const { correo, codigo } = req.body;
  if (!correo || !codigo) {
    return res.status(400).send('Por favor, llena todos los campos');
  }

  try {
    const userQuery = 'SELECT ID_Usuario, Codigo_verificacion FROM usuario WHERE Correo = ?';
    executeQuery(userQuery, [correo], (err, userResults) => {
      if (err) {
        console.error('Error en la consulta de la base de datos:', err);
        return res.status(500).send('Error en el servidor');
      }

      if (userResults.length === 0) {
        return res.status(401).send('Usuario no encontrado');
      }

      const userId = userResults[0].ID_Usuario;
      const codigoId = userResults[0].Codigo_verificacion;

      const codigoQuery = 'SELECT * FROM codigo_de_verificacion WHERE ID_codigo = ? AND Codigo = ?';
      executeQuery(codigoQuery, [codigoId, codigo], (err, codeResults) => {
        if (err) {
          console.error('Error en la consulta de la base de datos:', err);
          return res.status(500).send('Error en el servidor');
        }

        if (codeResults.length === 0) {
          return res.status(401).send('Código de verificación incorrecto');
        }

        res.status(200).send('Verificación exitosa');
      });
    });
  } catch (err) {
    console.error('Error al verificar el código:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Función para solicitar el restablecimiento de contraseña
exports.requestPasswordReset = async (req, res) => {
  const { correo } = req.body;
  if (!correo) {
    return res.status(400).send('Por favor, proporciona tu correo');
  }

  try {
    const userQuery = 'SELECT ID_Usuario FROM usuario WHERE Correo = ?';
    executeQuery(userQuery, [correo], async (err, results) => {
      if (err) {
        console.error('Error en la consulta de la base de datos:', err);
        return res.status(500).send('Error en el servidor');
      }

      if (results.length === 0) {
        return res.status(404).send('Correo no encontrado');
      }

      const userId = results[0].ID_Usuario;
      const verificationCode = generateVerificationCode();

      const insertCodeQuery = 'INSERT INTO codigo_de_verificacion (Codigo) VALUES (?)';
      const result = await executeQuery(insertCodeQuery, [verificationCode]);
      const codigoId = result.insertId;

      const updateUserQuery = 'UPDATE usuario SET Codigo_verificacion = ? WHERE ID_Usuario = ?';
      await executeQuery(updateUserQuery, [codigoId, userId]);

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'a20300685@ceti.mx',
          pass: 'fcxhatvwmyijejus'
        }
      });

      const mailOptions = {
        from: 'a20300685@ceti.mx',
        to: correo,
        subject: 'Código de restablecimiento de contraseña',
        text: `Tu código de restablecimiento de contraseña es: ${verificationCode}`
      };

      await transporter.sendMail(mailOptions);

      res.status(200).send('Código de restablecimiento enviado al correo');
    });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Función para verificar el código de restablecimiento de contraseña
exports.verifyResetCode = async (req, res) => {
  const { correo, codigo } = req.body;
  if (!correo || !codigo) {
    return res.status(400).send('Por favor, proporciona tu correo y el código de verificación');
  }

  try {
    const userQuery = 'SELECT ID_Usuario, Codigo_verificacion FROM usuario WHERE Correo = ?';
    executeQuery(userQuery, [correo], (err, userResults) => {
      if (err) {
        console.error('Error en la consulta de la base de datos:', err);
        return res.status(500).send('Error en el servidor');
      }

      if (userResults.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }

      const userId = userResults[0].ID_Usuario;
      const codigoId = userResults[0].Codigo_verificacion;

      const codigoQuery = 'SELECT * FROM codigo_de_verificacion WHERE ID_codigo = ? AND Codigo = ?';
      executeQuery(codigoQuery, [codigoId, codigo], (err, codeResults) => {
        if (err) {
          console.error('Error en la consulta de la base de datos:', err);
          return res.status(500).send('Error en el servidor');
        }

        if (codeResults.length === 0) {
          return res.status(401).send('Código de verificación incorrecto');
        }

        res.status(200).send('Código de verificación correcto');
      });
    });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Función para restablecer la contraseña
exports.resetPassword = async (req, res) => {
  const { correo, codigo, nuevaContrasena } = req.body;
  if (!correo || !codigo || !nuevaContrasena) {
    return res.status(400).send('Por favor, proporciona tu correo, el código de verificación y la nueva contraseña');
  }

  try {
    const userQuery = 'SELECT ID_Usuario, Codigo_verificacion FROM usuario WHERE Correo = ?';
    executeQuery(userQuery, [correo], (err, userResults) => {
      if (err) {
        console.error('Error en la consulta de la base de datos:', err);
        return res.status(500).send('Error en el servidor');
      }

      if (userResults.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }

      const userId = userResults[0].ID_Usuario;
      const codigoId = userResults[0].Codigo_verificacion;

      const codigoQuery = 'SELECT * FROM codigo_de_verificacion WHERE ID_codigo = ? AND Codigo = ?';
      executeQuery(codigoQuery, [codigoId, codigo], async (err, codeResults) => {
        if (err) {
          console.error('Error en la consulta de la base de datos:', err);
          return res.status(500).send('Error en el servidor');
        }

        if (codeResults.length === 0) {
          return res.status(401).send('Código de verificación incorrecto');
        }

        const updatePasswordQuery = 'UPDATE usuario SET Contrasena = ? WHERE ID_Usuario = ?';
        await executeQuery(updatePasswordQuery, [nuevaContrasena, userId]);

        res.status(200).send('Contraseña restablecida exitosamente');
      });
    });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error en el servidor');
  }
};



//////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const multer = require('multer');
const pool = require('../db/db'); // Ajusta la ruta según sea necesario

const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.memoryStorage(); // Usaremos memoryStorage para manejar los datos como Buffer
const upload = multer({ storage: storage });

exports.uploadFiles = (req, res) => {
  upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'photo', maxCount: 1 }])(req, res, async function (err) {
      if (err) {
          console.error('Error en Multer:', err);
          return res.status(400).send('Error al cargar los archivos');
      }

      const { pdf, photo } = req.files;
      console.log('Archivos recibidos:', req.files);
      console.log('Datos del formulario:', req.body);

      if (!pdf || !photo) {
          return res.status(400).send('Por favor, sube el documento y la foto');
      }

      try {
          const pdfBuffer = pdf[0].buffer;
          const photoBuffer = photo[0].buffer;


          const maxId = await obtenerUltimoIdContrato();

          const query = 'UPDATE contratos SET Documentos = ?, Foto_Rostro = ? WHERE ID_Contrato = ?';
          executeQuery(query, [pdfBuffer, photoBuffer,maxId], (err, results) => {
              if (err) {
                  console.error('Error al guardar en la base de datos:', err);
                  return res.status(500).send('Error al guardar en la base de datos');
              }

              res.status(200).send('Archivos subidos y guardados correctamente');
          });
      } catch (error) {
          console.error('Error al procesar la carga de archivos:', error);
          res.status(500).send('Error al procesar la carga de archivos');
      }
  });
};




exports.getLatestUserType = async (req, res) => {
  try {
    
    const query = 'SELECT Tipo FROM usuario ORDER BY fecha_creacion DESC LIMIT 1';
    
    // Ejecutar la consulta
    executeQuery(query, (err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta:', err);
        return res.status(500).send('Error ejecutando la consulta');
      }

      // Si el resultado existe, devolvemos el tipo
      if (results.length > 0) {
        res.json({ tipo: results[0].Tipo });
        
      } else {
        res.status(404).send('No se encontró ningún usuario');
      }
    });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error en el servidor');
  }
};

///////////////////////////////////////////////////////////////////
/*
// Obtener todos los precios
exports.getPrecios = async (req, res) => {
  try {
    const precios = await executeQuery('SELECT * FROM Precios');
    res.json(precios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los precios' });
  }
};


// Actualizar un precio por ID
exports.updatePrecio = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  try {
    const result = await executeQuery('UPDATE Precios SET price = ? WHERE id = ?', [price, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'El precio no fue encontrado' });
    }

    res.json({ message: 'Precio actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el precio' });
  }
};*/


exports.getPrecios = async (req, res) => {
  try {
    const query = 'SELECT * FROM precios'; // Asegúrate de que esta tabla exista
    executeQuery(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta de la base de datos:', err);
        return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error al obtener precios:', error);
    res.status(500).json({ error: 'Error al obtener precios' });
  }
};

// Actualizar un precio
exports.updatePrecio = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body; // Solo tomamos el nuevo precio

  try {
    // Actualizamos solo el campo de precio
    const result = await executeQuery('UPDATE precios SET price = ? WHERE id = ?', [price, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Precio no encontrado' });
    }
    res.status(200).json({ message: 'Precio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el precio:', error);
    res.status(500).json({ error: 'Error al actualizar el precio' });
  }
};

/////////////////////////////////////////////////

// Obtener usuarios por tipo
exports.getUsuariosPorTipo = async (req, res) => {
  const { tipo } = req.query; // Tipo de usuario (Av, P, F, adm)

  try {
    // Consulta a la base de datos para obtener los usuarios junto con nombres y apellidos correctos
    const result = await executeQuery(`
      SELECT u.ID_Usuario, u.Correo, u.fecha_creacion, a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno
      FROM usuario u
      JOIN alumnos a ON u.ID_Usuario = a.Usuario_Generado
      WHERE u.Tipo = ?
    `, [tipo]);

    // Verifica si se encontraron usuarios
    if (result.length === 0) {
      return res.status(404).json({ error: 'No se encontraron usuarios para este tipo' });
    }

    // Retorna los usuarios obtenidos
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

exports.searchUsers = async (req, res) => {
  const { searchTerm } = req.query;
  if (!searchTerm) {
      return res.status(400).json({ message: 'Falta el parámetro searchTerm' });
  }
  try {
      const usuarios = await Usuario.find({ 
          $or: [
              { nombre: { $regex: searchTerm, $options: 'i' } },
              { apellido: { $regex: searchTerm, $options: 'i' } }
          ]
      });
      res.status(200).json(usuarios);
  } catch (error) {
      res.status(500).json({ message: 'Error al buscar usuarios' });
  }
};


/// FINANZAS CONSULTA ///
// Consulta para obtener todos los datos de finanzas
/* ESTE SI FUNCIONA PERO LO COMENTE PARA PROBAR OTRO METODO
exports.getFinanzas = async (req, res) => {
  try {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno 
      FROM caja c 
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
    `;

    executeQuery(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta de finanzas:', err);
        return res.status(500).json({ error: 'Error en la consulta de finanzas' });
      }

      // Devolver los resultados como JSON
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error al obtener datos de finanzas:', error);
    res.status(500).json({ error: 'Error al obtener datos de finanzas' });
  }
};
*/

// Reporte Completo (ya existe)
exports.getFinanzas = async (req, res) => {
  try {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno 
      FROM caja c 
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
    `;
    executeQuery(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta de finanzas:', err);
        return res.status(500).json({ error: 'Error en la consulta de finanzas' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error al obtener datos de finanzas:', error);
    res.status(500).json({ error: 'Error al obtener datos de finanzas' });
  }
};

// Reporte Semanal
exports.getFinanzasSemanal = async (req, res) => {
  try {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno 
      FROM caja c 
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
      WHERE c.Fecha_De_Pago BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
    `;
    executeQuery(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta de finanzas semanal:', err);
        return res.status(500).json({ error: 'Error en la consulta de finanzas semanal' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error al obtener datos de finanzas semanal:', error);
    res.status(500).json({ error: 'Error al obtener datos de finanzas semanal' });
  }
};

// Reporte Mensual
exports.getFinanzasMensual = async (req, res) => {
  try {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno 
      FROM caja c 
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
      WHERE c.Fecha_De_Pago BETWEEN CURDATE() - INTERVAL 1 MONTH AND CURDATE()
    `;
    executeQuery(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta de finanzas mensual:', err);
        return res.status(500).json({ error: 'Error en la consulta de finanzas mensual' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error al obtener datos de finanzas mensual:', error);
    res.status(500).json({ error: 'Error al obtener datos de finanzas mensual' });
  }
};

// Reporte Semestral
exports.getFinanzasSemestral = async (req, res) => {
  try {
    const query = `
      SELECT c.ID_Pago, c.Metodo_Pago, c.Monto, c.Fecha_De_Pago, c.Estado_Pago,
             a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno 
      FROM caja c 
      JOIN alumnos a ON c.Alumno = a.ID_Alumno
      WHERE c.Fecha_De_Pago BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE()
    `;
    executeQuery(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta de finanzas semestral:', err);
        return res.status(500).json({ error: 'Error en la consulta de finanzas semestral' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error al obtener datos de finanzas semestral:', error);
    res.status(500).json({ error: 'Error al obtener datos de finanzas semestral' });
  }
};


//////////////////////

// Obtener usuarios por estatus
exports.getUsuariosPorEstatus = async (req, res) => {
  const { estatus } = req.params; // Primer Ingreso, Habilitado, Deshabilitado

  try {
    // Consulta a la base de datos para obtener los usuarios con el estatus correspondiente
    const result = await executeQuery(
      `SELECT u.ID_Usuario, u.Correo, u.Tipo, u.fecha_creacion, a.Nombres, a.ApellidoPaterno, a.ApellidoMaterno
      FROM usuario u
      JOIN alumnos a ON u.ID_Usuario = a.Usuario_Generado
      WHERE u.Estatus = ?`, [estatus]);

    // Verifica si se encontraron usuarios
    if (result.length === 0) {
      return res.status(404).json({ error: 'No se encontraron usuarios para este estatus' });
    }

    // Retorna los usuarios obtenidos
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener los usuarios por estatus:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};


// Habilitar usuario
exports.habilitarUsuario = async (req, res) => {
  const { id } = req.params; // ID del usuario a habilitar

  try {
    // Actualiza el estatus del usuario a 'Habilitado'
    await executeQuery("UPDATE Usuario SET Estatus = 'Habilitado' WHERE ID_Usuario = ?", [id]);

    res.status(200).json({ message: 'Usuario habilitado correctamente' });
  } catch (error) {
    console.error('Error al habilitar usuario:', error);
    res.status(500).json({ error: 'Error al habilitar usuario' });
  }
};

// Deshabilitar usuario
exports.deshabilitarUsuario = async (req, res) => {
  const { id } = req.params; // ID del usuario a deshabilitar

  try {
    // Actualiza el estatus del usuario a 'Deshabilitado'
    await executeQuery("UPDATE Usuario SET Estatus = 'Deshabilitado' WHERE ID_Usuario = ?", [id]);

    res.status(200).json({ message: 'Usuario deshabilitado correctamente' });
  } catch (error) {
    console.error('Error al deshabilitar usuario:', error);
    res.status(500).json({ error: 'Error al deshabilitar usuario' });
  }
};


exports.obtenerGeneraciones = async (req, res) => {
  try {
    const result = await executeQuery('SELECT DISTINCT Nombre_Gen FROM manejados ORDER BY ID_Generacion');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener generaciones:', error);
    res.status(500).json({ error: 'Error al obtener generaciones' });
  }
};


exports.crearGeneracion = async (req, res) => {
  const { Nombre_Gen, Administrador, alumnos } = req.body;

  // Validar que el número de alumnos esté entre 8 y 32
  if (alumnos.length < 8 || alumnos.length > 32) {
    return res.status(400).json({ message: 'La generación debe tener entre 8 y 32 alumnos.' });
  }

  // Construye los valores a insertar
  const valores = alumnos
    .map(idAlumno => `('${Nombre_Gen}', ${Administrador}, ${idAlumno})`)
    .join(', ');

  const sql = `
    INSERT INTO manejados (Nombre_Gen, Administrador, ID_Alumno)
    VALUES ${valores};
  `;

  try {
    await executeQuery(sql);
    res.status(200).json({ message: 'Generación creada exitosamente' });
  } catch (error) {
    console.error("Error al crear generación:", error);
    res.status(500).json({ message: 'Error al crear la generación' });
  }
};


// Función para obtener el nombre de la última generación en orden alfabético
exports.obtenerUltimaGeneracion = async () => {
  try {
    const result = await executeQuery('SELECT Nombre_Gen FROM manejados ORDER BY ID_Generacion DESC LIMIT 1');
    return result[0]?.Nombre_Gen || null;  // Devuelve el nombre de la última generación o null si no existe
  } catch (error) {
    console.error('Error al obtener la última generación:', error);
    throw error;
  }
};

// Función para validar la nueva generación en orden alfabético
exports.validarNuevaGeneracion = async () => {
  try {
    const ultimaGeneracion = await obtenerUltimaGeneracion();
    
    if (!ultimaGeneracion) return 'A';  // Si no hay generación previa, empieza con "A"
    
    const siguienteGeneracion = String.fromCharCode(ultimaGeneracion.charCodeAt(0) + 1);
    
    // Si llegamos a "Z", reiniciamos en "A"
    if (siguienteGeneracion > 'Z') {
      return 'A';
    } else {
      return siguienteGeneracion;
    }
  } catch (error) {
    console.error('Error en la validación de la nueva generación:', error);
    throw error;
  }
};


exports.obtenerAlumnosPrimerIngresoSinGeneracion = async (req, res) => {
  try {
    const result = await executeQuery(`
      SELECT 
        alumnos.ID_Alumno, 
        alumnos.Nombres, 
        alumnos.ApellidoPaterno,
        usuario.ID_Usuario, 
        usuario.Tipo, 
        usuario.estatus, 
        alumnos.ID_Generacion 
      FROM 
        alumnos 
      JOIN 
        usuario ON alumnos.Usuario_Generado = usuario.ID_Usuario 
      WHERE 
        usuario.estatus = 'Primer Ingreso' 
        AND alumnos.ID_Generacion IS NULL
    `);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener alumnos de primer ingreso sin generación:', error);
    res.status(500).json({ error: 'Error al obtener alumnos de primer ingreso sin generación' });
  }
};
