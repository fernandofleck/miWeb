//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");

//Requerimiento de controlador
const controllersWeb = require(path.resolve(__dirname, "..", "controllers", "controllersWeb.js"));

//Creación de las rutas
router.get("/", controllersWeb.index);

//Exportamos el módulo
module.exports = router;