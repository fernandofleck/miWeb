// Requerimos lo necesario
const path = require("path");
const fs = require("fs");

// Exportamos el modulo
module.exports = {
	index: (req, res) => {
		//Obtención de Datos del archivo Json
        let sections = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "sections.json")));
		let phrases = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "phrases.json")));

		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "web", "index.ejs"), {sections, phrases});
	},

	about: (req, res) => {
		res.render(path.resolve(__dirname, "..", "views", "web", "about.ejs"));
	},

	contact: (req, res) => {
		res.render(path.resolve(__dirname, "..", "views", "web", "contact.ejs"));
	},
	
	legal: (req, res) => {
		res.render(path.resolve(__dirname, "..", "views", "web", "legal.ejs"));
	},
	
	category: (req, res) => {
		//Obtención de Datos del archivo Json
        let sections = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "sections.json")));
        let files = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "files.json")));

		//console.log("SECTION: " + req.params.routeS);

		// Buscamos el nombre la seccion a mostrar
        const sectionToShow = sections.find(section => section.routeS == req.params.routeS);

		const categoryFiles = files.filter(file => file.category == req.params.routeS);

		res.render(path.resolve(__dirname, "..", "views", "web", "category.ejs"), {sectionToShow, categoryFiles});
	}
}