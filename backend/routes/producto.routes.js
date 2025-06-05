const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productoController = require("../controllers/productos.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imagenesProductos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/obtenerProductoPorId",
  productoController.obtenerProductoPorIdController
);

router.post(
  "/registrarProductoCompleto",
  upload.array("imagenes"),
  productoController.registrarProductoCompletoController
);
router.post("/obtenerTodos", productoController.obtenerTodosController);

router.post(
  "/modificarProducto",
  upload.array("imagenes"),
  productoController.modificarProductoController
);

router.post("/eliminarProducto", productoController.eliminarProductoController);
router.post("/obtenerNombres", productoController.obtenerNombresController);
router.post("/obtenerPorAnimal", productoController.obtenerPorAnimalController);
router.post("/obtenerPorAnimalYTipo", productoController.obtenerPorAnimalYTipoController);
router.post("/buscarPorNombre", productoController.buscarPorNombreController);
router.post("/obtenerEnOferta", productoController.obtenerEnOfertaController);
router.post("/obtenerRecomendados", productoController.obtenerRecomendadosController);
router.post("/obtenerProductoPorIdVariante", productoController.obtenerProductoPorIdVarianteController);
router.post("/obtenerVariantePorIdVariante", productoController.obtenerVariantePorIdVarianteController);

module.exports = router;
