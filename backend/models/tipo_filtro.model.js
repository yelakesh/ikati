const db = require("../database");

async function registrar(tipo) {
  const sql = `INSERT INTO tipos_filtro (nombre) VALUES (?)`;
  const [resultados] = await db.query(sql, [tipo]);
  return resultados;
}

async function obtenerTodos() {
  const sql = `SELECT * FROM tipos_filtro`;
  const [resultados] = await db.query(sql);
  return resultados;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM tipos_filtro where id=?`;
  const [resultados] = await db.query(sql,[id]);
  return resultados;
}

async function modificar(objTipo_Filtro) {
  const sql = ` UPDATE tipos_filtro set tipo=? WHERE id=?`;
  const [resultados] = await db.query(sql, [
    objTipo_Filtro.nombre,
    objTipo_Filtro.id,
  ]);
  return resultados;
}

async function eliminar(id) {
  const sql = "DELETE FROM tipos_filtro WHERE id=?";
  const [resultados] = await db.query(sql, [id]);
  return resultados;
}

module.exports = {
  registrar,
  obtenerTodos,
  eliminar,
  modificar,
  obtenerPorId
};