const avisarStockModel = require('../models/avisarStock.model');

async function anadiraAvisarController(req, res) {
    const objAvisarStock = req.body;
    

    try {
        await avisarStockModel.anadiraAvisar(objAvisarStock);

        return res.json({ ok: true, mensaje: 'Hecho,recibirás un email cuando repongamos el producto', AvisarStock: {} });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                ok: false,
                mensaje: 'Ya tienes una alerta programada para este producto',
                AvisarStock: {}
            });
        }

        console.error('Error al registrar el aviso:', error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error del servidor',
            AvisarStock: {}
        });
    }
}

module.exports = {
    anadiraAvisarController
};