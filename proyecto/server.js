


/*

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authController = require('./controllers/authController');
const pool = require('../proyecto/db/db'); 
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const server = require('http').createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Obtener el tipo de usuario más reciente
app.get('/api/latest-user-type', authController.getLatestUserType);

// Configuración de nodemailer para enviar correos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'a20300685@ceti.mx',
    pass: 'fcxhatvwmyijejus'
  }
});

// Endpoint para el webhook de PayPal
app.post('/paypal-webhook', async (req, res) => {
  const event = req.body;

  console.log('Webhook recibido:', event);

  if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    console.log('Pago completado con éxito');
    const paymentId = event.resource.id;
    const amount = event.resource.amount.value || 'No disponible';
    const currency = event.resource.amount.currency_code || 'MXN';

    try {
      const paypalAuthToken = await getPayPalAccessToken();
      console.log('Token de acceso de PayPal obtenido:', paypalAuthToken);

      // Obtener detalles del pago
      const paymentDetailsResponse = await axios.get(`https://api.sandbox.paypal.com/v2/payments/captures/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${paypalAuthToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Detalles del pago:', paymentDetailsResponse.data);

      const orderId = paymentDetailsResponse.data.supplementary_data.related_ids.order_id;

      // Hacer otra llamada para obtener los detalles del pedido
      const orderDetailsResponse = await axios.get(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${paypalAuthToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Detalles de la orden:', orderDetailsResponse.data);

      const payerEmail = orderDetailsResponse.data.payer.email_address || 'No disponible';
      console.log(`Pago completado con ID: ${paymentId}, por un monto de ${amount} ${currency}, email del pagador: ${payerEmail}`);

      const metodoPago = 'PayPal';
      const monto = paymentDetailsResponse.data.amount.value;
      const fechaDePago = new Date();
      const estadoPago = 1;
      const emailAlumno = payerEmail;

      // Consulta para obtener el ID del alumno basado en el correo
      const [alumnoResults] = await pool.query(
        `SELECT alumnos.ID_Alumno 
         FROM alumnos 
         JOIN usuario ON alumnos.Usuario_Generado = usuario.ID_Usuario 
         WHERE usuario.Correo = ?`,
        [emailAlumno]
      );

      if (alumnoResults.length === 0) {
        console.error('Alumno no encontrado con el correo:', emailAlumno);
        return res.status(404).send('Alumno no encontrado');
      }

      const alumnoId = alumnoResults[0].ID_Alumno;
      console.log('ID del alumno encontrado:', alumnoId);

      // Insertar el pago en la base de datos
      await pool.query(
        `INSERT INTO Caja (Metodo_Pago, Monto, Fecha_De_Pago, Estado_Pago, Alumno) 
         VALUES (?, ?, ?, ?, ?)`,
        [metodoPago, monto, fechaDePago, estadoPago, alumnoId]
      );

      console.log('Pago registrado exitosamente en la base de datos');

      // Enviar correo de notificación al usuario
      const mailOptions = {
        from: 'a20300685@ceti.mx',
        to: emailAlumno,
        subject: 'Confirmación de Pago - Servicio Acreditado',
        text: `Estimado usuario, su pago ha sido acreditado con éxito.
        \nDetalles del pago:
        \nServicio: ${metodoPago}
        \nMonto: ${monto} ${currency}
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
      console.error('Error al obtener detalles del pagador:', error.message);
      return res.status(500).send('Error al procesar el pago');
    }
  } else {
    console.log('Evento no manejado:', event.event_type);
  }

  res.sendStatus(200);
});

// Función para obtener el token de acceso de PayPal
async function getPayPalAccessToken() {
  const clientId = 'AacePKN5HLGybUOMGVW8HMna4jWFNf4-D2-gHxO2WsAmxJo2DrU1NahHvGkWrN4FIkZoawW2YedyIoye';
  const clientSecret = 'ENL1bzrIYhRWN0FY7ge4htS7flZxoMFnx38JeoX6hWDfCyEAPssYS9KQMGMb5XN9svqf41pf2ucXdhFV';

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    const response = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error.response ? error.response.data : error.message);
    throw error;
  }
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/





const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authController = require('./controllers/authController');
const pool = require('../proyecto/db/db'); 
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const server = require('http').createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Obtener el tipo de usuario más reciente
app.get('/api/latest-user-type', authController.getLatestUserType);

// Configuración de nodemailer para enviar correos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'a20300685@ceti.mx',
    pass: 'fcxhatvwmyijejus'
  }
});

// Endpoint para el webhook de PayPal
app.post('/paypal-webhook', async (req, res) => {
  const event = req.body;

  console.log('Webhook recibido:', event);

  if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED' || event.event_type === 'PAYMENT.CAPTURE.DECLINED') {
    const paymentId = event.resource.id;
    const amount = event.resource.amount.value || 'No disponible';
    const currency = event.resource.amount.currency_code || 'MXN';
    const status = event.resource.status;
    const estadoPago = status === 'COMPLETED' ? 1 : 0;

    try {
      const paypalAuthToken = await getPayPalAccessToken();
      console.log('Token de acceso de PayPal obtenido:', paypalAuthToken);

      // Obtener detalles del pedido
      const orderId = event.resource.supplementary_data.related_ids.order_id;

      const orderDetailsResponse = await axios.get(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${paypalAuthToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Detalles de la orden:', orderDetailsResponse.data);

      const payerEmail = orderDetailsResponse.data.payer.email_address || 'No disponible';
      console.log(`Estado del pago: ${status}, ID de pago: ${paymentId}, monto: ${amount} ${currency}, email del pagador: ${payerEmail}`);

      const metodoPago = 'PayPal';
      const monto = event.resource.amount.value;
      const fechaDePago = new Date();
      const emailAlumno = payerEmail;

      // Consulta para obtener el ID del alumno basado en el correo
      const [alumnoResults] = await pool.query(
        `SELECT alumnos.ID_Alumno 
         FROM alumnos 
         JOIN usuario ON alumnos.Usuario_Generado = usuario.ID_Usuario 
         WHERE usuario.Correo = ?`,
        [emailAlumno]
      );

      if (alumnoResults.length === 0) {
        console.error('Alumno no encontrado con el correo:', emailAlumno);
        return res.status(404).send('Alumno no encontrado');
      }

      const alumnoId = alumnoResults[0].ID_Alumno;
      console.log('ID del alumno encontrado:', alumnoId);

      // Insertar el pago en la base de datos
      await pool.query(
        `INSERT INTO Caja (Metodo_Pago, Monto, Fecha_De_Pago, Estado_Pago, Alumno) 
         VALUES (?, ?, ?, ?, ?)`,
        [metodoPago, monto, fechaDePago, estadoPago, alumnoId]
      );

      console.log(`Pago registrado exitosamente en la base de datos con estado: ${estadoPago}`);

      // Configurar el correo según el estado del pago
      const mailOptions = {
        from: 'a20300685@ceti.mx',
        to: emailAlumno,
        subject: estadoPago === 1 ? 'Confirmación de Pago - Servicio Acreditado' : 'Notificación de Pago Rechazado',
        text: estadoPago === 1 
          ? `Estimado usuario, su pago ha sido acreditado con éxito.\nDetalles del pago:\nServicio: ${metodoPago}\nMonto: ${monto} ${currency}\nFecha: ${fechaDePago.toLocaleString()}\n\nGracias por su confianza.` 
          : `Estimado usuario, lamentamos informarle que su pago fue rechazado.\nDetalles del pago:\nServicio: ${metodoPago}\nMonto: ${monto} ${currency}\nFecha: ${fechaDePago.toLocaleString()}\n\nPor favor, intente nuevamente o contacte soporte si el problema persiste.`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error al enviar el correo:', err);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });
    } catch (error) {
      console.error('Error al procesar los detalles del pagador:', error.message);
      return res.status(500).send('Error al procesar el pago');
    }
  } else {
    console.log('Evento no manejado:', event.event_type);
  }

  res.sendStatus(200);
});

// Función para obtener el token de acceso de PayPal
async function getPayPalAccessToken() {
  const clientId = 'AacePKN5HLGybUOMGVW8HMna4jWFNf4-D2-gHxO2WsAmxJo2DrU1NahHvGkWrN4FIkZoawW2YedyIoye';
  const clientSecret = 'ENL1bzrIYhRWN0FY7ge4htS7flZxoMFnx38JeoX6hWDfCyEAPssYS9KQMGMb5XN9svqf41pf2ucXdhFV';

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    const response = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error.response ? error.response.data : error.message);
    throw error;
  }
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
