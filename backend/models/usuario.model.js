const db = require("../database");

async function login(usuario, contrasena) {
  const sql =
    "SELECT usuario, nombre FROM usuarios WHERE usuario=? AND contrasena=?";
  const [resultados] = await db.query(sql, [usuario, contrasena]);
  return resultados;
}

async function obtenerPorUsuario(usuario) {
  const sql = "SELECT * FROM usuarios WHERE usuario=?";
  const [resultados] = await db.query(sql, [usuario]);
  return resultados;
}

async function obtenerTodos() {
  const sql = "SELECT * FROM usuarios";
  const [resultados] = await db.query(sql);
  return resultados;
}

async function eliminarPorUsuario(usuario) {
  const sql = "DELETE FROM usuarios WHERE usuario=?";
  const [resultados] = await db.query(sql, [usuario]);
  return resultados;
}

async function comprobarPass(usuario, antigua) {
  const sql = "SELECT * FROM usuarios WHERE usuario=? AND contrasena=?";
  const [resultados] = await db.query(sql, [usuario, antigua]);
  return resultados;
}

async function cambiarPass(usuario, nueva) {
  const sql = "UPDATE usuarios set contrasena=? WHERE usuario=?";
  const [resultados] = await db.query(sql, [nueva, usuario]);
  return resultados;
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
    "UPDATE usuarios set nombre=?, apellido1=?, apellido2=?, contrasena=?, email=?, telefono=?, cp=?, direccion=? WHERE usuario=?";
  const [resultados] = await db.query(sql, [
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
  return resultados;
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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const [resultados] = await db.query(sql, [
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
  return resultados;
}


async function obtenerComprasPorIdUsuario(idUsuario) {
  const sql = "SELECT * FROM compra WHERE id_usuario=?";
  const [resultados] = await db.query(sql, [idUsuario]);
  return resultados;
}

async function obtenerVariantesPorIdCompra(idCompra) {
  const sql = "SELECT * FROM compra_producto WHERE id_compra=?";
  const [resultados] = await db.query(sql, [idCompra]);
  return resultados;
}


module.exports = {
  login,
  obtenerPorUsuario,
  eliminarPorUsuario,
  modificarPorUsuario,
  registrar,
  eliminarPorUsuario,
  obtenerTodos,
  comprobarPass,
  cambiarPass,
  obtenerComprasPorIdUsuario,
  obtenerVariantesPorIdCompra,
};
