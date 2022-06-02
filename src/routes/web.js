//Seteo del entorno del archivo para crear la ruta
let express = require("express");
let router = express.Router();
let path = require("path");
let fs = require("fs");
let bcrypt = require("bcryptjs");
let multer = require("multer");
let { dir } = require("console");
let acceso = require("../middlewares/acceso");
let {
    check,
    vaidationResult,
    body
} = require("express-validator");

//Asignamos nombre del archivo y donde lo vamos a guardar
let storage = multer.diskStorage({
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
let upload = multer({storage: storage});

//Requerimiento de controladores
let controllersWeb = require(path.resolve(__dirname, "..", "controllers", "controllersWeb.js"));
let controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"));
let controllersUsers = require(path.resolve(__dirname, "..", "controllers", "controllersUsers.js"));

//Requerimiento de usuarios registrados en nuestro archivo json.
let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json")));

//Creación de las rutas Web
router.get("/", controllersWeb.index);
router.get("/about", acceso, controllersWeb.about);
router.get("/contact", acceso, controllersWeb.contact);
router.get("/legal", acceso, controllersWeb.legal);
router.get("/:routeS", acceso, controllersWeb.category);
router.get("/:routeS/:id", acceso, controllersWeb.content);
router.post("/subscribe", acceso, [
    check("name").isLength({min: 2}).withMessage("Nombre con 2 o más caracteres."),
    check("email").isEmail().withMessage("Ingrese email válido.")
], controllersWeb.subscribe);

//Creación de las rutas Admin
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

//Creación de las rutas Users
router.get("/login", controllersUsers.login);
router.post("/login", acceso, [
    check("email").isEmail().withMessage("Email no válido."),
    // Comprobación de email registrado.
    body("email").custom(value => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == value) {
                return true;
            };
        };
        return false;
    }).withMessage("Email no está registrado."),
    check("password").isLength({min: 8}).withMessage("Contraseña no válida."),
    // Comprobación de password correcto.
    body("password").custom((value, {req}) => {
        for (let i = 0; i < users.length; i++) {
            // Validar email del usuario con la base de datos
            if (users[i].email == req.body.email) {
                // Validación de password correspondiente al email ingresado.
                if (bcrypt.compareSync(value, users[i].password)) {
                    return true;
                };
            } else {
                return false;
            }
        };
    }).withMessage("Error al escribir la contraseña.")
], controllersUsers.loginPost);
router.get("/register", controllersUsers.register);
router.post("/registerP", [ //Realizamos las validaciones de la información ingresada.
    check("name").isLength({min: 2}).withMessage("Nombre debe ir con 3 o más caracteres."),
    check("email").isEmail().withMessage("Ingresar Email válido."),
    check("password").isLength({min: 8}).withMessage("La contraseña debe tener 8 o más caracteres."),
    body("password2").custom((value, {req}) => {
        if(value !== req.body.password){
            return false;
        };
        return true;
    }).withMessage("Contraseñas no coinciden.")
], controllersUsers.registerPost);
// “Name”, “email”, “password” y “password2” son los identificadores de los input de donde sacamos esa información que viaja en el formulario.
// check se encarga de tomar el valor que se almacena en el input con el nombre que aparece entre parentesis y luego se ejecutan ds comandos adicionales. IsLenght() determina el minimo o maximo de carateres que debe tener. IsEmail() verifica que sea un formato de correo electrónico. Y por ultimo withMessage() se encarga de enviar el mensaje que se mostrara en caso de error en los datos ingresados.

//Exportamos el módulo
module.exports = router;