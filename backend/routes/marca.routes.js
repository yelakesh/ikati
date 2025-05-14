const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const marcaController = require("../controllers/marca.controller");
const storage = multer.diskStorage({
  destination: function (cb) {
    cb(null, "imagenesMarcas");
  },
  filename: function (file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({ storage: storage });

router.post("/obtenerPorId", marcaController.obtenerPorIdController);
router.post(
  "/registrar",
  upload.array("imagenes"),
  marcaController.registrarController
);
router.post("/eliminarPorId", marcaController.eliminarPorIdController);
router.post("/modificar", marcaController.modificarController);
router.post("/obtenerTodas", marcaController.obtenerMarcasController);

module.exports = router;