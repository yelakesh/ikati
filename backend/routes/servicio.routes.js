const express = require('express');
const router = express.Router();

const servicioController = require('../controllers/servicio.controller');

router.post('/nuevoServicio', servicioController.nuevoServicioController);
/*
router.post('/modificarPorCodigo', cuponesController.modificarPorCodigoController);
router.post('/obtenerPorCodigo', cuponesController.obtenerPorCodigoController);

router.post('/eliminarPorCodigo', cuponesController.eliminarPorCodigoController);*/

module.exports = router;