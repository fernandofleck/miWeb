//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

//Asignamos nombre del archivo y donde lo vamos a guardar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "..", "..", "public", "images", "index"));
    },
    filename: (req, file, cb) => {
        console.log(req.category);
        cb(null, "indexImage-" + Date.now() + path.extname(file.originalname));//path.extname: obtiene la extensión del archivo. ​ file:​ es donde estan todos los datos del archivo que viaja desde el front hacia el back. Originalname: es el nombre original del archivo.
    }
});
const upload = multer({storage: storage});

//Requerimiento de controlador
const controllersSuper = require(path.resolve(__dirname, "..", "controllers", "controllersSuper.js"));

//Creación de las rutas
router.get("/super/view", controllersSuper.superView);
router.get("/super/table", controllersSuper.superTable);
router.get("/super/newSection", controllersSuper.newSection);
router.post("/super/saveSection", upload.any("images"), controllersSuper.saveSection);
router.get("/super/phrases", controllersSuper.phrases);
router.post("/super/savePhrase", controllersSuper.savePhrase);
router.get("/super/deletePhrase/:id", controllersSuper.deletePhrase);
router.get("/super/files", controllersSuper.files);
router.post("/super/saveFile", controllersSuper.saveFile);

//Exportamos el módulo
module.exports = router;