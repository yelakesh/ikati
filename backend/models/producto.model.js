const db = require("../database");

async function obtenerProductoPorNombre(nombre) {
  const sql = "SELECT * FROM productos WHERE nombre=?";
  const resultados = await db.query(sql, [nombre]);
  return resultados;
}

async function obtenerProductoPorId(id) {
  const sql = "SELECT * FROM productos WHERE id_producto=?";
  const resultados = await db.query(sql, [id]);
  return resultados;
}

async function obtenerTodos() {
  const sql = "SELECT * FROM productos where activo=1";
  const resultados = await db.query(sql);
  return resultados;
}

async function obtenerRecomendados() {
  const sql =
    "SELECT * FROM productos where activo=1 order by valoracion DESC LIMIT 10 ";
  const resultados = await db.query(sql);
  return resultados;
}

async function obtenerEnOferta() {
  const sql =
    "SELECT * FROM productos where descuento!=0 and descuento is not null and activo=1";
  const resultados = await db.query(sql);
  return resultados;
}

async function obtenerFiltrosPorIdProducto(id_producto) {
  const sql = "SELECT * FROM filtros WHERE id_producto=?";
  const resultados = await db.query(sql, [id_producto]);
  return resultados;
}

async function obtenerVariantesPorIdProducto(id_producto) {
  const sql = "SELECT * FROM variantes WHERE id_producto=?";
  const resultados = await db.query(sql, [id_producto]);
  return resultados;
}
async function obtenerVariantePorIdVariante(id_variante) {
  const sql = "SELECT * FROM variantes WHERE variante=?";
  const resultados = await db.query(sql, [id_variante]);
  return resultados;
}

async function obtenerProductoPorIdVariante(id_variante){
  const sql = "SELECT * FROM productos WHERE id_producto= (SELECT id_producto FROM variantes where id=?)"
  const resultados = await db.query(sql, [id_variante])
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
    objProducto.id_tipo_producto,
    objProducto.descuento,
    objProducto.valoracion,
  ]);
  return resultados;
}

async function registrarFiltro(id_producto, { id_filtro, valor }) {
  const sql = `INSERT INTO filtros 
      (id_producto,id_filtro,valor) 
      VALUES (?, ?, ?)`;
  const resultados = await db.query(sql, [id_producto, id_filtro, valor]);
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
  const sql = `SELECT id_producto,nombre FROM productos`;
  const resultados = await db.query(sql);
  return resultados;
}

async function modificarProducto(objProducto) {
  const sql = `UPDATE productos set
      descripcion=?, activo=?, id_animal=?, id_marca=?, id_tipo=?, descuento=?, valoracion=?, nombre=?
      WHERE id_producto=?`;

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

  return resultados;
}



async function modificarVariante({ id, precio, stock, valor_variacion }) {
  const sql = `UPDATE variantes set
      precio=?, stock=?, valor_variacion=?
      WHERE id=?`;

  const resultados = await db.query(sql, [precio,stock,valor_variacion,id]);

  return resultados;
}

async function eliminarFiltros(id_producto) {
  const sql = "DELETE FROM filtros WHERE id_producto=?";
  const resultados = await db.query(sql, [id_producto]);
  return resultados;
}

async function eliminarVariante(id_variante) {
  const sql = "DELETE FROM variantes WHERE id=?";
  const resultados = await db.query(sql, [id_variante]);
  return resultados;
}

async function eliminarProducto(id) {
  const sql = "DELETE FROM productos WHERE id_producto=?";
  const resultados = await db.query(sql, [id]);
  return resultados;
}

async function obtenerPorAnimal(id_animal) {
  const sql = "SELECT * FROM productos where id_animal=? and activo=1";
  const resultados = await db.query(sql,[id_animal]);
  return resultados;
}
async function obtenerPorAnimalYTipo(id_animal,id_tipo) {
  const sql =
    "SELECT * FROM productos where id_animal=? and id_tipo=? and activo=1";
  const resultados = await db.query(sql,[id_animal,id_tipo]);
  return resultados;
}

async function buscarPorNombre(textoBusqueda) {
 
  const sql = "SELECT * FROM productos where nombre like ? and activo=1";
  const resultados = await db.query(sql, [textoBusqueda.textoBusqueda]);
  console.log(resultados);
  
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
  eliminarVariante,
  eliminarProducto,
  obtenerNombres,
  obtenerTodos,
  obtenerPorAnimal,
  obtenerPorAnimalYTipo,
  buscarPorNombre,
  obtenerEnOferta,
  obtenerRecomendados,
  obtenerProductoPorIdVariante,
  modificarVariante,
  obtenerVariantePorIdVariante
};
