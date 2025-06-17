const mysql = require('mysql2/promise');
const { Pool } = require('pg');

let pool;

console.log("DB_ENGINE:", process.env.DB_ENGINE);

if (process.env.DB_ENGINE === 'mysql') {
    console.log("Usando MySQL");
  pool = mysql.createPool({
    host: process.env.MYSQLHOST || "localhost",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "ikati",
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} else if (process.env.DB_ENGINE === 'postgresql') {
   console.log("Usando PostgreSQL");
  pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
  });
 pool.connect()
    .then(client => {
      console.log("Conexión a PostgreSQL exitosa");
      client.release();
    })
    .catch(err => console.error("Error al conectar con PostgreSQL:", err));
} else {
  throw new Error('DB_ENGINE no especificada o no soportada.');
}

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