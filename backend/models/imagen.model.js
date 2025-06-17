const db = require("../database");

async function obtenerImagenesPorIdProducto(id_producto) {
  const sql = `SELECT * FROM imagenes WHERE id_producto = $1`;
  const resultados = await db.query(sql, [id_producto]);
  return resultados.rows;
}

async function eliminarImagenes(id_producto) {
  const sql = `DELETE FROM imagenes WHERE id_producto = $1`;
  const resultados = await db.query(sql, [id_producto]);
  return resultados.rows;
}

async function registrarImagen(id_producto, nombre) {
  const sql = `
    INSERT INTO imagenes (id_producto, nombre) 
    VALUES ($1, $2)
  `;
  const resultados = await db.query(sql, [id_producto, nombre]);
  return resultados.rows;
}

module.exports = {
  registrarImagen,
  eliminarImagenes,
  obtenerImagenesPorIdProducto,
};
