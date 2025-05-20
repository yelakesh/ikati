const db = require("../database");

async function registrar(tipo) {
  const sql = `INSERT INTO tipo_producto (tipo) VALUES (?)`;
  const resultados = await db.query(sql, [tipo]);
  return resultados;
}

async function obtenerTodos() {
  const sql = `SELECT * FROM tipo_producto`;
  const resultados = await db.query(sql);
  return resultados;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM tipo_producto where id=?`;
  const resultados = await db.query(sql,[id]);
  return resultados;
}

async function modificar(objTipo_producto) {
  const sql = ` UPDATE tipo_producto set tipo=? WHERE id=?`;
  const resultados = await db.query(sql, [
    objTipo_producto.tipo,
    objTipo_producto.id,
  ]);
  return resultados;
}

async function eliminar(id) {
  const sql = "DELETE FROM tipo_producto WHERE id=?";
  const resultados = await db.query(sql, [id]);
  return resultados;
}

async function obtenerPorIdAnimal(id_animal) {
  const sql = `SELECT * FROM tipo_producto where id in (select id_tipo from productos where id_animal=?)`;
  const resultados = await db.query(sql, [id_animal]);
  return resultados;
}

module.exports = {
  registrar,
  obtenerTodos,
  eliminar,
  modificar,
  obtenerPorId,
  obtenerPorIdAnimal
};