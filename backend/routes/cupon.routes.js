const express = require('express');
const router = express.Router();

const cuponesController = require('../controllers/cupones.controller');

router.post('/nuevoCupon', cuponesController.nuevoCuponController);
router.post('/modificarPorCodigo', cuponesController.modificarPorCodigoController);
router.post('/obtenerPorCodigo', cuponesController.obtenerPorCodigoController);

router.post('/eliminarPorCodigo', cuponesController.eliminarPorCodigoController);

module.exports = router;