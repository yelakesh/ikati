const express = require('express');
const router = express.Router();

const servicioController = require('../controllers/servicio.controller');

router.post('/nuevoServicio', servicioController.nuevoServicioController);
router.post('/modificarPorNombre', servicioController.modificarPorNombreController);
router.post('/obtenerPorNombre', servicioController.obtenerPorNombreController);
router.post('/eliminarPorNombre', servicioController.eliminarPorNombreController);





module.exports = router;