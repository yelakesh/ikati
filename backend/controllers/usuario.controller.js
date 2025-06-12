const UsuarioModel = require('../models/usuario.model');
const ProductoModel = require('../models/producto.model');
const ProductoController  = require('./productos.controller')


async function loginController(req, res) {
  const objUsuario = req.body
  try {

    const resultado = await UsuarioModel.login(objUsuario.usuario, objUsuario.contrasena);

    if (resultado.length === 0) {
      return res.json({ ok: false, mensaje: 'Usuario o contraseña incorrectos', usuario: {} });
    }

    resultado[0].rol = 'user'
    res.json({ ok: true, mensaje: 'Login correcto', usuario: resultado[0] });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', usuario: {} });
  }
}

async function comprobarPassController(req, res) {
  const objUsuario = req.body;
  try {

    const resultado = await UsuarioModel.comprobarPass(objUsuario.usuario, objUsuario.antigua);

    if (resultado.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos', usuario: {} });
    }

    

    
   
    const actualizado = await UsuarioModel.cambiarPass(objUsuario.usuario,objUsuario.nueva)


    if(!actualizado){
        return res.status(401).json({ ok: false, mensaje: 'No se pudo actualizar la contraseña', usuario: {} });
    }

    res.json({ ok: true, mensaje: "Contraseña cambiada con éxito", usuario: resultado[0] })
  } catch (err) {
    console.error('Error en la busqueda del admin:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', usuario: {} });
  }
}

async function obtenerPorUsuarioController(req, res) {
  const objUsuario = req.body;
  try {

    const resultado = await UsuarioModel.obtenerPorUsuario(objUsuario.usuario);

    if (resultado.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario no encontrado', usuario: {} });
    }

    res.json({ ok: true, mensaje: "Usuario encontrado", usuario: resultado[0] });
  } catch (err) {
    console.error('Error en la busqueda del usuario:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', usuario: {} });
  }
}
async function obtenerTodosController(req, res) {
  try {
    const resultado = await UsuarioModel.obtenerTodos();

    if (resultado.length === 0) {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Usuarios no encontrados", usuarios: {} });
    }

    res.json({
      ok: true,
      mensaje: "Usuarios encontrados",
      usuarios: resultado,
    });
  } catch (err) {
    console.error("Error en la busqueda del usuarios:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", usuario: {} });
  }
}

async function registrarController(req, res) {
  const objUsuario = req.body;
  try {
    await UsuarioModel.registrar(objUsuario);

    res.json({
      ok: true,
      mensaje: "Se ha realizado el registro con éxito",
      usuario: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("email")) {
        return res
          .status(401)
          .json({ ok: false, mensaje: "Email ya registrado", usuario: {} });
      }
      if (err.sqlMessage.includes("usuario")) {
        return res
          .status(401)
          .json({ ok: false, mensaje: "Usuario ya registrado", usuario: {} });
      }
      if (err.sqlMessage.includes("telefono")) {
        return res
          .status(401)
          .json({ ok: false, mensaje: "Teléfono ya registrado", usuario: {} });
      }
    }
    console.error("Error en el registro del usuario:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", usuario: {} });
  }
}

async function eliminarPorUsuarioController(req, res) {
  const objUsuario = req.body;
  try {
    const resultado = await UsuarioModel.eliminarPorUsuario(objUsuario.usuario);
    if (resultado.affectedRows == 0) {
      return res
        .status(404)
        .json({ ok: true, mensaje: "Usuario no encontrado", usuario: {} });
    }

    res.json({
      ok: true,
      mensaje: "El usuario se ha eliminado con éxito",
      usuario: {},
    });
  } catch (err) {
    console.log(resultado);
    res
      .status(500)
      .json({ ok: true, mensaje: "Error en el servidor", usuario: {} });
  }
}

async function modificarPorUsuarioController(req, res) {
  const objUsuario = req.body;
  try {
    const resultado = await UsuarioModel.modificarPorUsuario(objUsuario);
    if (resultado.affectedRows == 0) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Usuario no encontrado", usuario: {} });
    }
    res.json({
      ok: true,
      mensaje: "Se ha realizado la modificación con éxito",
      usuario: {},
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(401)
        .json({ ok: false, mensaje: "Email ya registrado", usuario: {} });
    }
    console.error("Error en la modificación del usuario:", err);
    res
      .status(500)
      .json({ ok: false, mensaje: "Error del servidor", usuario: {} });
  }
}

async function obtenerComprasConProductosPorIdUsuarioController(req, res) {
  const  id_usuario  = req.body.idUsuario;
  const resultado = [];

  try {
    const compras = await UsuarioModel.obtenerComprasPorIdUsuario(id_usuario);
    
    for (let i = 0; i < compras.length; i++) {
      const compra = compras[i];
      const variantesRaw = await UsuarioModel.obtenerVariantesPorIdCompra(
        compra.id
      );

      const variantes = await Promise.all(
        variantesRaw.map(async (v) => {
          const variante = (
            await ProductoModel.obtenerVariantePorIdVariante(v.id_variante)
          )[0];
          return {
            id: variante.id,
            id_producto: variante.id_producto,
            precio: variante.precio,
            stock: variante.stock,
            id_variacion: variante.id_variacion,
            valor_variacion: variante.valor_variacion,
            cantidad: v.cantidad,
          };
        })
      );

      const productos = [];

      for (let variante of variantes) {
        const existente = productos.find(
          (p) => p.producto.producto.id_producto === variante.id_producto
        );
        if (existente) {
          existente.variantes.push(variante);
        } else {
          let producto = (
            await ProductoModel.obtenerProductoPorId(variante.id_producto)
          )[0];
          producto = (await ProductoController.obtenerDatosProducto(producto))
            .datos;

          productos.push({
            producto: producto,
            variantes: [variante],
          });
        }
      }

      const compraConProductos = {
        ...compra,
        productos: productos,
      };

      resultado.push({
        compra: compraConProductos,
      });
    }

    res.json({
      ok: true,
      mensaje: "Compras con productos obtenidas correctamente",
      resultado: resultado,
    });
  } catch (error) {
    console.error("Error al obtener las compras con productos:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error del servidor",
      resultado: [],
    });
  }
}

module.exports = {
  loginController,
  obtenerPorUsuarioController,
  registrarController,
  eliminarPorUsuarioController,
  modificarPorUsuarioController,
  obtenerTodosController,
  comprobarPassController,
  obtenerComprasConProductosPorIdUsuarioController,
};