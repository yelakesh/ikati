const db = require("../database");

async function registrar(objMarca) {
  const sql = `INSERT INTO marcas (nombre, imagen) VALUES ($1, $2)`;
  const resultados = await db.query(sql, [objMarca.nombre, objMarca.imagen]);
  return resultados.rows;
}

async function obtenerTodo() {
  const sql = `SELECT * FROM marcas`;
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function obtenerFiltroPorAnimal(idAnimal) {
  const sql = `
    SELECT m.*, p.id_producto
    FROM marcas m
    JOIN productos p ON m.id_marca = p.id_marca
    WHERE m.id_marca IN (
      SELECT id_marca FROM productos WHERE id_animal = $1
    )
  `;
  const resultados = await db.query(sql, [idAnimal]);
  return resultados.rows;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM marcas WHERE id_marca = $1`;
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

async function modificar(objMarca) {
  const sql = `UPDATE marcas SET nombre = $1, imagen = $2 WHERE id_marca = $3`;
  const resultados = await db.query(sql, [objMarca.nombre, objMarca.imagen, objMarca.id]);
  return resultados.rows;
}

async function eliminarPorId(id) {
  const sql = `DELETE FROM marcas WHERE id_marca = $1`;
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

module.exports = {
  registrar,
  obtenerPorId,
  eliminarPorId,
  modificar,
  obtenerTodo,
  obtenerFiltroPorAnimal,
};
