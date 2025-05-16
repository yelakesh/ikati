import ProductoModel from "../models/producto.model.js";
import ImagenModel from "../models/imagen.model.js";
import Tipo_Variante from "../models/tipo_variante.model.js";
import Tipo_Producto from "../models/tipo_producto.model.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function obtenerProductoPorIdController(req, res) {
  const id = req.body.id;

  try {
    let producto = await ProductoModel.obtenerProductoPorId(id);
    let variantes = await ProductoModel.obtenerVariantesPorIdProducto(id);
    let filtros = await ProductoModel.obtenerFiltrosPorIdProducto(id);
    let imagenes = await ImagenModel.obtenerImagenesPorIdProducto(id);
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

async function obtenerTodosController(req, res) {
 const productos = await ProductoModel.obtenerTodos()
 let resultados=[]

 productos.forEach(async (producto) => {
  try {
    let variantes = await ProductoModel.obtenerVariantesPorIdProducto(
      producto.id
    );
    let filtros = await ProductoModel.obtenerFiltrosPorIdProducto(producto.id);
    let imagenes = await ImagenModel.obtenerImagenesPorIdProducto(producto.id);
    let tipo_producto = await Tipo_Producto.obtenerPorId(producto.id_tipo)
    let tipo_variante = await Tipo_Variante.obtenerPorId_producto(producto.id);

    if (filtros.length === 0) {
      filtros = [
        {
          id:0,
          id_producto:0,
          filtro: "",
          valor: "",
        },
      ];
    }

    if (variantes.length === 0) {
      variantes = [
        {
          id:0,
          id_producto:0,
          precio: "",
          stock: "",
          id_variacion:0,
          valor_variacion:''
        },
      ];
    }

    if (imagenes.length === 0) {
      imagenes = [
        {
          id:0,
          id_producto:0,
          url: "",
        },
      ];
    }
    resultados.push({
      producto: producto,
      tipo_producto: tipo_producto,
      tipo_variante: tipo_variante,
      variantes: variantes,
      filtros: filtros,
      imagenes: imagenes,
    });
  } catch (err) {
    console.error("Error en la busqueda del producto:", err);
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", productos: {} });
  }


 });
 res.json({
   ok: true,
   mensaje: "Productos encontrados",
   productos: resultados
 });
  
}

async function obtenerNombresController(req, res) {
  try {
    let productos = await ProductoModel.obtenerNombres();

    res.json({
      ok: true,
      mensaje: "Productos encontrados",
      productos,
    });
  } catch (err) {
    console.error("Error en la busqueda de productos:", err);
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
          objProducto.id_variacion,
          variante
        );
      }
    } catch (err) {
      console.error("Error en el registro de la variante:", err);
      return res
        .status(500)
        .json({ ok: false, mensaje: "Error del servidor", variante: {} });
    }

    try {
      for (const file of req.files) {
        await ImagenModel.registrarImagen(id_producto, file.filename);
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

async function modificarProductoController(req, res) {
  const objProducto = req.body;
  let id_producto = objProducto.producto.id;
  try {
    let resultado = await ProductoModel.modificarProducto(
      JSON.parse(objProducto.producto)
    );

    if (resultado.affectedRows != 0) {
      try {
        let filtros = JSON.parse(objProducto.filtros);
        await ProductoModel.eliminarFiltros(id_producto);
        for (const filtro of filtros) {
          await ProductoModel.registrarFiltro(id_producto, filtro);
        }
      } catch (err) {
        console.error("Error en la modificacion del filtro:", err);
        return res
          .status(500)
          .json({ ok: false, mensaje: "Error del servidor", filtro: {} });
      }

      try {
        let variantes = JSON.parse(objProducto.variantes);
        await ProductoModel.eliminarVariantes(id_producto);
        for (const variante of variantes) {
          await ProductoModel.registrarVariante(
            id_producto,
            objProducto.id_variacion,
            variante
          );
        }
      } catch (err) {
        console.error("Error en la modificacion de las variantes:", err);
        return res
          .status(500)
          .json({ ok: false, mensaje: "Error del servidor", variante: {} });
      }

      try {
        await eliminarImagenes(id_producto);
        for (const file of req.files) {
          await ImagenModel.registrarImagen(id_producto, file.filename);
        }
      } catch (err) {
        console.error("Error en la modificacion de las imagenes:", err);
        return res
          .status(500)
          .json({ ok: false, mensaje: "Error del servidor", imagen: {} });
      }

      res.json({
        ok: true,
        mensaje: "Se ha realizado la modificación con éxito",
        producto: {},
      });
    } else {
      res
        .status(404)
        .json({ ok: false, mensaje: "Producto no encontrado", producto: {} });
    }
  } catch (err) {
    console.error("Error en la modificacion del producto:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", producto: {} });
  }
}

async function eliminarImagenes(id_producto) {
  const imagenes = await ImagenModel.obtenerImagenesPorIdProducto(id_producto);

  imagenes.forEach((imagen) => {
    const ruta = path.join(__dirname, "..", "imagenesProductos", imagen.url);
    fs.unlink(ruta, (err) => {
      if (err) {
        console.error("Error al eliminar archivo:", err);
      } else {
        console.log("Archivo eliminado:", imagen.url);
      }
    });
  });
  await ImagenModel.eliminarImagenes(id_producto);
}

async function eliminarProductoController(req, res) {
  const producto = req.body;
  const id_producto = producto.id;
  try {
    if (!(await ProductoModel.obtenerProductoPorId(id_producto))[0]) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Producto no encontrado", producto: {} });
    }
    await ImagenModel.eliminarImagenes(id_producto);
    await ProductoModel.eliminarProducto(id_producto);
    return res.status(200).json({
      ok: true,
      mensaje: "Producto eliminado con éxito",
      producto: {},
    });
  } catch (err) {
    console.error("Error en la busqueda del producto:", err);
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", producto: {} });
  }
}

export {
  obtenerProductoPorIdController,
  registrarProductoCompletoController,
  modificarProductoController,
  eliminarProductoController,
  obtenerNombresController,
  obtenerTodosController,
};
