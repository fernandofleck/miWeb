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
    }
}