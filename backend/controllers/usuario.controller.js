const UsuarioModel = require('../models/usuario.model');


async function loginController(req, res) {
  try {
    const { usuario, contrasena } = req.body;
    const resultado = await UsuarioModel.login(usuario, contrasena);
    
    if (resultado.length === 0) {
      return res.json({ ok: false, mensaje: 'Usuario o contraseña incorrectos', usuario:{}});
    }

    res.json({ ok: true, mensaje: 'Login correcto', usuario:resultado[0]});
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', usuario:{}});
  }
}

async function obtenerPorUsuarioController(req, res) {
  try {
    const {usuario} = req.body;
    const resultado = await UsuarioModel.obtenerPorUsuario(usuario);
    
    if (resultado.length === 0) {
      return res.status(401).json({ok:false, mensaje: 'Usuario no encontrado', usuario:{}});
    }

    res.json({ ok: true, mensaje:"Usuario encontrado", usuario: resultado[0]});
  } catch (err) {
    console.error('Error en la busqueda del usuario:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', usuario:{} });
  }
}

async function registrarController(req, res) {
  try {
    await UsuarioModel.registrar(req.body);

    res.json({ ok: true, mensaje: 'Se ha realizado el registro con éxito', usuario:{} });    

  } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(401).json({ ok: false, mensaje: 'Usuario o email ya registrado', usuario:{} });
      }
      console.error('Error en el registro del usuario:', err);
      res.status(500).json({ ok: false,mensaje: 'Error del servidor',usuario:{} });
    }
    
  }



module.exports = { loginController,obtenerPorUsuarioController,registrarController };