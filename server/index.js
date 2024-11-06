

/*
//corre actualmente


import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago"; // SDK de Mercado Pago
import axios from "axios"; // Para hacer solicitudes HTTP
import mysql from "mysql2";
import nodemailer from "nodemailer";

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'marathon_institudee' 
});

// Configura las credenciales de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: "TEST-5671825137719752-090515-ccee7549724eb1f9776d0b0affa84d5b-672353286",
});

const app = express();
const port = 4000; // Asegúrate de que el puerto sea 4000 o el que necesites

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes cambiarlo según el servicio de correo que uses (Gmail, Outlook, etc.)
  auth: {
      user: 'a20300685@ceti.mx',
      pass: 'fcxhatvwmyijejus'
  }
});

app.get("/mercadopago", (req, res) => {
  res.send("soy el servidor :)");
});

// Ruta para crear una preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
        },
      ],
      back_urls: {
        success: "https://b260-2806-2f0-55e1-e409-389e-7ac6-6d66-4032.ngrok-free.app/AulaInteractiva",
        failure: "https://b260-2806-2f0-55e1-e409-389e-7ac6-6d66-4032.ngrok-free.app/Caja",
        pending: "https://b260-2806-2f0-55e1-e409-389e-7ac6-6d66-4032.ngrok-free.app/login",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error.response ? error.response.data : error.message);
    res.status(500).send("Error al crear la preferencia");
  }
});

// Nueva ruta para manejar el Webhook de Mercado Pago
app.post("/webhookMP", async (req, res) => {
  try {
    const paymentData = req.body; // Información que Mercado Pago envía en el webhook

    console.log("Datos del Webhook recibido:", paymentData);

    // Verificar si es una notificación de pago
    if (paymentData.action === 'payment.created' || paymentData.action === 'payment.updated') {
      const paymentId = paymentData.data.id;

      // Hacer una solicitud a la API de Mercado Pago para obtener más detalles sobre el pago
      const paymentInfo = await verificarEstadoDePago(paymentId);

      console.log('Detalles del pago:', paymentInfo);

      const metodoPago = 'MercadoPago'; // Método de pago será MercadoPago
      const monto = paymentInfo.transaction_amount; // El monto del pago
      const fechaDePago = new Date(); // La fecha actual en el momento de la confirmación
      const estadoPago = paymentInfo.status === 'approved' ? 1 : 0; // 1 para pagado, 0 para no pagado
      const emailAlumno = paymentInfo.payer.email; // Email del alumno desde los detalles del pagador

      console.log("Correo recibido desde la API:", emailAlumno); // Para verificar el correo electrónico recibido

      // Consulta SQL para buscar el ID del alumno basado en el correo
      const searchSql = `
        SELECT alumnos.ID_Alumno 
        FROM alumnos 
        JOIN usuario ON alumnos.Usuario_Generado = usuario.ID_Usuario 
        WHERE usuario.Correo = ?
      `;

      // Ejecutar la consulta para obtener el ID del alumno
      connection.query(searchSql, [emailAlumno], (error, results) => {
        if (error) {
          console.error("Error al buscar el alumno en la base de datos:", error);
          return res.status(500).send("Error al buscar el alumno en la base de datos"); // Asegúrate de usar return
        } else if (results.length === 0) {
          console.error("Alumno no encontrado con el correo:", emailAlumno);
          return res.status(404).send("Alumno no encontrado");
        } else {
          const alumnoId = results[0].ID_Alumno;
          console.log("ID del alumno encontrado:", alumnoId); // Verificar que el ID del alumno sea correcto

          // Insertar el pago en la base de datos
          const insertSql = `
            INSERT INTO Caja (Metodo_Pago, Monto, Fecha_De_Pago, Estado_Pago, Alumno) 
            VALUES (?, ?, ?, ?, ?)
          `;

          connection.query(insertSql, [metodoPago, monto, fechaDePago, estadoPago, alumnoId], (error, results) => {
            if (error) {
              console.error("Error al insertar el pago en la base de datos:", error);
              return res.status(500).send("Error al registrar el pago en la base de datos"); // Asegúrate de usar return
            } else {
              console.log("Pago registrado exitosamente en la base de datos:", results);

              // Enviar correo de notificación al usuario
              const mailOptions = {
                from: 'a20300685@ceti.mx', // Reemplaza con tu correo
                to: emailAlumno,
                subject: 'Confirmación de Pago - Servicio Acreditado',
                text: `Estimado usuario, su pago ha sido acreditado con éxito.
                \nDetalles del pago:
                \nServicio: ${metodoPago}
                \nMonto: ${monto} MXN
                \nFecha: ${fechaDePago.toLocaleString()}
                \n\nGracias por su confianza.`
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.error('Error al enviar el correo:', err);
                } else {
                  console.log('Correo enviado:', info.response);
                }
              });
            }
          });
        }
      });
    }

    // Responder a Mercado Pago que se ha recibido la notificación correctamente
    res.status(200).send('Webhook recibido correctamente');
  } catch (error) {
    console.error('Error al procesar el webhook de Mercado Pago:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Función para verificar el estado del pago a través de la API de Mercado Pago
const verificarEstadoDePago = async (paymentId) => {
  const token = "TEST-5671825137719752-090515-ccee7549724eb1f9776d0b0affa84d5b-672353286"; // Access Token
  const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; // Retornar la información detallada del pago
};

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor corre en el puerto ${port}`);
});
*/


