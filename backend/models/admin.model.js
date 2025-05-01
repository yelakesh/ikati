const db = require('../database');

async function loginAdmin(usuario, contrasena) {
    const sql = 'SELECT * FROM administradores WHERE usuario=? AND contrasena=?';
    const resultados = await db.query(sql, [usuario, contrasena]);
    return resultados;
  }

  async function comprobarPass(usuario, antigua) {
    const sql = 'SELECT * FROM administradores WHERE usuario=? AND contrasena=?';
    const resultados = await db.query(sql, [usuario, antigua]);
    return resultados;
  }

  async function eliminarPorUsuario(usuario) {
    const sql = 'DELETE FROM usuarios WHERE usuario=?';
    const resultados = await db.query(sql, [usuario]);
    return resultados;
  }

  async function cambiarPass(usuario,nueva) {
    const sql = 'UPDATE administradores set contrasena=? WHERE usuario=?';
    const resultados = await db.query(sql, [nueva,usuario]);
    return resultados;
  }

  async function crearAdmin({usuario, contrasena}) {
    const sql = `INSERT INTO administradores 
      (usuario, contrasena) 
      VALUES (?, ?)`;
      const resultados = await db.query(sql, [usuario, contrasena]);
      return resultados
       
  }


module.exports = {
  loginAdmin,
  comprobarPass,
  eliminarPorUsuario,
  cambiarPass,
  crearAdmin,
  
};