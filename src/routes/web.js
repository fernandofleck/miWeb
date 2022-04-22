//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");
const {
    check,
    vaidationResult,
    body
} = require("express-validator");

//Requerimiento de controlador
const controllersWeb = require(path.resolve(__dirname, "..", "controllers", "controllersWeb.js"));

//Creación de las rutas
router.get("/", controllersWeb.index);
router.get("/about", controllersWeb.about);
router.get("/contact", controllersWeb.contact);
router.get("/legal", controllersWeb.legal);
router.get("/:routeS", controllersWeb.category);
router.get("/:routeS/:id", controllersWeb.content);
router.post("/subscribe", [
    check("name").isLength({min: 2}).withMessage("Nombre con 2 o más caracteres."),
    check("email").isEmail().withMessage("Ingrese email válido.")
], controllersWeb.subscribe);

//Exportamos el módulo
module.exports = router;