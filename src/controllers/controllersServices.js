// Requerimos lo necesario
const path = require("path");

// Exportamos el modulo
module.exports = {
	services: (req, res) => {
		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "services", "services.ejs"));
	}
}