const express = require("express");
const router = express.Router();
const filtrosController = require("../controllers/filtros.controller");


router.post("/obtenerPorAnimal", filtrosController.obtenerPorAnimalController);
router.post("/obtenerPorAnimalYTipo", filtrosController.obtenerPorAnimalYTipoController);


module.exports = router;