const db= require('../database')

async function anadiraCarro({id_usuario, id_variante, cantidad}){
const sql =`INSERT INTO carro (id_usuario, id_variante, cantidad)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE cantidad = cantidad + VALUES(cantidad);`;
 const resultados = await db.query(sql, [id_usuario, id_variante, cantidad])
 return resultados;
}
 module.exports = {
   anadiraCarro
 };