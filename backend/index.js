const express = require('express');
const cors = require('cors');
const app = express();
const puerto = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

const usuarioRoutes = require('./routes/usuario.routes');
const cuponesRoutes= require('./routes/cupon.routes');
const productosRoutes=require('./routes/producto.routes')
const servicioRoutes=require('./routes/servicio.routes')
const adminRoutes=require('./routes/admin.routes')
const animalRoutes = require("./routes/animal.routes");
const marcaRoutes = require("./routes/marca.routes");
const tipo_productoRoutes = require("./routes/tipo_producto.routes");
const tipo_VarianteRoutes = require("./routes/tipo_variante.routes");
const tipo_FiltroRoutes = require("./routes/tipo_filtros.routes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/cupones", cuponesRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/servicio", servicioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/animales", animalRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/tipo_producto", tipo_productoRoutes);
app.use("/api/tipo_variante", tipo_VarianteRoutes);
app.use("/api/tipo_filtro", tipo_FiltroRoutes);
app.use("/imagenesProductos", express.static("imagenesProductos"));
app.use("/imagenesMarcas", express.static("imagenesMarcas"));


app.listen(puerto, () => {
  console.log("Servidor corriendo en http://localhost:"+puerto);
});