const express = require('express');
const router = express.Router();
const multer = require('multer');
const authController = require('../controllers/authController');

const asyncHandler = fn => (req, res, next) => {
  return Promise
      .resolve(fn(req, res, next))
      .catch(next);
};

//const authMiddleware = require('../controllers/authMiddleware');

//router.post('/upload', authMiddleware.verifyToken, authController.uploadFiles);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', authController.verifyCode);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/verify-reset-code', authController.verifyResetCode);
router.post('/reset-password', authController.resetPassword);



//lo nuevo
router.post('/latest-user-type', authController.getLatestUserType);
//////
router.post('/loginadministradores', asyncHandler(authController.loginadministradores));

router.post('/upload', authController.uploadFiles);

// Ruta para obtener todos los precios
router.get('/precios', authController.getPrecios);

// Ruta para actualizar un precio
router.put('/precios/:id', authController.updatePrecio);

//Ruta para obtener tipo de usuario
router.get('/usuarios', authController.getUsuariosPorTipo);

// Ruta para obtener usuarios con filtros de tipo y término de búsqueda
//router.get('/usuarios', authController.getUsuarios);

router.get('/search-users', authController.searchUsers);  // Nueva ruta para búsqueda

// Ruta para obtener los pagos filtrados por temporalidad
router.get('/finanzas', authController.getFinanzas);

router.get('/finanzas/semanal', authController.getFinanzasSemanal);
router.get('/finanzas/mensual', authController.getFinanzasMensual);
router.get('/finanzas/semestral', authController.getFinanzasSemestral);

// Definición de las rutas para los estatus de los usuarios
router.get('/usuarios/estatus/:estatus', authController.getUsuariosPorEstatus);

// Ruta para habilitar un usuario
router.put('/usuarios/habilitar/:id', authController.habilitarUsuario);

// Ruta para deshabilitar un usuario
router.put('/usuarios/deshabilitar/:id', authController.deshabilitarUsuario);

router.get('/etiquetas/generaciones', authController.obtenerGeneraciones);
router.post('/etiquetas/crear', authController.crearGeneracion);
router.get('/alumnos/primer-ingreso-sin-generacion', authController.obtenerAlumnosPrimerIngresoSinGeneracion);

router.get('/etiquetas/ultima-generacion', async (req, res) => {
    try {
      const ultimaGeneracion = await authController.obtenerUltimaGeneracion();
      res.status(200).json({ ultimaGeneracion });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la última generación' });
    }
  });



module.exports = router;