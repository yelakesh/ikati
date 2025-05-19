const Tipo_FiltroModel = require("../models/tipo_filtro.model");


async function obtenerPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await Tipo_FiltroModel.obtenerPorId(id);

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Tipo de filtro no encontrado", tipo_filtro: {} });
    }

    res.json({
      ok: true,
      mensaje: "Tipo de filtro encontrado",
      tipo_filtro: resultado[0],
    });
  } catch (err) {
    console.error("Error en la busqueda del tipo de filtro:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_filtro: {} });
  }
}

async function obtenerTodosController(req, res) {
  try {
    const resultado = await Tipo_FiltroModel.obtenerTodos();

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({
          ok: false,
          mensaje: "Tipos de filtro no encontrados",
          tipo_filtro: {},
        });
    }

    res.json({
      ok: true,
      mensaje: "Tipos de filtro encontrados",
      tipo_filtro: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de los tipos de filtro:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_filtro: {} });
  }
}

async function registrarController(req, res) {
  const objTipo_Filtro = req.body;
  try {
    await Tipo_FiltroModel.registrar(objTipo_Filtro);

    res.json({
      ok: true,
      mensaje: "Se ha realizado el registro con éxito",
      tipo_filtro: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("tipo")) {
        return res.status(401).json({
          ok: false,
          mensaje: "Tipo de filtro ya registrado",
          tipo_filtro: {},
        });
      }
    }
    console.error("Error en el registro del tipos de filtro:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_filtro: {} });
  }
}

async function eliminarPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await Tipo_FiltroModel.eliminarPorId(id);
    if (resultado.affectedRows == 0) {
      return res
        .status(404)
        .json({
          ok: true,
          mensaje: "Tipo de filtro no encontrado",
          tipo_filtro: {},
        });
    }

    res.json({
      ok: true,
      mensaje: "El tipo de filtro se ha eliminado con éxito",
      tipo_filtro: {},
    });
  } catch (err) {
    console.log(resultado);
    res
      .status(500)
      .json({ ok: true, mensaje: "Error en el servidor", tipo_filtro: {} });
  }
}

async function modificarController(req, res) {
  const objTipo_Filtro = req.body;
  try {
    const resultado = await Tipo_FiltroModel.modificar(objTipo_Filtro);
    if (resultado.affectedRows == 0) {
      return res.status(404).json({
        ok: false,
        mensaje: "Tipo de filtro no encontrado",
        tipo_filtro: {},
      });
    }
    res.json({
      ok: true,
      mensaje: "Se ha realizado la modificación con éxito",
      tipo_filtro: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(401).json({
        ok: false,
        mensaje: "Tipo de filtro ya registrado",
        tipo_filtro: {},
      });
    }
    console.error("Error en la modificación del tipo de filtro:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_filtro: {} });
  }
}

module.exports = {
  registrarController,
  modificarController,
  eliminarPorIdController,
  obtenerTodosController,
  obtenerPorIdController,
};
