const db = require('../database');

async function obtenerTodos() {
  const sql = "SELECT * FROM servicios";
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function nuevoServicio({ nombre, tipo, latitud, longitud, direccion, web }) {
  const sql = `
    INSERT INTO servicios (nombre, tipo, latitud, longitud, direccion, web)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const resultados = await db.query(sql, [nombre, tipo, latitud, longitud, direccion, web]);
  return resultados.rows;
}

async function modificarPorNombre({ nombre, tipo, latitud, longitud, direccion, web }) {
  const sql = `
    UPDATE servicios
    SET tipo = $1, latitud = $2, longitud = $3, direccion = $4, web = $5
    WHERE nombre = $6
    RETURNING *
  `;
  const resultados = await db.query(sql, [tipo, latitud, longitud, direccion, web, nombre]);
  return resultados.rows;
}

async function obtenerPorNombre(nombre) {
  const sql = "SELECT * FROM servicios WHERE nombre = $1";
  const resultados = await db.query(sql, [nombre]);
  return resultados.rows;
}

async function eliminarPorNombre(nombre) {
  const sql = "DELETE FROM servicios WHERE nombre = $1 RETURNING *";
  const resultados = await db.query(sql, [nombre]);
  return resultados.rows;
}

module.exports = {
  obtenerTodos,
  nuevoServicio,
  modificarPorNombre,
  obtenerPorNombre,
  eliminarPorNombre,
};
