const db = require("../database");

async function obtenerPorAnimal(id_animal) {
  const sql = `select f.*, t.nombre from filtros f join tipos_filtro t
  on f.id_filtro=t.id
  where id_producto in (select id_producto from productos where id_animal=?)
  `;
  const [resultados] = await db.query(sql, [id_animal]);
  return resultados;
}
async function obtenerPorAnimalYTipo(id_animal, id_tipo) {
  const sql = `select f.*, t.nombre from filtros f join tipos_filtro t
  on f.id_filtro=t.id
  where id_producto in (select id_producto from productos where id_animal=? and id_tipo=?)
    `;
  const [resultados] = await db.query(sql, [id_animal, id_tipo]);
  return resultados;
}

module.exports = {
  obtenerPorAnimal,
  obtenerPorAnimalYTipo,
  
};
