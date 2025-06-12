const db= require('../database')

async function anadiraCarro({id_usuario, id_variante, cantidad}){
const sql =`INSERT INTO carro (id_usuario, id_variante, cantidad)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE cantidad = cantidad + VALUES(cantidad);`;
 const [resultados] = await db.query(sql, [id_usuario, id_variante, cantidad]);
 return resultados;
}
async function eliminarDeCarroPorIdVariante(id_variante) {
   const sql = 'DELETE FROM carro WHERE id_variante=?';
   const [resultados] = await db.query(sql, [id_variante]);
   return resultados;
 }

async function restarStockVariante(objVariante) {
  const sql = `UPDATE variantes set stock=(stock-?) where id = ?;`;
  const [resultados] = await db.query(sql, [
    objVariante.cantidad,
    objVariante.id_variante,
  ]);
  return resultados;
}
async function sumarStockVariante(objVariante) {
  const sql = `UPDATE variantes set stock=(stock+?) where id = ?;`;
  const [resultados] = await db.query(sql, [
    objVariante.cantidad, objVariante.id
  ]);  
  return resultados;
}

async function obtenerVariantesCarritoPorIdUsuario(id_usuario) {
  const sql = `SELECT * FROM carro where id_usuario=?`;
  const [resultados] = await db.query(sql, [id_usuario]);
  return resultados;
}

async function insertarCompra(objCompra) {
  const sql = `INSERT INTO compra (id_usuario,fecha,id_cupon,importe) VALUES (?,?,?,?) `;
  const [resultado] = await db.query(sql, [objCompra.idUsuario,new Date(),objCompra.idCupon,objCompra.importe]);
  
  return resultado.insertId;
}

async function insertarCompra_producto(idCompra,variante) {
  const sql = `INSERT INTO compra_producto (id_compra,id_variante,cantidad,descuento,precio) VALUES (?,?,?,?,?) `;
  const [resultado] = await db.query(sql, [idCompra,variante.id,variante.cantidad,0,variante.precio]);  
  return resultado;
}

async function eliminarDeCarroPorIdUsuario(idUsuario){
  const sql = `DELETE from carro where id_usuario=? `;

  const [resultado] = await db.query(sql, [idUsuario ]);
  return resultado;
}


 module.exports = {
   anadiraCarro,
   obtenerVariantesCarritoPorIdUsuario,
   restarStockVariante,
   sumarStockVariante,
   eliminarDeCarroPorIdVariante,
   insertarCompra,
   insertarCompra_producto,
   eliminarDeCarroPorIdUsuario,
 };