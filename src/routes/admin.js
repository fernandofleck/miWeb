//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { dir } = require("console");

//Asignamos nombre del archivo y donde lo vamos a guardar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.dir(req.body);
        if(req.body.category){
            cb(null, path.resolve(__dirname, "..", "..", "public", "images", "contents"));
        } else {
            cb(null, path.resolve(__dirname, "..", "..", "public", "images", "index"));
        };
    },
    filename: (req, file, cb) => {
        cb(null, "Image-" + Date.now() + path.extname(file.originalname));//path.extname: obtiene la extensión del archivo. ​ file:​ es donde estan todos los datos del archivo que viaja desde el front hacia el back. Originalname: es el nombre original del archivo.
    }
});
const upload = multer({storage: storage});

//Requerimiento de controlador
const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"));

//Creación de las rutas
router.get("/admin", controllersAdmin.admin);
router.get("/admin/table", controllersAdmin.adminTable);
router.get("/admin/newSection", controllersAdmin.newSection);
router.post("/admin/saveSection", upload.any("images"), controllersAdmin.saveSection);
router.get("/admin/phrases", controllersAdmin.phrases);
router.post("/admin/savePhrase", controllersAdmin.savePhrase);
router.get("/admin/deletePhrase/:id", controllersAdmin.deletePhrase);
router.get("/admin/files", controllersAdmin.files);
router.post("/admin/saveFile", controllersAdmin.saveFile);
router.get("/admin/newContent", controllersAdmin.newContent);
router.post("/admin/saveContent", upload.any("images"), controllersAdmin.saveContent);

//Exportamos el módulo
module.exports = router;