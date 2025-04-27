const express = require('express');
const router = express.Router();

const cuponesController = require('../controllers/cupones.controller');

router.post('/nuevoCupon', cuponesController.nuevoCuponController);
/*router.post('/obtenerPorUsuario', usuarioController.obtenerPorUsuarioController);
router.post('/registrar', usuarioController.registrarController);
router.post('/eliminarPorUsuario', usuarioController.eliminarPorUsuarioController);
router.post('/modificarPorUsuario', usuarioController.modificarPorUsuarioController);
*/module.exports = router;