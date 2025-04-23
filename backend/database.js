const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // si no has puesto contraseña en XAMPP, déjalo vacío
  database: 'ikati'   // o el nombre que le hayas puesto a tu BD
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

connection.query = util.promisify(connection.query);
module.exports = connection;