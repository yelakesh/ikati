const db = require("../database");

async function obtenerImagenesPorIdProducto(id_producto) {
  const sql = `SELECT * FROM imagenes where id_producto=?`;
  const [resultados] = await db.query(sql, [id_producto]);
  return resultados;
}

async function eliminarImagenes(id_producto) {
  const sql = "DELETE FROM imagenes WHERE id_producto=?";
  const [resultados] = await db.query(sql, [id_producto]);
  return resultados;
}

async function registrarImagen(id_producto, nombre) {
  const sql = `INSERT INTO imagenes 
      (id_producto,nombre) 
      VALUES (?, ?)`;
  const [resultados] = await db.query(sql, [id_producto, nombre]);
  return resultados;
}

module.exports = {
  registrarImagen,
  eliminarImagenes,
  obtenerImagenesPorIdProducto
};
