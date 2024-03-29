// Requerimos lo necesario
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");

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
        let contents = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "contents.json")));

		//console.log("SECTION: " + req.params.routeS);

		// Buscamos el nombre la seccion a mostrar
        const sectionToShow = sections.find(section => section.routeS == req.params.routeS);

		const categoryFiles = files.filter(file => file.category == req.params.routeS);

		const categoryContents = contents.filter(content => content.category == req.params.routeS);

		res.render(path.resolve(__dirname, "..", "views", "web", "category.ejs"), {sectionToShow, categoryFiles, categoryContents});
	},

	content: (req, res) => {
		//Obtención de Datos del archivo Json
        let contents = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "contents.json")));

		const contentToShow = contents.find(content => content.id == req.params.id);

		res.render(path.resolve(__dirname, "..", "views", "web", "content.ejs"), {contentToShow});
	},

	subscribe: (req, res) => {
		let subscribers = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "subscribers.json")));

		let errors = validationResult(req);

		if (errors.isEmpty()) {
			let subscriberFind = subscribers.find(subscriber => req.body.email == subscriber.email);

			if (subscriberFind != undefined) {
				errors.msg = "Email ya suscrito.";
				return res.render(path.resolve(__dirname, "..", "views", "web", "thanks.ejs"), {errors: errors.msg});
			};

			let newSubscriber = {
				name: req.body.name,
				email: req.body.email
			};

			subscribers.push(newSubscriber);

			let newSubscribersJson = JSON.stringify(subscribers, null, 2);

			fs.writeFileSync(path.resolve(__dirname, "..", "data", "subscribers.json"), newSubscribersJson);

			return res.render(path.resolve(__dirname, "..", "views", "web", "thanks.ejs"), {errors: undefined});
		} else {
            return res.render(path.resolve(__dirname, "..", "views", "web", "thanks.ejs"), {errors: errors.errors});
        };
	}
}