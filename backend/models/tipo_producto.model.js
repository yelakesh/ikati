const db = require("../database");

async function registrar(tipo) {
  const sql = `INSERT INTO tipo_producto (tipo) VALUES ($1) RETURNING *`;
  const resultados = await db.query(sql, [tipo]);
  return resultados.rows;
}

async function obtenerTodos() {
  const sql = `SELECT * FROM tipo_producto`;
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM tipo_producto WHERE id=$1`;
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

async function modificar(objTipo_producto) {
  const sql = `UPDATE tipo_producto SET tipo=$1 WHERE id=$2 RETURNING *`;
  const resultados = await db.query(sql, [
    objTipo_producto.tipo,
    objTipo_producto.id,
  ]);
  return resultados.rows;
}

async function eliminar(id) {
  const sql = "DELETE FROM tipo_producto WHERE id=$1 RETURNING *";
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

async function obtenerPorIdAnimal(id_animal) {
  const sql = `SELECT * FROM tipo_producto WHERE id IN (SELECT id_tipo FROM productos WHERE id_animal=$1)`;
  const resultados = await db.query(sql, [id_animal]);
  return resultados.rows;
}

async function obtenerFiltroPorIdAnimal(id_animal) {
  const sql = `SELECT t.*, p.id_producto FROM tipo_producto t JOIN productos p ON t.id=p.id_tipo WHERE t.id IN (SELECT id_tipo FROM productos WHERE id_animal=$1)`;
  const resultados = await db.query(sql, [id_animal]);
  return resultados.rows;
}

module.exports = {
  registrar,
  obtenerTodos,
  eliminar,
  modificar,
  obtenerPorId,
  obtenerPorIdAnimal,
  obtenerFiltroPorIdAnimal,
};
