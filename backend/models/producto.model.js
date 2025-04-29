const db = require('../database');



async function obtenerProductoPorNombre(nombre) {
    const sql = 'SELECT * FROM productos WHERE nombre=?';
    const resultados = await db.query(sql, [nombre]);
    return resultados;
}

async function obtenerFiltrosPorIdProducto(id_producto) {
    const sql = 'SELECT filtro,valor FROM filtros WHERE id_producto=?';
    const resultados = await db.query(sql, [id_producto]);
    return resultados;
}

async function obtenerVariantesPorIdProducto(id_producto) {
    const sql = 'SELECT nombre_variacion,valor_variacion,precio,stock FROM variantes WHERE id_producto=?';
    const resultados = await db.query(sql, [id_producto]);
    return resultados;
}

async function obtenerImagenesPorIdProducto(id_producto) {
    const sql = 'SELECT url FROM imagenes WHERE id_producto=?';
    const resultados = await db.query(sql, [id_producto]);
    return resultados;
}

async function registrarProducto(objProducto) {
    const sql = `INSERT INTO productos 
      (nombre, descripcion, miniatura, activo, animal, marca, tipo, descuento, precio, valoracion) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const resultados = await db.query(sql, [objProducto.nombre, objProducto.descripcion, objProducto.miniatura, objProducto.activo, objProducto.animal, objProducto.marca, objProducto.tipo, objProducto.descuento, objProducto.precio, objProducto.valoracion]);
    return resultados
}

async function registrarFiltro( id_producto, {filtro, valor }) {
    const sql = `INSERT INTO filtros 
      (id_producto,filtro,valor) 
      VALUES (?, ?, ?)`;
    const resultados = await db.query(sql, [id_producto, filtro, valor]);
    return resultados
}

async function registrarVariante( id_producto,nombre_variacion, {precio, stock, valor_variacion }) {
    const sql = `INSERT INTO variantes 
      (id_producto,precio,stock,nombre_variacion,valor_variacion) 
      VALUES (?, ?, ?, ?, ?)`;
    const resultados = await db.query(sql, [id_producto, precio, stock, nombre_variacion, valor_variacion]);
    return resultados
}

async function registrarImagen(id_producto,{ url }) {
    const sql = `INSERT INTO imagenes 
      (id_producto,url) 
      VALUES (?, ?)`;
    const resultados = await db.query(sql, [id_producto, url]);
    return resultados
}

/*

async function eliminarPorUsuario(usuario) {
  const sql = 'DELETE FROM usuarios WHERE usuario=?';
  const resultados = await db.query(sql, [usuario]);
  return resultados;
}

async function modificarPorUsuario({nombre, apellido1, apellido2,usuario, contrasena, email, telefono, cp, direccion}) {
  const sql = 'UPDATE usuarios set nombre=?, apellido1=?, apellido2=?, contrasena=?, email=?, telefono=?, cp=?, direccion=? WHERE usuario=?';
  const resultados = await db.query(sql, [nombre, apellido1, apellido2, contrasena, email, telefono, cp, direccion,usuario]);
  return resultados;
}



*/
module.exports = {
    obtenerProductoPorNombre,
    obtenerFiltrosPorIdProducto,
    obtenerImagenesPorIdProducto,
    obtenerVariantesPorIdProducto,
    registrarFiltro,
    registrarImagen,
    registrarProducto,
    registrarVariante
};