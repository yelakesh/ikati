const express = require('express');
const router = express.Router();

const carroController = require('../controllers/carro.controller');

router.post('/anadiraCarro', carroController.anadiraCarroController);


module.exports = router;