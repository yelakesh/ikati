const CarroModel = require("../models/carro.model");
const ProductoModel = require("../models/producto.model");
const ProductoController = require("./productos.controller")

async function anadiraCarroController(req, res) {
  const objCarro = req.body;

  try {
    await CarroModel.anadiraCarro(objCarro);

    return res.json({
      ok: true,
      mensaje: "Producto añadido al carrito con éxito",
      carro: {},
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        mensaje:
          "Este producto ya está en el carrito. Intenta con otro producto.",
        carro: {},
      });
    }

    console.error("Error al registrar el producto:", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error del servidor",
      carro: {},
    });
  }
}

async function obtenerProductosCarritoPorIdUsuarioController(req, res) {
  const objCarro = req.body;
  var variantes = [];

  try {
    const carro = await CarroModel.obtenerVariantesCarritoPorIdUsuario(
      objCarro.id_usuario
    );

    for (let i = 0; i < carro.length; i++) {
      const variante = (
        await ProductoModel.obtenerVariantePorIdVariante(carro[i].id_variante)
      )[0];
      variantes.push({
        id: variante.id,
        id_producto: variante.id_producto,
        precio: variante.precio,
        stock: variante.stock,
        id_variacion: variante.id_variacion,
        id_variacion: variante.id_variacion,
        valor_variacion: variante.valor_variacion,
        cantidad: carro[i].cantidad,
      });
    }
    var resultados = [];

    
    if (variantes.length > 0) {
      var producto = (
        await ProductoModel.obtenerProductoPorId(variantes[0].id_producto)
      )[0];
      producto = (await ProductoController.obtenerDatosProducto(producto)).datos
      
      resultados.push({
        producto: producto,
        variantes: [variantes[0]],
      });

      for (let i = 1; i < variantes.length; i++) {
        if (
          resultados.some((x) => {
            return x.producto.producto.id_producto == variantes[i].id_producto;
          })
        ) {
            var posicion= resultados.findIndex((x) => x.producto.producto.id_producto == variantes[i].id_producto)
            resultados[posicion].variantes.push(variantes[i]);
            
        } else {
          var producto = (await ProductoModel.obtenerProductoPorId(
            variantes[i].id_producto
          ))[0];
          producto = (await ProductoController.obtenerDatosProducto(producto))
            .datos;
          
          resultados.push({ producto: producto, variantes: [variantes[i]] });
        }
      }
    }

    res.json({
      ok: true,
      mensaje: "Productos encontrados",
      productos: resultados,
    });
  } catch (error) {
    console.error("Error en la búsqueda del producto:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error del servidor",
      productos: [],
    });
  }
}

module.exports = {
  anadiraCarroController,
  obtenerProductosCarritoPorIdUsuarioController,
};
