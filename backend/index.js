const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
//const usuarioRoutes = require('./routes/usuario.routes');
//const productoRoutes = require('./routes/producto.routes');

//app.use('/usuarios', usuarioRoutes);
//app.use('/productos', productoRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});