const CarroModel = require("../models/carro.model");
const ProductoModel = require("../models/producto.model");
const ProductoController = require("./productos.controller")

async function anadiraCarroController(req, res) {
  const objCarro = req.body;

  try {
    await CarroModel.anadiraCarro(objCarro);
    await CarroModel.restarStockVariante(objCarro);

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

 async function eliminarDeCarroController(req, res) {
   const id = req.body.id_variante;
   const cantidad = req.body.unidades
   
   try {
     const resultado = await CarroModel.eliminarDeCarroPorIdVariante(id);
     await CarroModel.sumarStockVariante({id:id,cantidad:cantidad});

     if (resultado.affectedRows == 0) {
       return res
         .status(404)
         .json({ ok: true, mensaje: "Producto no encontrado", carro: {} });
     }
 
     res.json({
       ok: true,
       mensaje: "El producto se ha eliminado del carrito con éxito",
       carro: {},
     });
   } catch (err) {
     
     res
       .status(500)
       .json({ ok: true, mensaje: "Error en el servidor", carro: {} });
   }
 }


 async function completarCompraController(req,res){
  
  const objCompra = req.body;
  
  
  try {
    const idCompra=await CarroModel.insertarCompra(objCompra)
    
  objCompra.variantes.forEach(variante => {
    CarroModel.insertarCompra_producto(idCompra,variante)
  });

  CarroModel.eliminarDeCarroPorIdUsuario(objCompra.idUsuario)

  res.json({
    ok: true,
    mensaje: "Compra realizada con éxito",
    carro: {},
  });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: "Error en la compra",
      carro: {},
    });
  }
  

 }


module.exports = {
  anadiraCarroController,
  obtenerProductosCarritoPorIdUsuarioController,
  eliminarDeCarroController,
  completarCompraController,
};
