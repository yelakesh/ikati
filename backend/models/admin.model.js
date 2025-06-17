const db = require('../database');

async function loginAdmin(usuario, contrasena) {
  const sql = 'SELECT usuario FROM administradores WHERE usuario=$1 AND contrasena=$2';
  const resultados = await db.query(sql, [usuario, contrasena]);
  return resultados.rows;
}

  async function comprobarPass(usuario, antigua) {
    const sql = 'SELECT * FROM administradores WHERE usuario=$1 AND contrasena=$2';
    const resultados = await db.query(sql, [usuario, antigua]);
    return resultados.rows;
  }

  async function eliminarAdmin(usuario) {
    const sql = 'DELETE FROM administradores WHERE usuario=$1';
    const resultados = await db.query(sql, [usuario]);
    return resultados.rows;
  }

  async function cambiarPass(usuario,nueva) {
    const sql = 'UPDATE administradores set contrasena=$1 WHERE usuario=$2';
    const resultados = await db.query(sql, [nueva,usuario]);
    return resultados.rows;
  }

  async function crearAdmin({usuario, contrasena}) {
    const sql = `INSERT INTO administradores 
      (usuario, contrasena) 
      VALUES ($1, $2)`;
      const resultados = await db.query(sql, [usuario, contrasena]);
      return resultados.rows;
  }


module.exports = {
  loginAdmin,
  comprobarPass,
  eliminarAdmin,
  cambiarPass,
  crearAdmin,
};