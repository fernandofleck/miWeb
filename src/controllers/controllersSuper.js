// Requerimos lo necesario
const path = require("path");
const fs = require("fs");

// Exportamos el modulo
module.exports = {

	superView: (req, res) => {
		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "admins", "superView.ejs"));
	},

	superTable: (req, res) => {
		//Obtención de Datos del archivo Json
        let sections = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "sections.json")));

		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "admins", "superTable.ejs"), {sections});
	},

	newSection: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "admins", "newSection.ejs"));
    },

    saveSection: (req, res) => {
        //Obtención de Datos del archivo Json
        let sections = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "sections.json")));

        //Aqui se indica el formato de como se va a guardar la información
        let newSection = {
            id: req.body.id,
            name: req.body.name,
            autor: req.body.autor,
			autorLink: req.body.autorLink,
            routeS: req.body.routeS,
            img: req.files[0].filename
        }

        //Agregamos al array el nuevo producto
        sections.push(newSection);

        //Convertimos el array en un string e indicamos que se guarde un producto bajo el otro con "null, 2"
        let newSectionJson = JSON.stringify(sections, null, 2);

        //Sobreescribimos el archivo Json guardando el nuevo producto
        fs.writeFileSync(path.resolve(__dirname,"..", "data", "sections.json"), newSectionJson);

        //Redireccionamos a la vista del administrador
        res.redirect("/super/table");
    },

    phrases: (req, res) => {
        //Obtención de Datos del archivo Json
        let phrases = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "phrases.json")));

        res.render(path.resolve(__dirname, "..", "views", "admins", "phrases.ejs"), {phrases});
    },

    savePhrase: (req, res) => {
        //Obtención de Datos del archivo Json
        let phrases = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "phrases.json")));

        //Aqui se indica el formato de como se va a guardar la información
        let newPhrase = {
            id: phrases.length + 1,
            phrase: req.body.phrase,
            autor: req.body.autor,
			bookOrPage: req.body.bookOrPage,
        }

        //Agregamos al array el nuevo producto
        phrases.push(newPhrase);

        //Convertimos el array en un string e indicamos que se guarde un producto bajo el otro con "null, 2"
        let newPhrasesJson = JSON.stringify(phrases, null, 2);

        //Sobreescribimos el archivo Json guardando el nuevo producto
        fs.writeFileSync(path.resolve(__dirname,"..", "data", "phrases.json"), newPhrasesJson);

        //Redireccionamos a la vista del administrador
        res.redirect("/super/phrases");
    },

    deletePhrase: (req, res) => {
        //Obtención de Datos del archivo Json
        let phrases = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "phrases.json")));

        // Guardamos la frase a borrar
        const phraseDeleteId = req.params.id;

        // Filtramos el arreglo original para eliminar el producto a borrar
        const filteredPhrases = phrases.filter(phrase => phrase.id != phraseDeleteId);

        // Se convierte el arreglo en un string y se indica que una frase se guarda bajo la otra con null, 2.
        let phrasesToSave = JSON.stringify(filteredPhrases, null, 2);

        // Se sobreescribe el archivo JSON
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "phrases.json"), phrasesToSave);

        // Redireccionamos a la vista
        res.redirect("/super/phrases");
    },

    files: (req, res) => {
		//Obtención de Datos del archivo Json
        let files = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "files.json")));

		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "admins", "files.ejs"), {files});
	},

    saveFile: (req, res) => {
        //Obtención de Datos del archivo Json
        let files = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "files.json")));

        //Aqui se indica el formato de como se va a guardar la información
        let newFile = {
            id: files.length + 1,
            name: req.body.name,
            category: req.body.category,
			link: req.body.link,
        }

        //Agregamos al array el nuevo producto
        files.push(newFile);

        //Convertimos el array en un string e indicamos que se guarde un producto bajo el otro con "null, 2"
        let newFilesJson = JSON.stringify(files, null, 2);

        //Sobreescribimos el archivo Json guardando el nuevo producto
        fs.writeFileSync(path.resolve(__dirname,"..", "data", "files.json"), newFilesJson);

        //Redireccionamos a la vista del administrador
        res.redirect("/super/files");
    }
}