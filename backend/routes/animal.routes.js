const express = require("express");
const router = express.Router();

const animalController = require("../controllers/animal.controller");

router.post("/obtenerPorId", animalController.obtenerPorIdController);
router.post("/registrar", animalController.registrarController);
router.post("/eliminarPorId", animalController.eliminarPorIdController);
router.post("/modificarAnimal", animalController.modificarAnimalController);
router.post("/obtenerAnimales", animalController.obtenerAnimalesController);

module.exports = router;
