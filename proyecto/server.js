/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);





const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const authController = require("./controllers/authController"); // Asegúrate de importar el controlador
const formRoute = require("./routes/formulario");

const app = express();
const server = require("http").createServer(app);

app.use(cors({
  origin: 'http://localhost:3000', // Ajusta esto al origen de tu frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: err.message
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/form", formRoute);

app.get("/api/latest-user-type", authController.getLatestUserType);

//lo nuevo
app.get("/get-user-type", authController.getUserType);

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
