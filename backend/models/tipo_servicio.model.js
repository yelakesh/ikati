const db = require("../database");

async function obtenerTodos() {
  const sql = `SELECT * FROM tipo_servicio`;
  const resultados = await db.query(sql);
  return resultados.rows;
}

module.exports = {
  obtenerTodos,
};
