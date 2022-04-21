// Requerimos lo necesario
const {check, validationResult, body } = require("express-validator");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Exportamos el modulo
module.exports = {
	login: (req, res) => {
		// Renderizamos la vista
		return res.render(path.resolve(__dirname, "..", "views", "users", "login.ejs"));
	},

	loginPost: (req, res) => {
		// Obtención de Datos del archivo Json
		let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json")));

        // Creamos una variable donde almacenaremos los errores encontrados en los datos ingresados.
		let errors = validationResult(req);

		// Verificación si hay errores
		if(errors.isEmpty()){ // isEmpty() devuelve true en caso de estar vacía la variable y false en caso contrario.
			
			//Redireccionamos al login para iniciar sesión
			return res.redirect("/");
		} else {
			//De haber errores en el ingreso de datos renderizamos nuevamente la página y mostramos los mismos.
            return res.render(path.resolve(__dirname, "..", "views", "users", "login.ejs"), {errors: errors.errors});
        }
    },

    register: (req, res) => {
		// Renderizamos la vista
		return res.render(path.resolve(__dirname, "..", "views", "users", "register.ejs"));
	},

    registerPost: (req, res) => {
		// Obtención de Datos del archivo Json
		let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "users.json")));

        // Creamos una variable donde almacenaremos los errores encontrados en los datos ingresados.
		let errors = validationResult(req);

		// Verificación si hay errores
		if(errors.isEmpty()){ // isEmpty() devuelve true en caso de estar vacía la variable y false en caso contrario.
			let newId = 0, userFind;

			// Comprobación de que el email no ha sido utilizado anteriormente.
			userFind = users.find(user => req.body.email == user.email);
			if (userFind != undefined) {
				errors.msg = "Email en uso. Pruebe con otro.";
				return res.render(path.resolve(__dirname, "..", "views", "users", "register.ejs"), {errors: errors.msg});
			};

			// Comprobación de que el id de nuevo usuario no exista.
			do {
				newId++;
				userFind = users.find(user => newId == user.id)
			} while (userFind != undefined);

			// Creación de usuario.
			let newUser = {
				id: newId,
				role: 1,
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

			//Redireccionamos al login para iniciar sesión
			return res.redirect("/login");
		} else {
			//De haber errores en el ingreso de datos renderizamos nuevamente la página y mostramos los mismos.
            return res.render(path.resolve(__dirname, "..", "views", "users", "register.ejs"), {errors: errors.errors});
        }
    }
}