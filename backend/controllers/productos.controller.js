import ProductoModel from "../models/producto.model.js";
import ImagenModel from "../models/imagen.model.js";
import Tipo_Variante from "../models/tipo_variante.model.js";
import Tipo_Producto from "../models/tipo_producto.model.js";
import Animal from "../models/animal.model.js";
import Marca from "../models/marca.model.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function obtenerProductoPorIdController(req, res) {
  const producto = await ProductoModel.obtenerProductoPorId(
    req.body.id_producto
  );

  const resultado = await obtenerDatosProducto(producto[0]);
  if (!resultado.ok) {
    console.error("Error en la búsqueda del producto:", resultado.error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error del servidor",
      producto: {},
    });
  }

  res.json({
    ok: true,
    mensaje: "Producto encontrado",
    producto: resultado.datos,
  });
}

async function obtenerEnOfertaController(req, res) {
  const productos = await ProductoModel.obtenerEnOferta();
  let resultados = [];

  for await (const producto of productos) {
    const resultado = await obtenerDatosProducto(producto);
    if (!resultado.ok) {
      console.error("Error en la búsqueda del producto:", resultado.error);
      return res.status(500).json({
        ok: false,
        mensaje: "Error del servidor",
        productos: {},
      });
    }

    resultados.push(resultado.datos);
  }

  res.json({
    ok: true,
    mensaje: "Productos encontrados",
    productos: resultados,
  });
}

async function obtenerRecomendadosController(req, res) {
  const productos = await ProductoModel.obtenerRecomendados();
  let resultados = [];

  for await (const producto of productos) {
    const resultado = await obtenerDatosProducto(producto);
    if (!resultado.ok) {
      console.error("Error en la búsqueda del producto:", resultado.error);
      return res.status(500).json({
        ok: false,
        mensaje: "Error del servidor",
        productos: {},
      });
    }

    resultados.push(resultado.datos);
  }

  res.json({
    ok: true,
    mensaje: "Productos encontrados",
    productos: resultados,
  });
}

async function obtenerTodosController(req, res) {
  const productos = await ProductoModel.obtenerTodos();
  let resultados = [];

  for await (const producto of productos) {
    const resultado = await obtenerDatosProducto(producto);
    if (!resultado.ok) {
      console.error("Error en la búsqueda del producto:", resultado.error);
      return res.status(500).json({
        ok: false,
        mensaje: "Error del servidor",
        productos: {},
      });
    }

    resultados.push(resultado.datos);
  }

  res.json({
    ok: true,
    mensaje: "Productos encontrados",
    productos: resultados,
  });
}

async function obtenerNombresController(_req, res) {
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
    )[0].id_producto;

    try {
      let filtros = JSON.parse(objProducto.filtros);
      for (const filtro of filtros) {
        if (filtro.id_filtro != 0) {
          await ProductoModel.registrarFiltro(id_producto, filtro);
        }
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
          objProducto.id_tipo_variante,
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
  let id_producto = JSON.parse(objProducto.producto).id_producto;

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

        for (const variante of variantes) {


          if (variante.id < 0) {
            await ProductoModel.eliminarVariante(variante.id * -1)

          } else if (variante.id === 0) {
            await ProductoModel.registrarVariante(
              id_producto,
              variante.id_variacion,
              variante
            );
          } else if (variante.id > 0) {
            await ProductoModel.modificarVariante(variante);
            
          }
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
    const ruta = path.join(__dirname, "..", "imagenesProductos", imagen.nombre);
    fs.unlink(ruta, (err) => {
      if (err) {
        console.error("Error al eliminar archivo:", err);
      }
    });
  });
  await ImagenModel.eliminarImagenes(id_producto);
}

