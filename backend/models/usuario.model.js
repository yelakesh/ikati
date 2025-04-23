const db = require('../database');

async function login(usuario, contrasena) {
    const sql = 'SELECT id FROM usuarios WHERE usuario=? AND contrasena=?';
    const resultados = await db.query(sql, [usuario, contrasena]);
    return resultados;
  }


module.exports = {
  login
};