const express = require('express');
const router = express.Router();

const avisarStockController = require('../controllers/avisarStock.controller');

router.post('/anadiraAvisar', avisarStockController.anadiraAvisarController);


module.exports = router;