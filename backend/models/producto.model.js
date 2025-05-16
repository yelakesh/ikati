const db = require("../database");

async function obtenerProductoPorNombre(nombre) {
  const sql = "SELECT * FROM productos WHERE nombre=?";
  const resultados = await db.query(sql, [nombre]);
  return resultados;
}
async function obtenerProductoPorId(id) {
  const sql = "SELECT * FROM productos WHERE id=?";
  const resultados = await db.query(sql, [id]);
  return resultados;
}

async function obtenerTodos() {
  const sql = "SELECT * FROM productos";
  const resultados = await db.query(sql);
  return resultados;
}

async function obtenerFiltrosPorIdProducto(id_producto) {
  const sql = "SELECT filtro,valor FROM filtros WHERE id_producto=?";
  const resultados = await db.query(sql, [id_producto]);
  return resultados;
}

async function obtenerVariantesPorIdProducto(id_producto) {
  const sql =
    "SELECT id_variacion,valor_variacion,precio,stock FROM variantes WHERE id_producto=?";
  const resultados = await db.query(sql, [id_producto]);
  return resultados;
}



async function registrarProducto(objProducto) {
  const sql = `INSERT INTO productos 
      (nombre, descripcion, activo, id_animal, id_marca, id_tipo, descuento, valoracion) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const resultados = await db.query(sql, [
    objProducto.nombre,
    objProducto.descripcion,
    objProducto.activo,
    objProducto.id_animal,
    objProducto.id_marca,
    objProducto.tipo,
    objProducto.descuento,
    objProducto.valoracion,
  ]);
  return resultados;
}


async function registrarFiltro(id_producto, { filtro, valor }) {
  const sql = `INSERT INTO filtros 
      (id_producto,filtro,valor) 
      VALUES (?, ?, ?)`;
  const resultados = await db.query(sql, [id_producto, filtro, valor]);
  return resultados;
}

async function registrarVariante(
  id_producto,
  id_variacion,
  { precio, stock, valor_variacion }
) {
  const sql = `INSERT INTO variantes 
      (id_producto,precio,stock,id_variacion,valor_variacion) 
      VALUES (?, ?, ?, ?, ?)`;
  const resultados = await db.query(sql, [
    id_producto,
    precio,
    stock,
    id_variacion,
    valor_variacion,
  ]);
  return resultados;
}

async function obtenerNombres() {
  const sql = `SELECT id,nombre FROM productos`;
  const resultados = await db.query(sql);
  return resultados;
}

async function modificarProducto(objProducto) {
  const sql = `UPDATE productos set
      descripcion=?, activo=?, id_animal=?, id_marca=?, id_tipo=?, descuento=?, precio=?, valoracion=?
      WHERE id=?`;

  const resultados = await db.query(sql, [
    objProducto.descripcion,
    objProducto.activo,
    objProducto.id_animal,
    objProducto.id_marca,
    objProducto.id_tipo,
    objProducto.descuento,
    objProducto.precio,
    objProducto.valoracion,
    objProducto.nombre,
    objProducto.id,
  ]);

  return resultados;
}

async function eliminarFiltros(id_producto) {
  const sql = "DELETE FROM filtros WHERE id_producto=?";
  const resultados = await db.query(sql, [id_producto]);
  return resultados;
}

async function eliminarVariantes(id_producto) {
  const sql = "DELETE FROM variantes WHERE id_producto=?";
  const resultados = await db.query(sql, [id_producto]);
  return resultados;
}

async function eliminarProducto(id) {
  const sql = "DELETE FROM productos WHERE id=?";
  const resultados = await db.query(sql, [id]);
  return resultados;
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
  eliminarVariantes,
  eliminarProducto,
  obtenerNombres,
  obtenerTodos,
};