async function eliminarProductoController(req, res) {
  const producto = req.body;
  const id_producto = producto.id_producto;
  try {
    if (!(await ProductoModel.obtenerProductoPorId(id_producto))[0]) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Producto no encontrado", producto: {} });
    }

    await eliminarImagenes(id_producto);

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

async function buscarPorNombreController(req, res) {
  const productos = await ProductoModel.buscarPorNombre(req.body);
  let resultados = [];
  for await (const producto of productos) {
    const resultado = await obtenerDatosProducto(producto);
    if (!resultado.ok) {
      console.error("Error en la búsqueda del producto:", resultado.error);
      return res.status(500).json({
        ok: false,
        mensaje: "Error del servidor",
        productos: {},
      });
    }

    resultados.push(resultado.datos);
  }

  res.json({
    ok: true,
    mensaje: "Productos encontrados",
    productos: resultados,
  });
  
}

async function obtenerPorAnimalYTipoController(req, res) {
  const productos = await ProductoModel.obtenerPorAnimalYTipo(
    req.body.objAnimal.id,
    req.body.objTipo.id
  );
  let resultados = [];

  for await (const producto of productos) {
    const resultado = await obtenerDatosProducto(producto);
    if (!resultado.ok) {
      console.error("Error en la búsqueda del producto:", resultado.error);
      return res.status(500).json({
        ok: false,
        mensaje: "Error del servidor",
        productos: {},
      });
    }

    resultados.push(resultado.datos);
  }

  res.json({
    ok: true,
    mensaje: "Productos encontrados",
    productos: resultados,
  });
}

async function obtenerPorAnimalController(req, res) {
  const productos = await ProductoModel.obtenerPorAnimal(req.body.id);
  let resultados = [];

  for await (const producto of productos) {
    const resultado = await obtenerDatosProducto(producto);
    if (!resultado.ok) {
      console.error("Error en la búsqueda del producto:", resultado.error);
      return res.status(500).json({
        ok: false,
        mensaje: "Error del servidor",
        productos: {},
      });
    }

    resultados.push(resultado.datos);
  }

  res.json({
    ok: true,
    mensaje: "Productos encontrados",
    productos: resultados,
  });
}



// async function obtenerProductoPorIdVarianteController(req, res) {
//   const productos = req.body.productos;
//   let resultados = [];

//   try {
//     for (const producto of productos) {
//       const resultado = await obtenerProductoPorIdVariante(producto.id_variante);
//       if (!resultado || resultado.length === 0) {
//         console.error("Producto no encontrado para id_variante:", producto.id_variante);

//       }
      
//       resultados.push(resultado[0]); 
//       console.log(resultados);
      
//     }

//     res.json({
//       ok: true,
//       mensaje: "Productos encontrados",
//       productos: resultados,
//     });
//   } catch (error) {
//     console.error("Error en la búsqueda del producto:", error);
//     res.status(500).json({
//       ok: false,
//       mensaje: "Error del servidor",
//       productos: [],
//     });
//   }
// }


async function obtenerVariantePorIdVarianteController(req, res) {
  const {id_variante} = req.body;
  

  try {
    
      const resultado = await obtenerVariantePorIdVariante(id_variante);
      if (!resultado || resultado.length === 0) {
      console.error("Variante no encontrada para id_variante:", id_variante);
      return res.status(404).json({
        ok: false,
        mensaje: "Variante no encontrada",
        productos: [],
      });
    }      
    

    res.json({
      ok: true,
      mensaje: "Variante encontrada",
      productos: [resultado[0]],
    });
  } catch (error) {
    console.error("Error en la búsqueda de la variante:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error del servidor",
      productos: [],
    });
  }
}

async function obtenerEmailsAvisoStockController(req, res) {

  try {
    const resultado = await ProductoModel.obtenerEmailsAvisoStock();
    if (!resultado || resultado.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: "No hay avisos pendientes",
        resultado: [],
      });
    }

    res.json({
      ok: true,
      mensaje: "Avisos encontrados",
      resultado: resultado,
    });
  } catch (error) {
    console.error("Error en la búsqueda de avisos:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error del servidor",
      resultado: [],
    });
  }
}

async function obtenerDatosProducto(producto) {
  try {
    let imagenes = await ImagenModel.obtenerImagenesPorIdProducto(
      producto.id_producto
    );
    let animal = await Animal.obtenerPorId(producto.id_animal);
    let marca = await Marca.obtenerPorId(producto.id_marca);
    let tipo_producto = await Tipo_Producto.obtenerPorId(producto.id_tipo);
    let variantes = await ProductoModel.obtenerVariantesPorIdProducto(
      producto.id_producto
    );
    let tipo_variante = null;
    let filtros = await ProductoModel.obtenerFiltrosPorIdProducto(
      producto.id_producto
    );

    if (variantes.length === 0) {
      variantes = [
        {
          id: 0,
          id_producto: 0,
          precio: "",
          stock: "",
          id_variacion: 0,
          valor_variacion: "",
        },
      ];
    } else {
      tipo_variante = await Tipo_Variante.obtenerPorId(
        variantes[0].id_variacion
      );
    }

    if (imagenes.length === 0) {
      imagenes = [
        {
          id: 0,
          id_producto: 0,
          nombre: "",
        },
      ];
    }

    if (filtros.length === 0) {
      filtros = [
        {
          id_filtro: 0,
          valor: "",
          nombre: "",
        },
      ];
    }

    return {
      ok: true,
      datos: {
        producto,
        animal,
        marca: marca[0],
        tipo_producto: tipo_producto[0],
        variantes,
        tipo_variante: tipo_variante ? tipo_variante[0] : null,
        imagenes,
        filtros,
      },
    };
  } catch (err) {
    return { ok: false, error: err };
  }
}

export {
  obtenerProductoPorIdController,
  registrarProductoCompletoController,
  modificarProductoController,
  eliminarProductoController,
  obtenerNombresController,
  obtenerTodosController,
  obtenerPorAnimalController,
  obtenerPorAnimalYTipoController,
  buscarPorNombreController,
  obtenerEnOfertaController,
  obtenerRecomendadosController,
  //obtenerProductoPorIdVarianteController,
  obtenerVariantePorIdVarianteController,
  obtenerDatosProducto,
  obtenerEmailsAvisoStockController,
};
