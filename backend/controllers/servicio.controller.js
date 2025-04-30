const ServicioModel = require('../models/servicio.model');

async function nuevoServicioController(req, res) {
    const objServicio = req.body;

    try {
        await ServicioModel.nuevoServicio(objServicio);

        return res.json({ ok: true, mensaje: 'Servicio registrado con éxito', servicio: {} })
    } catch (error) {

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                ok: false,
                mensaje: 'El servicio ya existe. Intenta de nuevo',
                servicio: {}

            });
        }

        console.error(error)
        res.status(500).json({
            ok: false,
            mensaje: 'Error del servidor',
            servicio: {}
        })
    }
}
async function modificarPorNombreController(req, res) {
  const objUsuario = req.body
  try {
    const resultado = await ServicioModel.modificarPorNombre(objUsuario);
    if (resultado.affectedRows == 0) {
      return res.status(404).json({ ok: false, mensaje: 'Servicio no encontrado', servicio: {} })
    }
    res.json({ ok: true, mensaje: 'Se ha realizado la modificación con éxito', servicio: {} });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(401).json({ ok: false, mensaje: 'Email ya registrado', servicio: {} });
    }
    console.error('Error en la modificación del usuario:', err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor', servicio: {} });
  }

}
    async function obtenerPorNombreController(req, res) {
      const objServicio = req.body;

      try {
    
        const resultado = await ServicioModel.obtenerPorNombre(objServicio.nombre);
    
        if (resultado.length === 0) {
          return res.status(404).json({ ok: false, mensaje: 'Servicio no encontrado', servicio: {} });
        }
    
        res.json({ ok: true, mensaje: "Servicio encontrado", servicio: resultado[0] });
      } catch (err) {
        console.error('Error en la busqueda del Servicio:', err);
        res.status(500).json({ ok: false, mensaje: 'Error del servidor', servicio: {} });
      }
    }
        async function eliminarPorNombreController(req, res) {
          const objServicio = req.body
          try {
            const resultado = await ServicioModel.eliminarPorNombre(objServicio.nombre);
            if (resultado.affectedRows == 0) {
              return res.status(404).json({ ok: true, mensaje: 'Servicio no encontrado', servicio: {} })
            }
        
            res.json({ ok: true, mensaje: 'El servicio se ha eliminado con éxito', servicio: {} })
        
          } catch (err) {
            console.log(resultado)
            res.status(500).json({ ok: true, mensaje: 'Error en el servidor', servicio: {} })
          }
        }
module.exports = { nuevoServicioController, modificarPorNombreController, obtenerPorNombreController, eliminarPorNombreController };