const adminModel = require('../models/admin.model');



async function loginController(req, res) {
  const objAdmin = req.body
  try {

    const resultado = await adminModel.login(objAdmin.admin, objAdmin.contrasena);

    if (resultado.length === 0) {
      return res.json({ ok: false, mensaje: 'admin o contraseña incorrectos', admin: {} });
    }

    res.json({ ok: true, mensaje: 'Login correcto', admin: resultado[0] });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', admin: {} });
  }
}

async function comprobarPassController(req, res) {
  const objAdmin = req.body;
  try {

    const resultado = await adminModel.comprobarPass(objAdmin.usuario, objAdmin.antigua);

    if (resultado.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos', admin: {} });
    }

    

    
   
    const actualizado = await adminModel.cambiarPass(objAdmin.usuario,objAdmin.nueva)


    if(!actualizado){
        return res.status(401).json({ ok: false, mensaje: 'No se pudo actualizar la contraseña', admin: {} });
    }

    res.json({ ok: true, mensaje: "Contraseña cambiada con éxito", admin: resultado[0] })
  } catch (err) {
    console.error('Error en la busqueda del admin:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', admin: {} });
  }
}

async function crearAdminController(req, res) {
  const objAdmin = req.body;
  try {
    await adminModel.crearAdmin(objAdmin);

    res.json({ ok: true, mensaje: 'Se ha realizado el registro con éxito', admin: {} });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      
      if (err.sqlMessage.includes("admin")) {
        return res.status(401).json({ ok: false, mensaje: 'admin ya registrado', admin: {} })
      }
     
      
    }
    console.error('Error en el registro del admin:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', admin: {} });
  }

}

async function eliminarAdminController(req, res) {
  const objAdmin = req.body
  try {
    const resultado = await adminModel.eliminarAdmin(objAdmin.usuario);
    if (resultado.affectedRows == 0) {
      return res.status(404).json({ ok: true, mensaje: 'Admin no encontrado', admin: {} })
    }

    res.json({ ok: true, mensaje: 'El admin se ha eliminado con éxito', admin: {} })

  } catch (err) {
    console.log(resultado)
    res.status(500).json({ ok: true, mensaje: 'Error en el servidor', admin: {} })
  }
}



module.exports = { loginController, comprobarPassController, crearAdminController, eliminarAdminController};