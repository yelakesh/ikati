const db= require('../database')

async function nuevoCupon({codigo, activo, descuento, tipo_descuento, fecha_expiracion}){
const sql =`INSERT INTO cupones
(codigo,activo,descuento,tipo_descuento,fecha_expiracion)
 VALUES (?, ?, ?, ?, ?)`;
 const resultados = await db.query(sql, [codigo, activo,descuento,tipo_descuento, fecha_expiracion])
 return resultados;
}
module.exports = {
   nuevoCupon
  };