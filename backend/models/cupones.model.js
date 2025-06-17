const db= require('../database')

async function nuevoCupon({codigo, activo, descuento, tipo_descuento, fecha_expiracion}){
const sql =`INSERT INTO cupones
(codigo,activo,descuento,tipo_descuento,fecha_expiracion)
 VALUES ($1, $2, $3, $4, $5)`;
 const resultados = await db.query(sql, [codigo, activo,descuento,tipo_descuento, fecha_expiracion]);
 return resultados.rows;
}

async function modificarPorCodigo({codigo,activo,descuento,tipo_descuento,fecha_expiracion}){

   const sql= 'UPDATE cupones set activo=$1, descuento=$2, tipo_descuento=$3, fecha_expiracion=$4 WHERE codigo=$5';
   const resultados = await db.query(sql, [activo,descuento,tipo_descuento, fecha_expiracion, codigo]);
   return resultados.rows;
}

async function obtenerPorCodigo(codigo) {
   const sql = 'SELECT * FROM cupones WHERE codigo=$1';
   const resultados = await db.query(sql, [codigo]);
   return resultados.rows;
 }

 async function eliminarPorCodigo(codigo) {
   const sql = 'DELETE FROM cupones WHERE codigo=$1';
   const resultados = await db.query(sql, [codigo]);
   return resultados.rows;
 }

 async function obtenerTodos() {
   const sql = "SELECT * FROM cupones";
   const resultados = await db.query(sql);
   return resultados.rows;
 }

 module.exports = {
   nuevoCupon,
   modificarPorCodigo,
   obtenerPorCodigo,
   eliminarPorCodigo,
   obtenerTodos,
 };