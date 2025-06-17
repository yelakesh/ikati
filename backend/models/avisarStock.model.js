const db= require('../database')

async function anadiraAvisar({id_variante, emailUsuario}){
const sql =`INSERT INTO aviso_stock (id_variante, email)
VALUES ($1, $2)
`;
 const resultados = await db.query(sql, [id_variante, emailUsuario])
 return resultados.rows;
}
 module.exports = {
   anadiraAvisar
 };