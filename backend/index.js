const express = require('express');
const cors = require('cors');
const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json()); 

const usuarioRoutes = require('./routes/usuario.routes');
const cuponesRoutes= require('./routes/cupon.routes');
const productosRoutes=require('./routes/producto.routes')


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cupones', cuponesRoutes);
app.use('/api/productos', productosRoutes);

app.listen(puerto, () => {
  console.log("Servidor corriendo en http://localhost:"+puerto);
});