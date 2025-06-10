const db = require("../database");

async function registrar(objMarca) {
  const sql = `INSERT INTO marcas (nombre,imagen) VALUES (?,?)`;
  const resultados = await db.query(sql, [objMarca.nombre,objMarca.imagen]);
  return resultados;
}

async function obtenerTodo() {
  const sql = `SELECT * FROM marcas`;
  const resultados = await db.query(sql);
  return resultados;
}

async function obtenerFiltroPorAnimal(idAnimal) {
  
  const sql = `SELECT m.*,p.id_producto FROM marcas m join productos p on m.id_marca=p.id_marca where m.id_marca in (select id_marca from productos where id_animal=?)`;
  const resultados = await db.query(sql,[idAnimal]);
  return resultados;
}

async function obtenerPorId(id) {
  const sql = `SELECT * FROM marcas where id_marca=?`;
  const resultados = await db.query(sql,[id]);
  return resultados;
}

async function modificar(objMarca) {
  const sql = ` UPDATE marcas set nombre=?,imagen=? WHERE id_marca=?`;
  const [resultados] = await db.query(sql, [objMarca.nombre,objMarca.imagen, objMarca.id]);
  return resultados;
}

async function eliminarPorId(id) {
  const sql = "DELETE FROM marcas WHERE id_marca=?";
  const [resultados] = await db.query(sql, [id]);
  return resultados;
}

module.exports = {
  registrar,
  obtenerPorId,
  eliminarPorId,
  modificar,
  obtenerTodo,
  obtenerFiltroPorAnimal,
};