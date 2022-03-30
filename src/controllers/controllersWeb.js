// Requerimos lo necesario
const path = require("path");

// Exportamos el modulo
module.exports = {
	index: (req, res) => {
		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "web", "index.ejs"));
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