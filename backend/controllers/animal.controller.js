const AnimalModel = require("../models/animal.model");


async function obtenerPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await AnimalModel.obtenerPorId(id);

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Animal no encontrado", animal: {} });
    }

    res.json({
      ok: true,
      mensaje: "Animal encontrado",
      animal: resultado[0],
    });
  } catch (err) {
    console.error("Error en la busqueda del animal:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", animal: {} });
  }
}

async function obtenerAnimalesController(req, res) {
  try {
    const resultado = await AnimalModel.obtenerAnimales();

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Animales no encontrados", animal: {} });
    }

    res.json({
      ok: true,
      mensaje: "Animales encontrados",
      animales: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de los animales:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", animal: {} });
  }
}

async function registrarController(req, res) {
  const objAnimal = req.body;
  try {
    await AnimalModel.registrar(objAnimal);

    res.json({
      ok: true,
      mensaje: "Se ha realizado el registro con éxito",
      animal: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("nombre")) {
        return res
          .status(401)
          .json({ ok: false, mensaje: "Animal ya registrado", animal: {} });
      }
    }
    console.error("Error en el registro del animal:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", animal: {} });
  }
}

async function eliminarPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await AnimalModel.eliminarPorId(id);
    if (resultado.affectedRows == 0) {
      return res
        .status(404)
        .json({ ok: true, mensaje: "Animal no encontrado", animal: {} });
    }

    res.json({
      ok: true,
      mensaje: "El animal se ha eliminado con éxito",
      animal: {},
    });
  } catch (err) {
    console.log(resultado);
    res
      .status(500)
      .json({ ok: true, mensaje: "Error en el servidor", animal: {} });
  }
}

async function modificarAnimalController(req, res) {
  const objAnimal = req.body;
  try {
    const resultado = await AnimalModel.modificarAnimal(objAnimal);
    if (resultado.affectedRows == 0) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Animal no encontrado", animal: {} });
    }
    res.json({
      ok: true,
      mensaje: "Se ha realizado la modificación con éxito",
      animal: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Animal ya registrado", animal: {} });
    }
    console.error("Error en la modificación del animal:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", animal: {} });
  }
}

module.exports = {
  registrarController,
  modificarAnimalController,
  eliminarPorIdController,
  obtenerAnimalesController,
  obtenerPorIdController,
};
