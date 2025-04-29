const ProductoModel = require('../models/producto.model')

async function obtenerProductoCompletoController(req, res) {
    const objProducto = req.body

    try {

        let producto = await ProductoModel.obtenerProductoPorNombre(objProducto.nombre)

        if (producto.length === 0) {
            return res.status(401).json({ ok: false, mensaje: 'Producto no encontrado', producto: {} })
        }
        let filtros = await ProductoModel.obtenerFiltrosPorIdProducto(producto[0].id)
        let variantes = await ProductoModel.obtenerVariantesPorIdProducto(producto[0].id)
        let imagenes = await ProductoModel.obtenerImagenesPorIdProducto(producto[0].id)
        let nombre_variacion = ''

        if (filtros.length === 0) {
            filtros = [{
                filtro: '',
                valor: ''
            }]
        }

        if (variantes.length === 0) {

            variantes = [{
                valor_variacion: '',
                precio: '',
                stock: ''
            }]
        }
        else { nombre_variacion = variantes[0].nombre_variacion }

        if (imagenes.length === 0) {
            imagenes = [{
                url: ''
            }]
        }

        res.json({
            ok: true,
            mensaje: "Producto encontrado",
            producto: producto[0],
            nombre_variacion: nombre_variacion,
            filtros: filtros,
            variantes: variantes,
            imagenes: imagenes
        })

    } catch (err) {
        console.error('Error en la busqueda del producto:', err)
        return res.status(500).json({ ok: false, mensaje: 'Error del servidor', producto: {} })
    }
}
async function registrarProductoCompletoController(req, res) {
    let objProducto = req.body
    try {
        await ProductoModel.registrarProducto(objProducto)
        
        let id_producto=(await ProductoModel.obtenerProductoPorNombre(objProducto.nombre))[0].id

        try {
            let filtros = objProducto.filtros
            filtros.forEach(async filtro => {
                await ProductoModel.registrarFiltro(id_producto, filtro)
            })

        } catch (err) {
            console.error('Error en el registro del filtro:', err)
            return res.status(500).json({ ok: false, mensaje: 'Error del servidor', filtro: {} })
        }

        try {
            let variantes = objProducto.variantes

            variantes.forEach(async variante => {
                await ProductoModel.registrarVariante(id_producto,objProducto.nombre_variacion, variante)
                await ProductoModel.registrarFiltro(id_producto, { filtro: objProducto.nombre_variacion, valor: variante.valor_variacion })
            })

        } catch (err) {
            console.error('Error en el registro de la variante:', err)
            return res.status(500).json({ ok: false, mensaje: 'Error del servidor', variante: {} })
        }

        try {
            let imagenes = objProducto.imagenes

            imagenes.forEach(async imagen => {
                await ProductoModel.registrarImagen(id_producto, imagen)
            })

        } catch (err) {
            console.error('Error en el registro de la imagen:', err)
            return res.status(500).json({ ok: false, mensaje: 'Error del servidor', imagen: {} })
        }
        res.json({ ok: true, mensaje: 'Se ha realizado el registro con éxito', producto: {} })

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            if (err.sqlMessage.includes("nombre")) {
                return res.status(401).json({ ok: false, mensaje: 'Nombre ya registrado', producto: {} })
            }

        }
        console.error('Error en el registro del producto:', err)
        res.status(500).json({ ok: false, mensaje: 'Error del servidor', producto: {} })
    }

}



/*

async function eliminarPorUsuarioController(req, res) {
  const objUsuario = req.body
  try {
    const resultado = await ProductoModel.eliminarPorUsuario(objUsuario.usuario)
    if (resultado.affectedRows == 0) {
      return res.status(404).json({ ok: true, mensaje: 'Usuario no encontrado', usuario: {} })
    }

    res.json({ ok: true, mensaje: 'El usuario se ha eliminado con éxito', usuario: {} })

  } catch (err) {
    console.log(resultado)
    res.status(500).json({ ok: true, mensaje: 'Error en el servidor', usuario: {} })
  }
}

async function modificarPorUsuarioController(req, res) {
  const objUsuario = req.body
  try {
    const resultado = await ProductoModel.modificarPorUsuario(objUsuario)
    if (resultado.affectedRows == 0) {
      return res.status(404).json({ ok: true, mensaje: 'Usuario no encontrado', usuario: {} })
    }
    res.json({ ok: true, mensaje: 'Se ha realizado la modificación con éxito', usuario: {} })

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(401).json({ ok: false, mensaje: 'Email ya registrado', usuario: {} })
    }
    console.error('Error en la modificación del usuario:', err)
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', usuario: {} })
  }

}
*/
module.exports = { obtenerProductoCompletoController,registrarProductoCompletoController }