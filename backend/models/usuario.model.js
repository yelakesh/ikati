const db = require('../database');

async function login(usuario, contrasena) {
    const sql = 'SELECT id FROM usuarios WHERE usuario=? AND contrasena=?';
    const resultados = await db.query(sql, [usuario, contrasena]);
    return resultados;
  }

  async function obtenerPorUsuario(usuario) {
    const sql = 'SELECT * FROM usuarios WHERE usuario=?';
    const resultados = await db.query(sql, [usuario]);
    return resultados;
  }

  async function eliminarPorUsuario(usuario) {
    const sql = 'DELETE FROM usuarios WHERE usuario=?';
    const resultados = await db.query(sql, [usuario]);
    return resultados;
  }

  async function modificarPorUsuario(usuario) {
    const sql = 'SELECT * FROM usuarios WHERE usuario=?';
    const resultados = await db.query(sql, [usuario]);
    return resultados;
  }

  async function registrar({nombre, apellido1, apellido2, usuario, contrasena, email, telefono, cp, direccion}) {
    const sql = `INSERT INTO usuarios 
      (nombre, apellido1, apellido2, usuario, contrasena, email, telefono, cp, direccion) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    try {
      const resultado = await db.query(sql, [nombre, apellido1, apellido2, usuario, contrasena, email, telefono, cp, direccion]);
      return { ok: true, insertId: resultado.insertId };
    } catch (err) {

      if (err.code === 'ER_DUP_ENTRY') {
        return { ok: false, mensaje: 'Usuario o email ya registrado' };
      }
      console.log(err)
      throw err;
    }
  }

module.exports = {
  login,
  obtenerPorUsuario,
  eliminarPorUsuario,
  modificarPorUsuario,
  registrar
};