const Tipo_VariacionModel = require("../models/tipo_variante.model");

async function obtenerPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await Tipo_VariacionModel.obtenerPorId(id);

    if (resultado.length === 0) {
      return res.status(401).json({
        ok: false,
        mensaje: "Tipo de variación no encontrado",
        tipo_variante: {},
      });
    }

    res.json({
      ok: true,
      mensaje: "Tipo de variación encontrado",
      tipo_variante: resultado[0],
    });
  } catch (err) {
    console.error("Error en la busqueda del tipo de producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_variante: {} });
  }
}

async function obtenerTodosController(req, res) {
  try {
    const resultado = await Tipo_VariacionModel.obtenerTodos();

    if (resultado.length === 0) {
      return res.status(401).json({
        ok: false,
        mensaje: "Tipos de variacion no encontrados",
        tipo_variante: {},
      });
    }

    res.json({
      ok: true,
      mensaje: "Tipos de variacion encontrados",
      tipo_variante: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de los tipos de variacion:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_variante: {} });
  }
}

async function registrarController(req, res) {
  const objTipo_Producto = req.body;
  try {
    await Tipo_VariacionModel.registrar(objTipo_Producto);

    res.json({
      ok: true,
      mensaje: "Se ha realizado el registro con éxito",
      tipo_variante: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("tipo")) {
        return res.status(401).json({
          ok: false,
          mensaje: "Tipo de variación ya registrado",
          tipo_variante: {},
        });
      }
    }
    console.error("Error en el registro del tipos de variacion:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_variante: {} });
  }
}

async function eliminarPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await Tipo_VariacionModel.eliminarPorId(id);
    if (resultado.affectedRows == 0) {
      return res.status(404).json({
        ok: true,
        mensaje: "Tipo de variación no encontrado",
        tipo_variante: {},
      });
    }

    res.json({
      ok: true,
      mensaje: "El tipo de producto se ha eliminado con éxito",
      tipo_variante: {},
    });
  } catch (err) {
    console.log(resultado);
    res
      .status(500)
      .json({ ok: true, mensaje: "Error en el servidor", tipo_variante: {} });
  }
}

async function modificarController(req, res) {
  const objTipo_Producto = req.body;
  try {
    const resultado = await Tipo_VariacionModel.modificar(objTipo_Producto);
    if (resultado.affectedRows == 0) {
      return res.status(404).json({
        ok: false,
        mensaje: "Tipo de variación no encontrado",
        tipo_variante: {},
      });
    }
    res.json({
      ok: true,
      mensaje: "Se ha realizado la modificación con éxito",
      tipo_variante: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(401).json({
        ok: false,
        mensaje: "Tipo de variación ya registrado",
        tipo_variante: {},
      });
    }
    console.error("Error en la modificación del tipo de producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_variante: {} });
  }
}

module.exports = {
  registrarController,
  modificarController,
  eliminarPorIdController,
  obtenerTodosController,
  obtenerPorIdController,
};
