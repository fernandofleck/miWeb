// Requerimos lo necesario
const { validationResult } = require("express-validator");
const path = require("path");
const bcrypt = require("bcryptjs");

// Exportamos el modulo
module.exports = {
	login: (req, res) => {
		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "users", "login.ejs"));
	},

    register: (req, res) => {
		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "users", "register.ejs"));
	},

    registerPost: (req, res) => {
		// Obtención de Datos del archivo Json
		let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json")));

        // Creamos una variable donde almacenaremos los errores encontrados en los datos ingresados.
		let errors = validationResult(req);

		// Verificación si hay errores
		if(errors.isEmpty()){
			let newId = 0, userFind;
			do {
				console.log("IDIDIDIDIDIDIDIDIDIDIDID: "+newId);
				newId++;
				userFind = users.find(user => newId == user.id)
			} while (userFind != "undefined"); // Comprobación de que el id de nuevo usuario no exista.

			// Creación de usuario.
			let newUser = {
				id: newId,
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 10)
			}

			// Agregamos usuario nuevo junto a los demás.
			users.push(newUser);

			//Convertimos el array en un string e indicamos que se guarde un usuario bajo el otro con "null, 2"
			let newUsersJson = JSON.stringify(users, null, 2);

			//Sobreescribimos el archivo Json guardando el nuevo usuario
			fs.writeFileSync(path.resolve(__dirname,"..", "data", "users.json"), newUsersJson);

			//Redireccionamos a la vista del administrador
			res.redirect("/login");
		} else {
            res.render(path.resolve(__dirname, "..", "views", "users", "register.ejs"), {errors: errors.errors});
        }
    }
}