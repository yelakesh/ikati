const UsuarioModel = require('../models/usuario.model');


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

async function registrarController(req, res) {
  const objUsuario = req.body;
  try {
    await UsuarioModel.registrar(objUsuario);

    res.json({ ok: true, mensaje: 'Se ha realizado el registro con éxito', usuario: {} });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.sqlMessage.includes("email")) {
        return res.status(401).json({ ok: false, mensaje: 'Email ya registrado', usuario: {} })
      }
      if (err.sqlMessage.includes("usuario")) {
        return res.status(401).json({ ok: false, mensaje: 'Usuario ya registrado', usuario: {} })
      }
      if (err.sqlMessage.includes("telefono")) {
        return res.status(401).json({ ok: false, mensaje: 'Teléfono ya registrado', usuario: {} })
      }
     
      
    }
    console.error('Error en el registro del usuario:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', usuario: {} });
  }

}

async function eliminarPorUsuarioController(req, res) {
  const objUsuario = req.body
  try {
    const resultado = await UsuarioModel.eliminarPorUsuario(objUsuario.usuario);
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
    const resultado = await UsuarioModel.modificarPorUsuario(objUsuario);
    if (resultado.affectedRows == 0) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado', usuario: {} })
    }
    res.json({ ok: true, mensaje: 'Se ha realizado la modificación con éxito', usuario: {} });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(401).json({ ok: false, mensaje: 'Email ya registrado', usuario: {} });
    }
    console.error('Error en la modificación del usuario:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', usuario: {} });
  }

}

module.exports = { loginController, obtenerPorUsuarioController, registrarController, eliminarPorUsuarioController, modificarPorUsuarioController };