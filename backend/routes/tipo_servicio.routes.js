const express = require("express");
const router = express.Router();

const tipo_servicio = require("../controllers/tipo_servicio.controller");

router.post("/obtenerTodos", tipo_servicio.obtenerTodosController);

module.exports = router;