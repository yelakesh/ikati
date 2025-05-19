const express = require("express");
const router = express.Router();

const tipo_filtro = require("../controllers/tipo_filtro.controller");

router.post("/obtenerPorId", tipo_filtro.obtenerPorIdController);
router.post("/registrar", tipo_filtro.registrarController);
router.post("/eliminarPorId", tipo_filtro.eliminarPorIdController);
router.post("/modificar", tipo_filtro.modificarController);
router.post("/obtenerTodos", tipo_filtro.obtenerTodosController);

module.exports = router;
