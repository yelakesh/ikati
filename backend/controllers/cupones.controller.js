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

async function modificarPorCodigoController(req,res){
    const objCupon = req.body;

    try {


        const resultado= await CuponModel.modificarPorCodigo(objCupon);

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                ok: false, 
                mensaje: 'Error: Código no encontrado', 
                cupon:{}
            })
        }
        res.json({
            ok:true, 
            mensaje: 'Felisitasiones: Cupón modificado', 
            cupon: {}})

    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(401).json({
                ok: false,
                mensaje: 'Error: Cupón ya existente',
                usuario:{}
            })
        }
        console.error('Error en la modificación del cupón: ', error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error del servidor',
            usuario:{}
        })
    }}
    async function obtenerPorCodigoController(req, res) {
      const objCupon = req.body;

      try {
    
        const resultado = await CuponModel.obtenerPorCodigo(objCupon.codigo);
    
        if (resultado.length === 0) {
          return res.status(401).json({ ok: false, mensaje: 'Cupón no encontrado', cupon: {} });
        }
    
        res.json({ ok: true, mensaje: "Cupón encontrado", cupon: resultado[0] });
      } catch (err) {
        console.error('Error en la busqueda del cupón:', err);
        res.status(500).json({ ok: false, mensaje: 'Error del servidor', cupon: {} });
      }
    }

    async function eliminarPorCodigoController(req, res) {
      const objCupon = req.body
      try {
        const resultado = await CuponModel.eliminarPorCodigo(objCupon.codigo);
        if (resultado.affectedRows == 0) {
          return res.status(404).json({ ok: true, mensaje: 'Cupón no encontrado', cupon: {} })
        }
    
        res.json({ ok: true, mensaje: 'El cupón se ha eliminado con éxito', cupon: {} })
    
      } catch (err) {
        console.log(resultado)
        res.status(500).json({ ok: true, mensaje: 'Error en el servidor', cupon: {} })
      }
    }
  module.exports = { nuevoCuponController, modificarPorCodigoController, obtenerPorCodigoController, eliminarPorCodigoController };
  

