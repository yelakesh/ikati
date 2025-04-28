const CuponModel = require('../models/cupones.model');

async function nuevoCuponController(req, res) {
    const objCupon = req.body;

    try {
        await CuponModel.nuevoCupon(objCupon);

        res.json({ ok: true, mensaje: 'Cupón registrado con éxito', cupon: {} })
    } catch (error) {

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                ok: false,
                mensaje: 'El código de este cupón ya existe. Intenta de nuevo',
                cupon: {}

            })
        }
    }
    console.error('Error al registrar el cupon:', error)
    res.status(500).json({
        ok:false,
        mensaje: 'Error del servidor',
        cupon:{}
    })
}
module.exports = { nuevoCuponController };
