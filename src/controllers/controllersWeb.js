// Requerimos lo necesario
const path = require("path");
const fs = require("fs");

// Exportamos el modulo
module.exports = {
	index: (req, res) => {
		//Obtención de Datos del archivo Json
        let images = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "imagesPrincipalPage.json")));
		let phrases = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "phrases.json")));

		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "web", "index.ejs"), {images, phrases});
	},

	about: (req, res) => {
		res.render(path.resolve(__dirname, "..", "views", "web", "about.ejs"));
	},

	contact: (req, res) => {
		res.render(path.resolve(__dirname, "..", "views", "web", "contact.ejs"));
	},
	
	legal: (req, res) => {
		res.render(path.resolve(__dirname, "..", "views", "web", "legal.ejs"));
	}
}