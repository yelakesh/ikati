const db= require('../database')

async function obtenerTodos() {
  const sql = "SELECT * FROM servicios";
  const [resultados] = await db.query(sql);
  return resultados;
}
async function nuevoServicio({nombre, tipo, latitud, longitud, direccion, web}){
const sql =`INSERT INTO servicios
(nombre, tipo, latitud, longitud, direccion, web)
 VALUES (?, ?, ?, ?, ?, ?)`;
 const [resultados] = await db.query(sql, [nombre, tipo, latitud, longitud, direccion, web]);
 return resultados;
}
  async function modificarPorNombre({nombre, tipo, latitud,longitud, direccion, web}) {
    const sql = 'UPDATE servicios set tipo=?, latitud=?, longitud=?, direccion=?, web=? WHERE nombre=?';
    const [resultados] = await db.query(sql, [tipo, latitud, longitud, direccion, web, nombre]);
    return resultados;
  }
  async function obtenerPorNombre(nombre) {
     const sql = 'SELECT * FROM servicios WHERE nombre=?';
     const [resultados] = await db.query(sql, [nombre]);
     return resultados;
   }
    async function eliminarPorNombre(nombre) {
      const sql = 'DELETE FROM servicios WHERE nombre=?';
      const [resultados] = await db.query(sql, [nombre]);
      return resultados;
    }
module.exports = {
    obtenerTodos,
    nuevoServicio,
    modificarPorNombre,
    obtenerPorNombre,
    eliminarPorNombre
   };