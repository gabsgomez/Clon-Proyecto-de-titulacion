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

const app = express();
const server = require("http").createServer(app);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/api/latest-user-type", authController.getLatestUserType);

//lo nuevo
app.get("/get-user-type", authController.getUserType);

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
