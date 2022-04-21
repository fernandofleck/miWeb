//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
//const multer = require("multer");// Para subir el avatar del usuario que se registre

//Requerimiento de paquete express-validator. Al ser varios parametros lo almacenamos en un objeto literal.
const {
    check, // Parametro indicador si nuestros parametros tienen o no algun tipo de detalle.
    vaidationResult, // Almacena los errores que puedan existir.
    body // Guarda el dato que estaria viajando desde nuestro formulario.
} = require("express-validator");

//Requerimiento de controlador
const controllersUsers = require(path.resolve(__dirname, "..", "controllers", "controllersUsers.js"));

//Requerimiento de usuarios registrados en nuestro archivo json.
let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json")));

//Asignamos nombre de la imagen y donde la vamos a guardar
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.dir(req.body);
        cb(null, path.resolve(__dirname, "..", "..", "public", "images", "avatars"));
    },
    filename: (req, file, cb) => {
        cb(null, "Avatar-" + Date.now() + path.extname(file.originalname));//path.extname: obtiene la extensión del archivo. ​ file:​ es donde estan todos los datos del archivo que viaja desde el front hacia el back. Originalname: es el nombre original del archivo.
    }
});
const upload = multer({storage: storage});*/

//Creación de las rutas
router.get("/login", controllersUsers.login);
router.post("/login", [
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