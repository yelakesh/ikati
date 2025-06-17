const db = require("../database");

async function registrar(tipo) {
  const sql = `INSERT INTO tipos_variacion (tipo) VALUES ($1) RETURNING *`;
  const resultados = await db.query(sql, [tipo]);
  return resultados.rows;
}

async function obtenerTodos() {
  const sql = `SELECT * FROM tipos_variacion`;
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM tipos_variacion WHERE id = $1`;
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

async function modificar(objTipo_variacion) {
  const sql = `UPDATE tipos_variacion SET tipo = $1 WHERE id = $2 RETURNING *`;
  const resultados = await db.query(sql, [
    objTipo_variacion.tipo,
    objTipo_variacion.id,
  ]);
  return resultados.rows;
}

async function eliminar(id) {
  const sql = `DELETE FROM tipos_variacion WHERE id = $1 RETURNING *`;
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
