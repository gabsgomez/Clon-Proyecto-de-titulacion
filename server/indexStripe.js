/*

//             FUNCIONA CON WEBHOOK                             //

import express from "express";
import cors from "cors";
import Stripe from "stripe";

import mysql from "mysql2";

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'marathon_institudee' 
});

// Clave secreta de Stripe
const stripe = new Stripe(
  "sk_test_51PuzKyRx0ZyVg5Xvc7HdKlV1DtAWdyAR0qX2RKNpFIWbmDzt2KfqEv7m7mxqpuTHx7Gzo2tRZENq4tcgAY24e1B700hm2K8rrN"
);

const app = express();
app.use(cors());

// IMPORTANTE: No agregar express.json() globalmente, lo quitamos para evitar que afecte el webhook

// Ruta de pago normal (aquí SÍ usamos express.json() porque es una ruta normal)
app.post("/checkout", express.json(), async (req, res) => {
  try {
    console.log(req.body.lineItems); // Verifica lo que se recibe
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: "http://localhost:3000/AulaInteractiva",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando la sesión", error });
  }
});

// Webhook endpoint para recibir los eventos de Stripe
const endpointSecret = "whsec_F1vLpgRiZT2UmgfiUbduuvq8aOzoyRGL";

// Asegurar que el cuerpo se reciba en formato raw


app.post(
  "/webhooks",
  express.raw({ type: "vaUnAsterisco/*" }), // Aquí usamos raw para evitar procesamiento
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      // Verificar el evento con el cuerpo raw (Buffer)
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`); // Asegúrate de usar return
    }

    // Manejar los eventos específicos
    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session completed:", event.data.object);

        const session = event.data.object;

        const metodoPago = 'Stripe'; // Método de pago siempre será 'Stripe'
        const monto = session.amount_total / 100; // Stripe envía en centavos, convertir a pesos
        const fechaDePago = new Date(); // La fecha actual en el momento de la confirmación
        const estadoPago = 1; // 1 para indicar que está pagado
        const emailAlumno = session.customer_details.email; 

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
            return response.status(500).send("Error al buscar el alumno en la base de datos"); // Asegúrate de usar return
          } else if (results.length === 0) {
            console.error("Alumno no encontrado con el correo:", emailAlumno);
            return response.status(404).send("Alumno no encontrado");
          } else {
            const alumnoId = results[0].ID_Alumno;
            console.log("ID del alumno encontrado:", alumnoId); // Verificar que el ID del alumno sea correcto

            // Insertar el pago en la base de datos
            const sql = `
              INSERT INTO Caja (Metodo_Pago, Monto, Fecha_De_Pago, Estado_Pago, Alumno) 
              VALUES (?, ?, ?, ?, ?)
            `;

            connection.query(sql, [metodoPago, monto, fechaDePago, estadoPago, alumnoId], (error, results) => {
              if (error) {
                console.error("Error al insertar el pago en la base de datos:", error);
                return response.status(500).send("Error al registrar el pago en la base de datos"); // Asegúrate de usar return
              } else {
                console.log("Pago registrado exitosamente en la base de datos:", results);
                // No envíes otra respuesta aquí, solo lo manejamos con el log.
              }
            });
          }
        });

        break;
      
      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    // Responder a Stripe que el evento fue recibido correctamente
    response.status(200).send();
  }
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


*/




import express from "express";
import cors from "cors";
import Stripe from "stripe";
import mysql from "mysql2";
import nodemailer from "nodemailer";

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'marathon_institudee' 
});

// Clave secreta de Stripe
const stripe = new Stripe(
  "sk_test_51PuzKyRx0ZyVg5Xvc7HdKlV1DtAWdyAR0qX2RKNpFIWbmDzt2KfqEv7m7mxqpuTHx7Gzo2tRZENq4tcgAY24e1B700hm2K8rrN"
);

const app = express();
app.use(cors());

// Configuración de nodemailer para enviar correos
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes cambiarlo según el servicio de correo que uses (Gmail, Outlook, etc.)
  auth: {
      user: 'a20300685@ceti.mx',
      pass: 'fcxhatvwmyijejus'
  }
});

// IMPORTANTE: No agregar express.json() globalmente, lo quitamos para evitar que afecte el webhook

// Ruta de pago normal (aquí SÍ usamos express.json() porque es una ruta normal)
app.post("/checkout", express.json(), async (req, res) => {
  try {
    console.log(req.body.lineItems); // Verifica lo que se recibe
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: "http://localhost:3000/AulaInteractiva",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando la sesión", error });
  }
});

// Webhook endpoint para recibir los eventos de Stripe
const endpointSecret = "whsec_F1vLpgRiZT2UmgfiUbduuvq8aOzoyRGL";

// Asegurar que el cuerpo se reciba en formato raw
app.post(
  "/webhooks",
  express.raw({ type: "*/*" }), // Aquí usamos raw para evitar procesamiento
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      // Verificar el evento con el cuerpo raw (Buffer)
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`); // Asegúrate de usar return
    }

    // Manejar los eventos específicos
    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session completed:", event.data.object);

        const session = event.data.object;

        const metodoPago = 'Stripe'; // Método de pago siempre será 'Stripe'
        const monto = session.amount_total / 100; // Stripe envía en centavos, convertir a pesos
        const fechaDePago = new Date(); // La fecha actual en el momento de la confirmación
        const estadoPago = 1; // 1 para indicar que está pagado
        const emailAlumno = session.customer_details.email; 

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
            return response.status(500).send("Error al buscar el alumno en la base de datos"); // Asegúrate de usar return
          } else if (results.length === 0) {
            console.error("Alumno no encontrado con el correo:", emailAlumno);
            return response.status(404).send("Alumno no encontrado");
          } else {
            const alumnoId = results[0].ID_Alumno;
            console.log("ID del alumno encontrado:", alumnoId); // Verificar que el ID del alumno sea correcto

            // Insertar el pago en la base de datos
            const sql = `
              INSERT INTO Caja (Metodo_Pago, Monto, Fecha_De_Pago, Estado_Pago, Alumno) 
              VALUES (?, ?, ?, ?, ?)
            `;

            connection.query(sql, [metodoPago, monto, fechaDePago, estadoPago, alumnoId], (error, results) => {
              if (error) {
                console.error("Error al insertar el pago en la base de datos:", error);
                return response.status(500).send("Error al registrar el pago en la base de datos"); // Asegúrate de usar return
              } else {
                console.log("Pago registrado exitosamente en la base de datos:", results);

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
              }
            });
          }
        });

        break;
      
      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    // Responder a Stripe que el evento fue recibido correctamente
    response.status(200).send();
  }
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
