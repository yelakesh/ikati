const db = require("../database");

async function registrar(tipo) {
  const sql = `INSERT INTO tipos_filtro (nombre) VALUES ($1) RETURNING *`;
  const resultados = await db.query(sql, [tipo]);
  return resultados.rows;
}

async function obtenerTodos() {
  const sql = `SELECT * FROM tipos_filtro`;
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM tipos_filtro WHERE id = $1`;
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

async function modificar(objTipo_Filtro) {
  const sql = `UPDATE tipos_filtro SET nombre = $1 WHERE id = $2 RETURNING *`;
  const resultados = await db.query(sql, [
    objTipo_Filtro.nombre,
    objTipo_Filtro.id,
  ]);
  return resultados.rows;
}

async function eliminar(id) {
  const sql = "DELETE FROM tipos_filtro WHERE id = $1 RETURNING *";
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

module.exports = {
  registrar,
  obtenerTodos,
  eliminar,
  modificar,
  obtenerPorId,
};
