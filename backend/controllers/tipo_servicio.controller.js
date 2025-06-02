const tipo_servicioModel = require("../models/tipo_servicio.model");

async function obtenerTodosController(req, res) {
  try {
    const resultado = await tipo_servicioModel.obtenerTodos();

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({
          ok: false,
          mensaje: "Tipos de servicio no encontrados",
          tipo_servicio: {},
        });
    }

    res.json({
      ok: true,
      mensaje: "Tipos de servicio encontrados",
      tipo_servicio: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de los tipos de servicio:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_servicio: {} });
  }
}

module.exports = {
  obtenerTodosController,
};