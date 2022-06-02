const fs = require("fs");
const path = require("path");

let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json")));

module.exports = (req, res, next) => {
    console.log("ENTRO EN ACCESO.JS");
    res.locals.usuario = false;

    if (req.session.usuario) {
        console.log("EXISTE SESSION DE USUARIO");

        res.locals.usuario = req.session.usuario;

        return next();
    } else if (req.cookie.email) {
        console.log("EXISTE COOKIE DE USUARIO SESIONADO");

        let usuario = users.find(user => req.cookie.email == user.email);

        req.session.usuario = usuario;

        return next();
    } else {
        console.log("NO EXISTE SESSION INICIADA");

        return next();
    }
}