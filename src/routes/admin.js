//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { dir } = require("console");
const acceso = require("../middlewares/acceso");

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
router.get("/admin", acceso, controllersAdmin.admin);
router.get("/admin/table", acceso, controllersAdmin.adminTable);
router.get("/admin/newSection", acceso, controllersAdmin.newSection);
router.post("/admin/saveSection", acceso, upload.any("images"), controllersAdmin.saveSection);
router.get("/admin/phrases", acceso, controllersAdmin.phrases);
router.post("/admin/savePhrase", acceso, controllersAdmin.savePhrase);
router.get("/admin/deletePhrase/:id", acceso, controllersAdmin.deletePhrase);
router.get("/admin/files", acceso, controllersAdmin.files);
router.post("/admin/saveFile", acceso, controllersAdmin.saveFile);
router.get("/admin/newContent", acceso, controllersAdmin.newContent);
router.post("/admin/saveContent", acceso, upload.any("images"), controllersAdmin.saveContent);

//Exportamos el módulo
module.exports = router;