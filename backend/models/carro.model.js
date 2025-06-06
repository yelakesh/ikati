const db= require('../database')

async function anadiraCarro({id_usuario, id_variante, cantidad}){
const sql =`INSERT INTO carro (id_usuario, id_variante, cantidad)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE cantidad = cantidad + VALUES(cantidad);`;
 const resultados = await db.query(sql, [id_usuario, id_variante, cantidad])
 return resultados;
}

async function obtenerVariantesCarritoPorIdUsuario(id_usuario) {
  const sql = `SELECT * FROM carro where id_usuario=?`;
  const resultados = await db.query(sql, [id_usuario]);
  return resultados;
}
 module.exports = {
   anadiraCarro,
   obtenerVariantesCarritoPorIdUsuario
 };