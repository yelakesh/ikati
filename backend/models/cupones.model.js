const db= require('../database')

async function nuevoCupon({codigo, activo, descuento, tipo_descuento, fecha_expiracion}){
const sql =`INSERT INTO cupones
(codigo,activo,descuento,tipo_descuento,fecha_expiracion)
 VALUES (?, ?, ?, ?, ?)`;
 const resultados = await db.query(sql, [codigo, activo,descuento,tipo_descuento, fecha_expiracion])
 return resultados;
}

async function modificarPorCodigo({codigo,activo,descuento,tipo_descuento,fecha_expiracion}){

   const sql= 'UPDATE cupones set activo=?, descuento=?, tipo_descuento=?, fecha_expiracion=? WHERE codigo=?';
   const resultados = await db.query(sql, [activo,descuento,tipo_descuento, fecha_expiracion, codigo])
   return resultados;
}

async function obtenerPorCodigo(codigo) {
   const sql = 'SELECT * FROM cupones WHERE codigo=?';
   const resultados = await db.query(sql, [codigo]);
   return resultados;
 }

 async function eliminarPorCodigo(codigo) {
   const sql = 'DELETE FROM cupones WHERE codigo=?';
   const resultados = await db.query(sql, [codigo]);
   return resultados;
 }

 async function obtenerTodos() {
   const sql = "SELECT * FROM cupones";
   const resultados = await db.query(sql);
   return resultados;
 }

 module.exports = {
   nuevoCupon,
   modificarPorCodigo,
   obtenerPorCodigo,
   eliminarPorCodigo,
   obtenerTodos,
 };