const ProductoModel = require("../models/producto.model");

async function obtenerProductoCompletoController(req, res) {
  const objProducto = req.body;

  try {
    let producto = await ProductoModel.obtenerProductoPorNombre(
      objProducto.nombre
    );

    if (producto.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Producto no encontrado", producto: {} });
    }
    let filtros = await ProductoModel.obtenerFiltrosPorIdProducto(
      producto[0].id
    );
    let variantes = await ProductoModel.obtenerVariantesPorIdProducto(
      producto[0].id
    );
    let imagenes = await ProductoModel.obtenerImagenesPorIdProducto(
      producto[0].id
    );
    let nombre_variacion = "";

    if (filtros.length === 0) {
      filtros = [
        {
          filtro: "",
          valor: "",
        },
      ];
    }

    if (variantes.length === 0) {
      variantes = [
        {
          valor_variacion: "",
          precio: "",
          stock: "",
        },
      ];
    } else {
      nombre_variacion = variantes[0].nombre_variacion;
    }

    if (imagenes.length === 0) {
      imagenes = [
        {
          url: "",
        },
      ];
    }

    res.json({
      ok: true,
      mensaje: "Producto encontrado",
      producto: producto[0],
      nombre_variacion: nombre_variacion,
      filtros: filtros,
      variantes: variantes,
      imagenes: imagenes,
    });
  } catch (err) {
    console.error("Error en la busqueda del producto:", err);
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", producto: {} });
  }
}

async function registrarProductoCompletoController(req, res) {
  const objProducto = req.body;

  try {
    await ProductoModel.registrarProducto(JSON.parse(objProducto.producto));

    let id_producto = (
      await ProductoModel.obtenerProductoPorNombre(
        JSON.parse(objProducto.producto).nombre
      )
    )[0].id;

    try {
      let filtros = JSON.parse(objProducto.filtros);
      for (const filtro of filtros) {
        await ProductoModel.registrarFiltro(id_producto, filtro);
      }
    } catch (err) {
      console.error("Error en el registro del filtro:", err);
      return res
        .status(500)
        .json({ ok: false, mensaje: "Error del servidor", filtro: {} });
    }

    try {
      let variantes = JSON.parse(objProducto.variantes);

      for (const variante of variantes) {
        await ProductoModel.registrarVariante(
          id_producto,
          objProducto.nombre_variacion,
          variante
        );

        await ProductoModel.registrarFiltro(id_producto, {
          filtro: objProducto.nombre_variacion,
          valor: variante.valor_variacion,
        });
      }
    } catch (err) {
      console.error("Error en el registro de la variante:", err);
      return res
        .status(500)
        .json({ ok: false, mensaje: "Error del servidor", variante: {} });
    }

    try {
      console.log(req.files);
      for (const file of req.files) {
        await ProductoModel.registrarImagen(id_producto, file.filename);
      }
    } catch (err) {
      console.error("Error en el registro de la imagen:", err);
      return res
        .status(500)
        .json({ ok: false, mensaje: "Error del servidor", imagen: {} });
    }

    res.json({
      ok: true,
      mensaje: "Se ha realizado el registro con éxito",
      producto: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("nombre")) {
        return res.status(401).json({
          ok: false,
          mensaje: "Nombre ya registrado",
          producto: {},
        });
      }
    }
    console.error("Error en el registro del producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", producto: {} });
  }
}
module.exports = {
  obtenerProductoCompletoController,
  registrarProductoCompletoController,
};
