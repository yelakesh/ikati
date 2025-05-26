const db = require("../database");

async function registrar(objMarca) {
  const sql = `INSERT INTO marcas (nombre,imagen) VALUES (?,?)`;
  const resultados = await db.query(sql, [objMarca.nombre,objMarca.imagen]);
  return resultados;
}

async function obtenerTodo() {
  const sql = `SELECT * FROM marcas`;
  const resultados = await db.query(sql);
  return resultados;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM marcas where id=?`;
  const resultados = await db.query(sql,[id]);
  return resultados;
}

async function modificar(objMarca) {
  const sql = ` UPDATE marcas set nombre=?,imagen=? WHERE id=?`;
  const resultados = await db.query(sql, [objMarca.nombre,objMarca.imagen, objMarca.id]);
  return resultados;
}

async function eliminarPorId(id) {
  const sql = "DELETE FROM marcas WHERE id=?";
  const resultados = await db.query(sql, [id]);
  return resultados;
}

module.exports = {
  registrar,
  obtenerPorId,
  eliminarPorId,
  modificar,
  obtenerTodo,
};