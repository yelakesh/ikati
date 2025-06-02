const express = require("express");
const router = express.Router();

const tipo_producto = require("../controllers/tipo_producto.controller");

router.post("/obtenerPorId", tipo_producto.obtenerPorIdController);
router.post("/registrar", tipo_producto.registrarController);
router.post("/eliminarPorId", tipo_producto.eliminarPorIdController);
router.post("/modificar", tipo_producto.modificarController);
router.post("/obtenerTodos", tipo_producto.obtenerTodosController);
router.post("/obtenerPorIdAnimal", tipo_producto.obtenerPorIdAnimalController);
router.post("/obtenerFiltroPorIdAnimal", tipo_producto.obtenerFiltroPorIdAnimalController);

module.exports = router;
