const mysql = require('mysql2/promise');
const util = require('util');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "ikati",
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

// const connection = mysql.createConnection({
//   host: process.env.MYSQLHOST || "localhost",
//   user: process.env.MYSQLUSER || "root",
//   password: process.env.MYSQLPASSWORD || "",
//   database: process.env.MYSQLDATABASE || "ikati",
//   port: process.env.MYSQLPORT || 3306
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     return;
//   }
//   console.log('Conexión a la base de datos establecida');
// });

// connection.query = util.promisify(connection.query);
// module.exports = connection;