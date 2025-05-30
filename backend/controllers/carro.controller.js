const CarroModel = require('../models/carro.model');

async function anadiraCarroController(req, res) {
    const objCarro = req.body;

    try {
        await CarroModel.anadiraCarro(objCarro);

        return res.json({ ok: true, mensaje: 'Producto añadido al carrito con éxito', carro: {} });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                ok: false,
                mensaje: 'Este producto ya está en el carrito. Intenta con otro producto.',
                carro: {}
            });
        }

        console.error('Error al registrar el producto:', error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error del servidor',
            carro: {}
        });
    }
}

module.exports = {
    anadiraCarroController
};
