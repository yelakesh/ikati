const db = require("../database");

async function registrar(tipo) {
  const sql = `INSERT INTO tipos_variacion (tipo) VALUES (?)`;
  const [resultados] = await db.query(sql, [tipo]);
  return resultados;
}

async function obtenerTodos() {
  const sql = `SELECT * FROM tipos_variacion`;
  const [resultados] = await db.query(sql);
  return resultados;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM tipos_variacion where id=?`;
  const [resultados] = await db.query(sql, [id]);
  return resultados;
}


async function modificar(objTipo_variacion) {
  const sql = ` UPDATE tipos_variacion set tipo=? WHERE id=?`;
  const [resultados] = await db.query(sql, [
    objTipo_variacion.tipo,
    objTipo_variacion.id,
  ]);
  return resultados;
}

async function eliminar(id) {
  const sql = "DELETE FROM tipos_variacion WHERE id=?";
  const [resultados] = await db.query(sql, [id]);
  return resultados;
}

module.exports = {
  registrar,
  obtenerTodos,
  eliminar,
  modificar,
  obtenerPorId,
};