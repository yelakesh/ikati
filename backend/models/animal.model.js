const db = require("../database");

async function registrarAnimal(nombre) {
  const sql = `INSERT INTO animales (nombre) VALUES ($1)`;
  const resultados = await db.query(sql, [nombre]);
  return resultados.rows;
}

async function obtenerAnimales() {
  const sql = `SELECT * FROM animales order by id`;
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM animales where id=$1`;
  const resultados = await db.query(sql,[id]);
  return resultados.rows;
}

async function modificarAnimal(objAnimal) {
  const sql = ` UPDATE animales set nombre=$1 WHERE id=$2`;
  const resultados = await db.query(sql, [objAnimal.nombre, objAnimal.id]);
  return resultados.rows;
}

async function eliminarAnimal(id) {
  const sql = "DELETE FROM animales WHERE id=$1";
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

module.exports = {
  registrarAnimal,
  obtenerAnimales,
  eliminarAnimal,
  modificarAnimal,
  obtenerPorId
};