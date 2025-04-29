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
module.exports = { nuevoServicioController };