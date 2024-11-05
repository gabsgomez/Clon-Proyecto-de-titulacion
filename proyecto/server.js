

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const formRoutes = require("./routes/formulario")
const authController = require('./controllers/authController');
const app = express();
const server = require('http').createServer(app);



//const mysql = require('mysql2/promise');


// Conexión a la base de datos MySQL
// const connection = mysql.createConnection({
//   host: 'localhost', 
//   user: 'root', 
//   password: '', 
//   database: 'marathon_institudee',
//   port: 3306, 
// });


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);

// Obtener el tipo de usuario más reciente
app.get('/api/latest-user-type', authController.getLatestUserType);

const axios = require('axios');

// Endpoint para el webhook de PayPal
app.post('/paypal-webhook', async (req, res) => {
    const event = req.body;

    // Log para depurar que el webhook fue recibido
    console.log('Webhook recibido:', event);

    // Manejar el evento de PayPal
    switch (event.event_type) {
        case 'PAYMENT.CAPTURE.COMPLETED':
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

                // Intentar obtener el ID del pedido para buscar más detalles
                const orderId = paymentDetailsResponse.data.supplementary_data.related_ids.order_id;

                // Hacer otra llamada para obtener los detalles del pedido
                const orderDetailsResponse = await axios.get(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${paypalAuthToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Imprimir los detalles de la orden para inspeccionar su estructura
                console.log('Detalles de la orden:', orderDetailsResponse.data);

                // Obtener el correo del pagador desde la respuesta de la orden
                const payerEmail = orderDetailsResponse.data.payer.email_address || 'No disponible';
                console.log(`Pago completado con ID: ${paymentId}, por un monto de ${amount} ${currency}, email del pagador: ${payerEmail}`);

                //Inicia consulta a la bd
                const metodoPago = 'PayPal';
                const monto = paymentDetailsResponse.data.amount.value;
                const fechaDePago = new Date(); // La fecha actual en el momento de la confirmación
                const estadoPago = 1;
                const emailAlumno = payerEmail;

                const searchSql = `
                    SELECT alumnos.ID_Alumno 
                    FROM alumnos 
                    JOIN usuario ON alumnos.Usuario_Generado = usuario.ID_Usuario 
                    WHERE usuario.Correo = ?
                `;

                // Ejecutar la consulta para obtener el ID del alumno
                connection.query(searchSql, [emailAlumno], (error, results) => {
                    if (error) {
                        console.error('Error al buscar el alumno en la base de datos:', error);
                        return res.status(500).send('Error al buscar el alumno en la base de datos');
                    } else if (results.length === 0) {
                        console.error('Alumno no encontrado con el correo:', emailAlumno);
                        return res.status(404).send('Alumno no encontrado');
                    } else {
                        const alumnoId = results[0].ID_Alumno;
                        console.log('ID del alumno encontrado:', alumnoId);

                        // Insertar el pago en la base de datos
                        const sql = `
                            INSERT INTO Caja (Metodo_Pago, Monto, Fecha_De_Pago, Estado_Pago, Alumno) 
                            VALUES (?, ?, ?, ?, ?)
                        `;
                        connection.query(sql, [metodoPago, monto, fechaDePago, estadoPago, alumnoId], (error, results) => {
                            if (error) {
                                console.error('Error al insertar el pago en la base de datos:', error);
                                return res.status(500).send('Error al registrar el pago en la base de datos');
                            } else {
                                console.log('Pago registrado exitosamente en la base de datos:', results);
                            }
                        });
                    }
                });

            } catch (error) {
                console.error('Error al obtener detalles del pagador:', error.message);
            }

            break;

        default:
            console.log('Evento no manejado:', event.event_type);
    }

    // Responder a PayPal que el webhook fue recibido correctamente
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
