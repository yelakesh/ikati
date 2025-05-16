const express = require("express");
const router = express.Router();

const tipo_variante = require("../controllers/tipo_variante.controller");

router.post("/obtenerPorId", tipo_variante.obtenerPorIdController);
router.post("/registrar", tipo_variante.registrarController);
router.post("/eliminarPorId", tipo_variante.eliminarPorIdController);
router.post("/modificar", tipo_variante.modificarController);
router.post("/obtenerTodos", tipo_variante.obtenerTodosController);

module.exports = router;
