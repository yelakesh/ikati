const db = require("../database");

async function obtenerProductoPorNombre(nombre) {
  const sql = "SELECT * FROM productos WHERE nombre = $1";
  const resultados = await db.query(sql, [nombre]);
  return resultados.rows;
}

async function obtenerProductoPorId(id) {
  const sql = "SELECT * FROM productos WHERE id_producto = $1";
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

async function obtenerTodos() {
  const sql = "SELECT * FROM productos WHERE activo = 1";
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function obtenerRecomendados() {
  const sql = "SELECT * FROM productos WHERE activo = 1 ORDER BY valoracion DESC LIMIT 10";
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function obtenerEnOferta() {
  const sql = "SELECT * FROM productos WHERE descuento != 0 AND descuento IS NOT NULL AND activo = 1";
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function obtenerFiltrosPorIdProducto(id_producto) {
  const sql = "SELECT * FROM filtros WHERE id_producto = $1";
  const resultados = await db.query(sql, [id_producto]);
  return resultados.rows;
}

async function obtenerVariantesPorIdProducto(id_producto) {
  const sql = "SELECT * FROM variantes WHERE id_producto = $1";
  const resultados = await db.query(sql, [id_producto]);
  return resultados.rows;
}

async function obtenerVariantePorIdVariante(id_variante) {
  const sql = "SELECT * FROM variantes WHERE id = $1";
  const resultados = await db.query(sql, [id_variante]);
  return resultados.rows;
}

// async function obtenerProductoPorIdVariante(id_variante){
//   const sql = "SELECT * FROM productos WHERE id_producto = (SELECT id_producto FROM variantes WHERE id = $1)";
//   const resultados = await db.query(sql, [id_variante]);
//   return resultados.rows;
// }

async function registrarProducto(objProducto) {
  const sql = `INSERT INTO productos 
      (nombre, descripcion, activo, id_animal, id_marca, id_tipo, descuento, valoracion) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const resultados = await db.query(sql, [
    objProducto.nombre,
    objProducto.descripcion,
    objProducto.activo,
    objProducto.id_animal,
    objProducto.id_marca,
    objProducto.id_tipo_producto,
    objProducto.descuento,
    objProducto.valoracion,
  ]);
  return resultados.rows;
}

async function registrarFiltro(id_producto, { id_filtro, valor }) {
  const sql = `INSERT INTO filtros (id_producto, id_filtro, valor) VALUES ($1, $2, $3) RETURNING *`;
  const resultados = await db.query(sql, [id_producto, id_filtro, valor]);
  return resultados.rows;
}

async function registrarVariante(id_producto, id_variacion, { precio, stock, valor_variacion }) {
  const sql = `INSERT INTO variantes 
      (id_producto, precio, stock, id_variacion, valor_variacion) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const resultados = await db.query(sql, [
    id_producto,
    precio,
    stock,
    id_variacion,
    valor_variacion,
  ]);
  return resultados.rows;
}

async function obtenerNombres() {
  const sql = `SELECT id_producto, nombre FROM productos`;
  const resultados = await db.query(sql);
  return resultados.rows;
}

async function modificarProducto(objProducto) {
  const sql = `UPDATE productos SET
      descripcion = $1, activo = $2, id_animal = $3, id_marca = $4, id_tipo = $5, descuento = $6, valoracion = $7, nombre = $8
      WHERE id_producto = $9 RETURNING *`;

  const resultados = await db.query(sql, [
    objProducto.descripcion,
    objProducto.activo,
    objProducto.id_animal,
    objProducto.id_marca,
    objProducto.id_tipo_producto,
    objProducto.descuento,
    objProducto.valoracion,
    objProducto.nombre,
    objProducto.id_producto,
  ]);

  return resultados.rows;
}

async function modificarVariante({ id, precio, stock, valor_variacion }) {
  const sql = `UPDATE variantes SET
      precio = $1, stock = $2, valor_variacion = $3
      WHERE id = $4 RETURNING *`;

  const resultados = await db.query(sql, [precio, stock, valor_variacion, id]);

  return resultados.rows;
}

async function eliminarFiltros(id_producto) {
  const sql = "DELETE FROM filtros WHERE id_producto = $1";
  const resultados = await db.query(sql, [id_producto]);
  return resultados.rows;
}

async function eliminarVariante(id_variante) {
  const sql = "DELETE FROM variantes WHERE id = $1";
  const resultados = await db.query(sql, [id_variante]);
  return resultados.rows;
}

async function eliminarProducto(id) {
  const sql = "DELETE FROM productos WHERE id_producto = $1";
  const resultados = await db.query(sql, [id]);
  return resultados.rows;
}

async function obtenerPorAnimal(id_animal) {
  const sql = "SELECT * FROM productos WHERE id_animal = $1 AND activo = 1";
  const resultados = await db.query(sql, [id_animal]);
  return resultados.rows;
}

async function obtenerPorAnimalYTipo(id_animal, id_tipo) {
  const sql = "SELECT * FROM productos WHERE id_animal = $1 AND id_tipo = $2 AND activo = 1";
  const resultados = await db.query(sql, [id_animal, id_tipo]);
  return resultados.rows;
}

async function buscarPorNombre(textoBusqueda) {
  const sql = "SELECT * FROM productos WHERE nombre ILIKE $1 AND activo = 1";
  const resultados = await db.query(sql, [`%${textoBusqueda.textoBusqueda}%`]);
  return resultados.rows;
}

async function obtenerEmailsAvisoStock() {
  const sql = `
    SELECT a.*, v.valor_variacion, p.nombre
    FROM aviso_stock a
    JOIN variantes v ON a.id_variante = v.id
    JOIN productos p ON p.id_producto = v.id_producto
    WHERE v.stock > 0
  `;
  const resultados = await db.query(sql);
  await eliminarEmailsAvisoStock();
  return resultados.rows;
}

async function eliminarEmailsAvisoStock() {
  const sql = `
    DELETE FROM aviso_stock
    WHERE id_variante IN (SELECT id FROM variantes WHERE stock > 0)
  `;
  const resultados = await db.query(sql);
  return resultados.rows;
}

module.exports = {
  obtenerProductoPorNombre,
  obtenerFiltrosPorIdProducto,
  obtenerVariantesPorIdProducto,
  obtenerProductoPorId,
  registrarFiltro,
  registrarProducto,
  registrarVariante,
  modificarProducto,
  eliminarFiltros,
  eliminarVariante,
  eliminarProducto,
  obtenerNombres,
  obtenerTodos,
  obtenerPorAnimal,
  obtenerPorAnimalYTipo,
  buscarPorNombre,
  obtenerEnOferta,
  obtenerRecomendados,
  //obtenerProductoPorIdVariante,
  modificarVariante,
  obtenerVariantePorIdVariante,
  obtenerEmailsAvisoStock,
};
