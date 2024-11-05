const { executeQuery } = require('../db/db.js');

exports.guardarPDF = async (req, res) => {
  const { nivel, nombre_archivo } = req.body;
  const pdfData = req.file;

  console.log(req.body);

  if (!nivel || !pdfData) {
    return res
      .status(400)
      .send("Por favor, proporciona el nivel y el archivo PDF");
  }
  console.log(pdfData);
  console.log(req.body);
  try {
    console.log("Guardando PDF en la base de datos...");
    const insertPDFQuery =
      "INSERT INTO formulario (pdf_data, nivel, nombre_archivo) VALUES (?, ?, ?)";

    executeQuery(
      insertPDFQuery,
      [pdfData.buffer, nivel, nombre_archivo],
      (err, result) => {
        if (err) {
          console.error("Error al guardar el PDF en la base de datos:", err);
          return res
            .status(500)
            .send("Error al guardar el PDF en la base de datos");
        }

        const formularioId = result.insertId;

        res.status(200).json({
          success: true,
          message: "PDF guardado correctamente",
          formularioId: formularioId,
        });
      }
    );
  } catch (error) {
    console.error("Error al guardar el PDF:", error);
    res.status(500).send("Error al guardar el PDF");
  }
};


exports.obtenerFormularios = async (req, res) => {
    const { userId } = req.params;
    console.log('Procesando solicitud para usuario:', userId);

    try {
        // Obtener tipo de usuario
        const usuarios = await executeQuery(
            'SELECT tipo FROM usuario WHERE ID_Usuario = ?',
            [userId]
        );

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const tipoUsuario = usuarios[0].tipo.toUpperCase();
        console.log('Tipo de usuario:', tipoUsuario);

        // Obtener formularios según el tipo de usuario
        let queryFormularios;
        let params;

        if (tipoUsuario === 'ADM') {
            queryFormularios = 'SELECT ID_Formulario, nombre_archivo, nivel FROM formulario';
            params = [];
        } else {
            queryFormularios = 'SELECT ID_Formulario, nombre_archivo, nivel FROM formulario WHERE nivel = ?';
            params = [tipoUsuario];
        }

        const formularios = await executeQuery(queryFormularios, params);
        console.log('Formularios encontrados:', formularios.length);

        return res.status(200).json({
            success: true,
            tipoUsuario,
            formularios
        });

    } catch (error) {
        console.error('Error en obtenerFormularios:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

exports.obtenerPDF = async (req, res) => {
    const { formularioId } = req.params;

    try {
        const resultados = await executeQuery(
            'SELECT pdf_data FROM formulario WHERE ID_Formulario = ?',
            [formularioId]
        );

        if (!resultados || resultados.length === 0) {
            return res.status(404).send('PDF no encontrado');
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
        res.send(resultados[0].pdf_data);

    } catch (error) {
        console.error('Error al obtener PDF:', error);
        res.status(500).send('Error al obtener el PDF');
    }
};