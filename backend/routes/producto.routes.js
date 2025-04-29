const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productos.controller');

router.post('/obtenerProductoCompleto', productoController.obtenerProductoCompletoController);
router.post('/registrarProductoCompleto', productoController.registrarProductoCompletoController);

module.exports = router;