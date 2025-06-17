const db = require("../database");

async function obtenerPorAnimal(id_animal) {
  const sql = `
    SELECT f.*, t.nombre 
    FROM filtros f 
    JOIN tipos_filtro t ON f.id_filtro = t.id
    WHERE id_producto IN (
      SELECT id_producto 
      FROM productos 
      WHERE id_animal = $1
    );
  `;
  const resultados = await db.query(sql, [id_animal]);
  return resultados.rows;
}

async function obtenerPorAnimalYTipo(id_animal, id_tipo) {
  const sql = `
    SELECT f.*, t.nombre 
    FROM filtros f 
    JOIN tipos_filtro t ON f.id_filtro = t.id
    WHERE id_producto IN (
      SELECT id_producto 
      FROM productos 
      WHERE id_animal = $1 AND id_tipo = $2
    );
  `;
  const resultados = await db.query(sql, [id_animal, id_tipo]);
  return resultados.rows;
}

module.exports = {
  obtenerPorAnimal,
  obtenerPorAnimalYTipo,
};
