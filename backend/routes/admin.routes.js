const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
router.post('/crearAdmin', adminController.crearAdminController);
router.post('/cambiarPass', adminController.comprobarPassController);
/*router.post('/login', usuarioController.loginController);


router.post('/eliminarPorUsuario', usuarioController.eliminarPorUsuarioController);
router.post('/modificarPorUsuario', usuarioController.modificarPorUsuarioController);*/
module.exports = router;