// Requerimos lo necesario
const path = require("path");
const fs = require("fs");

// Exportamos el modulo
module.exports = {
	super: (req, res) => {
		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "admins", "super.ejs"));
	},

	superTable: (req, res) => {
		//Obtención de Datos del archivo Json
        let images = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "imagesPrincipalPage.json")));

		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "admins", "superTable.ejs"), {images});
	},

	newImg: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "admins", "newImg.ejs"));
    },

    saveImg: (req, res) => {
        //Obtención de Datos del archivo Json
        let images = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "imagesPrincipalPage.json")));

        //Aqui se indica el formato de como se va a guardar la información
        let newImage = {
            id: req.body.id,
            name: req.body.name,
            autor: req.body.autor,
			autorLink: req.body.autorLink,
            routeI: req.body.routeI,
            img: req.files[0].filename
        }

        //Agregamos al array el nuevo producto
        images.push(newImage);

        //Convertimos el array en un string e indicamos que se guarde un producto bajo el otro con "null, 2"
        let newImagesJson = JSON.stringify(images, null, 2);

        //Sobreescribimos el archivo Json guardando el nuevo producto
        fs.writeFileSync(path.resolve(__dirname,"..", "data", "imagesPrincipalPage.json"), newImagesJson);

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
    }
}