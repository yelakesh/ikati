const UsuarioModel = require('../models/usuario.model');


async function loginController(req, res) {
  try {
    const { usuario, contrasena } = req.body;
    const resultado = await UsuarioModel.login(usuario, contrasena);
    
    if (resultado.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    res.json({ mensaje: 'Login correcto', id: resultado[0].id });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

async function obtenerPorUsuarioController(req, res) {
  try {
    const {usuario} = req.body;
    const resultado = await UsuarioModel.obtenerPorUsuario(usuario);
    
    if (resultado.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({mensaje:"Usuario encontrado", usuario: resultado[0]});
  } catch (err) {
    console.error('Error en la busqueda del usuario:', err);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}



module.exports = { loginController,obtenerPorUsuarioController };