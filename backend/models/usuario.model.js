const db = require('../database');

async function login(usuario, contrasena) {
    const sql = 'SELECT usuario, nombre FROM usuarios WHERE usuario=? AND contrasena=?';
    const resultados = await db.query(sql, [usuario, contrasena]);
    return resultados;
  }

  async function obtenerPorUsuario(usuario) {
    const sql = 'SELECT * FROM usuarios WHERE usuario=?';
    const resultados = await db.query(sql, [usuario]);
    return resultados;
  }
  async function obtenerTodos() {
    const sql = "SELECT * FROM usuarios";
    const resultados = await db.query(sql);
    return resultados;
  }

  async function eliminarPorUsuario(usuario) {
    const sql = "DELETE FROM usuarios WHERE usuario=?";
    const resultados = await db.query(sql, [usuario]);
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
  };