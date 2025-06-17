const db = require('../database');

async function anadiraCarro({ id_usuario, id_variante, cantidad }) {
  // Para PostgreSQL se usa ON CONFLICT en vez de ON DUPLICATE KEY UPDATE
  const sql = `
    INSERT INTO carro (id_usuario, id_variante, cantidad)
    VALUES ($1, $2, $3)
    ON CONFLICT (id_usuario, id_variante)
    DO UPDATE SET cantidad = carro.cantidad + EXCLUDED.cantidad
    RETURNING *;
  `;
  const resultados = await db.query(sql, [id_usuario, id_variante, cantidad]);
  return resultados.rows;
}

async function eliminarDeCarroPorIdVariante(id_variante) {
  const sql = 'DELETE FROM carro WHERE id_variante=$1 RETURNING *';
  const resultados = await db.query(sql, [id_variante]);
  return resultados.rows;
}

async function restarStockVariante(objVariante) {
  const sql = `UPDATE variantes SET stock = stock - $1 WHERE id = $2 RETURNING *`;
  const resultados = await db.query(sql, [
    objVariante.cantidad,
    objVariante.id_variante,
  ]);
  return resultados.rows;
}

async function sumarStockVariante(objVariante) {
  const sql = `UPDATE variantes SET stock = stock + $1 WHERE id = $2 RETURNING *`;
  const resultados = await db.query(sql, [
    objVariante.cantidad,
    objVariante.id,
  ]);
  return resultados.rows;
}

async function obtenerVariantesCarritoPorIdUsuario(id_usuario) {
  const sql = `SELECT * FROM carro WHERE id_usuario=$1`;
  const resultados = await db.query(sql, [id_usuario]);
  return resultados.rows;
}

async function insertarCompra(objCompra) {
  const sql = `
    INSERT INTO compra (id_usuario, fecha, id_cupon, importe)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;
  const resultados = await db.query(sql, [
    objCompra.idUsuario,
    new Date(),
    objCompra.idCupon,
    objCompra.importe,
  ]);
  return resultados.rows[0].id; // ya no es insertId
}

async function insertarCompra_producto(idCompra, variante) {
  const sql = `
    INSERT INTO compra_producto (id_compra, id_variante, cantidad, descuento, precio)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const resultados = await db.query(sql, [
    idCompra,
    variante.id,
    variante.cantidad,
    0,
    variante.precio,
  ]);
  return resultados.rows[0];
}

async function eliminarDeCarroPorIdUsuario(idUsuario) {
  const sql = `DELETE FROM carro WHERE id_usuario=$1 RETURNING *`;
  const resultado = await db.query(sql, [idUsuario]);
  return resultado.rows;
}

module.exports = {
  anadiraCarro,
  obtenerVariantesCarritoPorIdUsuario,
  restarStockVariante,
  sumarStockVariante,
  eliminarDeCarroPorIdVariante,
  insertarCompra,
  insertarCompra_producto,
  eliminarDeCarroPorIdUsuario,
};
