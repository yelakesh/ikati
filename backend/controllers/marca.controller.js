const MarcaModel = require("../models/marca.model");

async function obtenerPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await MarcaModel.obtenerPorId(id);

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Marca no encontrada", marca: {} });
    }

    res.json({
      ok: true,
      mensaje: "Marca encontrada",
      marca: resultado[0],
    });
  } catch (err) {
    console.error("Error en la busqueda de la marca:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", marca: {} });
  }
}

async function obtenerMarcasController(req, res) {
  try {
    const resultado = await MarcaModel.obtenerTodo();

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Marcas no encontradas", marca: {} });
    }

    res.json({
      ok: true,
      mensaje: "Marca encontrada",
      marcas: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de las marcas:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", marca: {} });
  }
}
async function obtenerFiltroPorAnimalController(req, res) {
  try {
    const resultado = await MarcaModel.obtenerFiltroPorAnimal(req.body.idAnimal);

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Marcas no encontradas", marca: {} });
    }

    res.json({
      ok: true,
      mensaje: "Marca encontrada",
      marcas: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de las marcas:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", marca: {} });
  }
}

async function registrarController(req, res) {
  const objmarca = req.body;
  try {
    await MarcaModel.registrar(objmarca);

    res.json({
      ok: true,
      mensaje: "Se ha realizado el registro con éxito",
      marca: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("nombre")) {
        return res
          .status(401)
          .json({ ok: false, mensaje: "Marca ya registrado", marca: {} });
      }
    }
    console.error("Error en el registro de la usuario:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", marca: {} });
  }
}

async function eliminarPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await MarcaModel.eliminarPorId(id);
    if (resultado.affectedRows == 0) {
      return res
        .status(404)
        .json({ ok: true, mensaje: "Marca no encontrada", marca: {} });
    }

    res.json({
      ok: true,
      mensaje: "La marca se ha eliminado con éxito",
      marca: {},
    });
  } catch (err) {
    console.log(resultado);
    res
      .status(500)
      .json({ ok: true, mensaje: "Error en el servidor", marca: {} });
  }
}

async function modificarController(req, res) {
  const objmarca = req.body;
  try {
    const resultado = await MarcaModel.modificar(objmarca);
    if (resultado.affectedRows == 0) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Marca no encontrada", marca: {} });
    }
    res.json({
      ok: true,
      mensaje: "Se ha realizado la modificación con éxito",
      marca: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Marca ya registrado", marca: {} });
    }
    console.error("Error en la modificación de la usuario:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error de la servidor", marca: {} });
  }
}

module.exports = {
  registrarController,
  eliminarPorIdController,
  obtenerPorIdController,
  modificarController,
  obtenerMarcasController,
  obtenerFiltroPorAnimalController,
};
