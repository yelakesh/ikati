const db = require("../database");

async function registrarAnimal(nombre) {
  const sql = `INSERT INTO animales (nombre) VALUES (?)`;
  const resultados = await db.query(sql, [nombre]);
  return resultados;
}

async function obtenerAnimales() {
  const sql = `SELECT * FROM animales order by id`;
  const resultados = await db.query(sql);
  return resultados;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM animales where id=?`;
  const resultados = await db.query(sql,[id]);
  return resultados;
}

async function modificarAnimal(objAnimal) {
  const sql = ` UPDATE animales set nombre=? WHERE id=?`;
  const resultados = await db.query(sql, [objAnimal.nombre, objAnimal.id]);
  return resultados;
}

async function eliminarAnimal(id) {
  const sql = "DELETE FROM animales WHERE id=?";
  const resultados = await db.query(sql, [id]);
  return resultados;
}

module.exports = {
  registrarAnimal,
  obtenerAnimales,
  eliminarAnimal,
  modificarAnimal,
  obtenerPorId
};