//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");

//Requerimiento de controlador
const controllersServices = require(path.resolve(__dirname, "..", "controllers", "controllersServices.js"));

//Creación de las rutas
router.get("/services", controllersServices.services);

//Exportamos el módulo
module.exports = router;