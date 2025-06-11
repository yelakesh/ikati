const express = require('express');
const router = express.Router();

const carroController = require('../controllers/carro.controller');

router.post('/anadiraCarro', carroController.anadiraCarroController);
router.post('/eliminarDeCarro', carroController.eliminarDeCarroController);
router.post('/obtenerProductosCarritoPorIdUsuario', carroController.obtenerProductosCarritoPorIdUsuarioController);
router.post("/completarCompra", carroController.completarCompraController);


module.exports = router;