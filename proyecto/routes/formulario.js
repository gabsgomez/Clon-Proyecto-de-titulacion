const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const formControllers = require('../controllers/formControllers');

const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

router.get('/user/:userId', asyncHandler(formControllers.obtenerFormularios));
router.get('/:formularioId/pdf', asyncHandler(formControllers.obtenerPDF));
router.post('/guardar-pdf', upload.single('pdf'), asyncHandler(formControllers.guardarPDF));

// Manejador de errores
router.use((err, req, res, next) => {
    console.error('Error en ruta:', err);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: err.message
    });
});

module.exports = router;