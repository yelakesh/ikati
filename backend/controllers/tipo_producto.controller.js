const Tipo_ProductoModel = require("../models/tipo_producto.model");


async function obtenerPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await Tipo_ProductoModel.obtenerPorId(id);

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Tipo de producto no encontrado", tipo_Producto: {} });
    }

    res.json({
      ok: true,
      mensaje: "Tipo de producto encontrado",
      tipo_Producto: resultado[0],
    });
  } catch (err) {
    console.error("Error en la busqueda del tipo de producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_Producto: {} });
  }
}

async function obtenerTodosController(req, res) {
  try {
    const resultado = await Tipo_ProductoModel.obtenerTodos();

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({
          ok: false,
          mensaje: "Tipos de producto no encontrados",
          tipo_Producto: {},
        });
    }

    res.json({
      ok: true,
      mensaje: "Tipos de producto encontrados",
      tipo_Producto: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda de los tipos de producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_Producto: {} });
  }
}

async function registrarController(req, res) {
  const objTipo_Producto = req.body;
  try {
    await Tipo_ProductoModel.registrar(objTipo_Producto);

    res.json({
      ok: true,
      mensaje: "Se ha realizado el registro con éxito",
      tipo_Producto: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("tipo")) {
        return res.status(401).json({
          ok: false,
          mensaje: "Tipo de producto ya registrado",
          tipo_Producto: {},
        });
      }
    }
    console.error("Error en el registro del tipos de producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_Producto: {} });
  }
}

async function eliminarPorIdController(req, res) {
  const id = req.body.id;
  try {
    const resultado = await Tipo_ProductoModel.eliminarPorId(id);
    if (resultado.affectedRows == 0) {
      return res
        .status(404)
        .json({
          ok: true,
          mensaje: "Tipo de producto no encontrado",
          tipo_Producto: {},
        });
    }

    res.json({
      ok: true,
      mensaje: "El tipo de producto se ha eliminado con éxito",
      tipo_Producto: {},
    });
  } catch (err) {
    console.log(resultado);
    res
      .status(500)
      .json({ ok: true, mensaje: "Error en el servidor", tipo_Producto: {} });
  }
}

async function modificarController(req, res) {
  const objTipo_Producto = req.body;
  try {
    const resultado = await Tipo_ProductoModel.modificar(objTipo_Producto);
    if (resultado.affectedRows == 0) {
      return res.status(404).json({
        ok: false,
        mensaje: "Tipo de producto no encontrado",
        tipo_Producto: {},
      });
    }
    res.json({
      ok: true,
      mensaje: "Se ha realizado la modificación con éxito",
      tipo_Producto: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(401).json({
        ok: false,
        mensaje: "Tipo de producto ya registrado",
        tipo_Producto: {},
      });
    }
    console.error("Error en la modificación del tipo de producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_Producto: {} });
  }
}
async function obtenerPorIdAnimalController(req, res) {
  const id_animal = req.body.idAnimal;
 
  try {
    const resultado = await Tipo_ProductoModel.obtenerPorIdAnimal(id_animal);

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({
          ok: false,
          mensaje: "Tipos de producto no encontrados",
          tipo_Producto: {},
        });
    }

    res.json({
      ok: true,
      mensaje: "Tipos de producto encontrados",
      tipo_Producto: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda del tipo de producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_Producto: {} });
  }
}
async function obtenerFiltroPorIdAnimalController(req, res) {
  const id_animal = req.body.idAnimal;
 
  try {
    const resultado = await Tipo_ProductoModel.obtenerFiltroPorIdAnimal(id_animal);

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({
          ok: false,
          mensaje: "Tipos de producto no encontrados",
          tipo_Producto: {},
        });
    }

    res.json({
      ok: true,
      mensaje: "Tipos de producto encontrados",
      tipo_Producto: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda del tipo de producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", tipo_Producto: {} });
  }
}

module.exports = {
  registrarController,
  modificarController,
  eliminarPorIdController,
  obtenerTodosController,
  obtenerPorIdController,
  obtenerPorIdAnimalController,
  obtenerFiltroPorIdAnimalController,
};
