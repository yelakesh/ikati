const db = require("../database");

async function login(usuario, contrasena) {
  const sql =
    "SELECT usuario, nombre FROM usuarios WHERE usuario=$1 AND contrasena=$2";
  const resultados = await db.query(sql, [usuario, contrasena]);
  return resultados.rows;
}

async function obtenerPorUsuario(usuario) {
  const sql = "SELECT * FROM usuarios WHERE usuario=$1";
  const resultados = await db.query(sql, [usuario]);
  return resultados.rows;
}

async function obtenerTodos() {
  const sql = "SELECT * FROM usuarios";
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function eliminarPorUsuario(usuario) {
  const sql = "DELETE FROM usuarios WHERE usuario=$1 RETURNING *";
  const resultados = await db.query(sql, [usuario]);
  return resultados.rows;
}

async function comprobarPass(usuario, antigua) {
  const sql = "SELECT * FROM usuarios WHERE usuario=$1 AND contrasena=$2";
  const resultados = await db.query(sql, [usuario, antigua]);
  return resultados.rows;
}

async function cambiarPass(usuario, nueva) {
  const sql = "UPDATE usuarios SET contrasena=$1 WHERE usuario=$2 RETURNING *";
  const resultados = await db.query(sql, [nueva, usuario]);
  return resultados.rows;
}

async function modificarPorUsuario({
  nombre,
  apellido1,
  apellido2,
  usuario,
  contrasena,
  email,
  telefono,
  cp,
  direccion,
}) {
  const sql =
    "UPDATE usuarios SET nombre=$1, apellido1=$2, apellido2=$3, contrasena=$4, email=$5, telefono=$6, cp=$7, direccion=$8 WHERE usuario=$9 RETURNING *";
  const resultados = await db.query(sql, [
    nombre,
    apellido1,
    apellido2,
    contrasena,
    email,
    telefono,
    cp,
    direccion,
    usuario,
  ]);
  return resultados.rows;
}

async function registrar({
  nombre,
  apellido1,
  apellido2,
  usuario,
  contrasena,
  email,
  telefono,
  cp,
  direccion,
}) {
  const sql = `INSERT INTO usuarios 
      (nombre, apellido1, apellido2, usuario, contrasena, email, telefono, cp, direccion) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const resultados = await db.query(sql, [
    nombre,
    apellido1,
    apellido2,
    usuario,
    contrasena,
    email,
    telefono,
    cp,
    direccion,
  ]);
  return resultados.rows;
}

async function obtenerComprasPorIdUsuario(idUsuario) {
  const sql = "SELECT * FROM compra WHERE id_usuario=$1";
  const resultados = await db.query(sql, [idUsuario]);
  return resultados.rows;
}

async function obtenerVariantesPorIdCompra(idCompra) {
  const sql = "SELECT * FROM compra_producto WHERE id_compra=$1";
  const resultados = await db.query(sql, [idCompra]);
  return resultados.rows;
}

module.exports = {
  login,
  obtenerPorUsuario,
  eliminarPorUsuario,
  modificarPorUsuario,
  registrar,
  obtenerTodos,
  comprobarPass,
  cambiarPass,
  obtenerComprasPorIdUsuario,
  obtenerVariantesPorIdCompra,
};
