const db= require('../database')

async function nuevoServicio({nombre, tipo, latitud, longitud, direccion, web}){
const sql =`INSERT INTO servicios
(nombre, tipo, latitud, longitud, direccion, web)
 VALUES (?, ?, ?, ?, ?, ?)`;
 const resultados = await db.query(sql, [nombre, tipo, latitud, longitud, direccion, web])
 return resultados;
}
module.exports = {
    nuevoServicio
   };