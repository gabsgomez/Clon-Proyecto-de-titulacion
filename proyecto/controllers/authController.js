const db = require('../db/db.js');
const nodemailer = require('nodemailer');
const { generateVerificationCode } = require('../utils/codeGenerator');

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

exports.getUserType = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).send('ID de usuario requerido');
    }

    const query = 'SELECT Tipo FROM usuario WHERE ID_Usuario = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).send('Error al obtener el tipo de usuario');
      }

      if (results.length > 0) {
        res.json({ tipo: results[0].Tipo });
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    });
  } catch (err) {
    console.error('Error del servidor:', err);
    res.status(500).send('Error interno del servidor');
  }
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
    db.query(query, (err, results) => {
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
    await db.query(contratoQuery, [contratoId]);

    const usuarioGenerado = curp.substring(0, 10);
    const userQuery = 'INSERT INTO usuario (ID_Usuario, Correo, Contrasena, Tipo) VALUES (?, ?, ?, ?)';
    await db.query(userQuery, [usuarioGenerado, correo, password, tipo]);

    const studentQuery = 'INSERT INTO alumnos (Nombres, ApellidoPaterno, ApellidoMaterno, CURP, Sexo, Telefono, Usuario_Generado, Contrato) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    await db.query(studentQuery, [nombre, apellidoPaterno, apellidoMaterno, curp, sexo, telefono, usuarioGenerado, contratoId]);

    const verificationCode = generateVerificationCode();
    const insertCodeQuery = 'INSERT INTO codigo_de_verificacion (Codigo) VALUES (?)';
    const result = await db.query(insertCodeQuery, [verificationCode]);
    const codigoId = result.insertId;

    const updateUserQuery = 'UPDATE usuario SET Codigo_verificacion = ? WHERE ID_Usuario = ?';
    await db.query(updateUserQuery, [codigoId, usuarioGenerado]);

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
  console.log(req.body);
  if (!correo || !password) {
    return res.status(400).send('Por favor, proporciona correo y contraseña');
  }

  try {
    const userQuery = 'SELECT * FROM usuario WHERE Correo = ? AND Contrasena = ?';
    db.query(userQuery, [correo, password], (err, results) => {
      if (err) {
        console.error('Error en la consulta de la base de datos:', err);
        return res.status(500).send('Error en la consulta de la base de datos');
      }

      if (results.length === 0) {
        return res.status(401).send('Correo o contraseña incorrectos');
      }

      const userId = results[0].ID_Usuario;
      
      
      const verificationCode = generateVerificationCode();  // Generar nuevo código
      console.log(verificationCode);
      const insertCodeQuery = 'INSERT INTO codigo_de_verificacion (Codigo) VALUES (?)';
      db.query(insertCodeQuery, [verificationCode], async (err, result) => {
        if (err) {
          console.error('Error al insertar el código de verificación:', err);
          return res.status(500).send('Error al guardar el código de verificación');
        }

        const codigoId = result.insertId;

        const updateUserQuery = 'UPDATE usuario SET Codigo_verificacion = ? WHERE ID_Usuario = ?';
        db.query(updateUserQuery, [codigoId, userId], async (err) => {
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
            text: `Tu código de verificación es: ${verificationCode}`
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






// Función para verificar el código de verificación durante el inicio de sesión
exports.verifyCode = async (req, res) => {
  const { correo, codigo } = req.body;
  if (!correo || !codigo) {
    return res.status(400).send('Por favor, llena todos los campos');
  }

  try {
    const userQuery = 'SELECT ID_Usuario, Codigo_verificacion FROM usuario WHERE Correo = ?';
    db.query(userQuery, [correo], (err, userResults) => {
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
      db.query(codigoQuery, [codigoId, codigo], (err, codeResults) => {
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
    db.query(userQuery, [correo], async (err, results) => {
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
      const result = await db.query(insertCodeQuery, [verificationCode]);
      const codigoId = result.insertId;

      const updateUserQuery = 'UPDATE usuario SET Codigo_verificacion = ? WHERE ID_Usuario = ?';
      await db.query(updateUserQuery, [codigoId, userId]);

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
    db.query(userQuery, [correo], (err, userResults) => {
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
      db.query(codigoQuery, [codigoId, codigo], (err, codeResults) => {
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
    db.query(userQuery, [correo], (err, userResults) => {
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
      db.query(codigoQuery, [codigoId, codigo], async (err, codeResults) => {
        if (err) {
          console.error('Error en la consulta de la base de datos:', err);
          return res.status(500).send('Error en el servidor');
        }

        if (codeResults.length === 0) {
          return res.status(401).send('Código de verificación incorrecto');
        }

        const updatePasswordQuery = 'UPDATE usuario SET Contrasena = ? WHERE ID_Usuario = ?';
        await db.query(updatePasswordQuery, [nuevaContrasena, userId]);

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
          pool.query(query, [pdfBuffer, photoBuffer,maxId], (err, results) => {
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
    const query = 'SELECT Tipo FROM usuario ORDER BY ID_Usuario DESC LIMIT 1';
    
    // Ejecutar la consulta
    db.query(query, (err, results) => {
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




