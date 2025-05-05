const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
router.post('/crearAdmin', adminController.crearAdminController);
router.post('/cambiarPass', adminController.comprobarPassController);
router.post('/eliminarAdmin', adminController.eliminarAdminController);
router.post('/login', adminController.loginController);



module.exports = router;