import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import axios from "axios";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

// Conexión a la base de datos MySQL
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'marathon_institudee'
});

// Configura las credenciales de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: "TEST-5671825137719752-090515-ccee7549724eb1f9776d0b0affa84d5b-672353286",
});

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'a20300685@ceti.mx',
    pass: 'fcxhatvwmyijejus'
  }
});

app.get("/mercadopago", (req, res) => {
  res.send("soy el servidor :)");
});

// Ruta para crear una preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
        },
      ],
      back_urls: {
        success: "https://b260-2806-2f0-55e1-e409-389e-7ac6-6d66-4032.ngrok-free.app/AulaInteractiva",
        failure: "https://b260-2806-2f0-55e1-e409-389e-7ac6-6d66-4032.ngrok-free.app/Caja",
        pending: "https://b260-2806-2f0-55e1-e409-389e-7ac6-6d66-4032.ngrok-free.app/login",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({ id: result.id });
  } catch (error) {
    console.error("Error al crear la preferencia:", error.response ? error.response.data : error.message);
    res.status(500).send("Error al crear la preferencia");
  }
});

// Ruta para manejar el Webhook de Mercado Pago
app.post("/webhookMP", async (req, res) => {
  try {
    const paymentData = req.body;

    console.log("Datos del Webhook recibido:", paymentData);

    if (paymentData.action === 'payment.created' || paymentData.action === 'payment.updated') {
      const paymentId = paymentData.data.id;

      const paymentInfo = await verificarEstadoDePago(paymentId);

      console.log('Detalles del pago:', paymentInfo);

      const metodoPago = 'MercadoPago';
      const monto = paymentInfo.transaction_amount;
      const fechaDePago = new Date();
      const estadoPago = paymentInfo.status === 'approved' ? 1 : 0;
      const emailAlumno = paymentInfo.payer.email;

      console.log("Correo recibido desde la API:", emailAlumno);

      try {
        // Consulta para obtener el ID del alumno
        const [alumnoResults] = await connection.query(
          `SELECT alumnos.ID_Alumno 
           FROM alumnos 
           JOIN usuario ON alumnos.Usuario_Generado = usuario.ID_Usuario 
           WHERE usuario.Correo = ?`,
          [emailAlumno]
        );

        if (alumnoResults.length === 0) {
          console.error("Alumno no encontrado con el correo:", emailAlumno);
          return res.status(404).send("Alumno no encontrado");
        }

        const alumnoId = alumnoResults[0].ID_Alumno;
        console.log("ID del alumno encontrado:", alumnoId);

        // Insertar el pago en la base de datos
        await connection.query(
          `INSERT INTO Caja (Metodo_Pago, Monto, Fecha_De_Pago, Estado_Pago, Alumno) 
           VALUES (?, ?, ?, ?, ?)`,
          [metodoPago, monto, fechaDePago, estadoPago, alumnoId]
        );

        console.log("Pago registrado exitosamente en la base de datos");

        // Enviar correo de notificación al usuario
        const mailOptions = {
          from: 'a20300685@ceti.mx',
          to: emailAlumno,
          subject: 'Confirmación de Pago - Servicio Acreditado',
          text: `Estimado usuario, su pago ha sido acreditado con éxito.
          \nDetalles del pago:
          \nServicio: ${metodoPago}
          \nMonto: ${monto} MXN
          \nFecha: ${fechaDePago.toLocaleString()}
          \n\nGracias por su confianza.`
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error('Error al enviar el correo:', err);
          } else {
            console.log('Correo enviado:', info.response);
          }
        });
      } catch (error) {
        console.error("Error al procesar el pago o enviar correo:", error);
        return res.status(500).send("Error al procesar el pago o enviar correo");
      }
    }

    res.status(200).send('Webhook recibido correctamente');
  } catch (error) {
    console.error('Error al procesar el webhook de Mercado Pago:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Función para verificar el estado del pago a través de la API de Mercado Pago
const verificarEstadoDePago = async (paymentId) => {
  const token = "TEST-5671825137719752-090515-ccee7549724eb1f9776d0b0affa84d5b-672353286";
  const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor corre en el puerto ${port}`);
});
