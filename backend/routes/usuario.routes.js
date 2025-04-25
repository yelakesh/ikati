const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.post('/login', usuarioController.loginController);
router.post('/obtenerPorUsuario', usuarioController.obtenerPorUsuarioController);
router.post('/registrar', usuarioController.registrarController);

module.exports = router;