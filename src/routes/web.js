//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");

//Requerimiento de controlador
const controllersWeb = require(path.resolve(__dirname, "..", "controllers", "controllersWeb.js"));

//Creación de las rutas
router.get("/", controllersWeb.index);
router.get("/about", controllersWeb.about);
router.get("/contact", controllersWeb.contact);
router.get("/legal", controllersWeb.legal);
router.get("/:routeS", controllersWeb.category);
router.get("/:routeS/:id", controllersWeb.content);

//Exportamos el módulo
module.exports = router;