const express = require('express');
const cors = require('cors');
const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json()); 

const usuarioRoutes = require('./routes/usuario.routes');
const cuponesRoutes= require('./routes/cupon.routes');
const productosRoutes=require('./routes/producto.routes')
const servicioRoutes=require('./routes/servicio.routes')
const adminRoutes=require('./routes/admin.routes')


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cupones', cuponesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/servicio', servicioRoutes);
app.use('/api/admin', adminRoutes);
app.use(
  "/imagenes/productos",
  express.static("frontend/public/imagenes/productos")
);
app.listen(puerto, () => {
  console.log("Servidor corriendo en http://localhost:"+puerto);
});