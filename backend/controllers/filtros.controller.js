const FiltroModel = require("../models/filtros.model");

async function obtenerPorAnimalController(req, res) {
  try {
    const resultado = await FiltroModel.obtenerPorAnimal(req.body.idAnimal);

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Filtros no encontrados", filtros: {} });
    }

    res.json({
      ok: true,
      mensaje: "Filtros encontrados",
      filtros: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de los filtros:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", filtros: {} });
  }
}

async function obtenerPorAnimalYTipoController(req, res) {
  try {
    const resultado = await FiltroModel.obtenerPorAnimalYTipo(
      req.body.idAnimal,
      req.body.idTipo
    );

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Filtros no encontrados", filtros: {} });
    }

    res.json({
      ok: true,
      mensaje: "Filtros encontrados",
      filtros: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de los filtros:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", filtros: {} });
  }
}

module.exports = {
  obtenerPorAnimalYTipoController,
  obtenerPorAnimalController,
};
