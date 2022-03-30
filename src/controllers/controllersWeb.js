// Requerimos lo necesario
const path = require("path");

// Exportamos el modulo
module.exports = {
	index: (req, res) => {
		// Renderizamos la vista
		res.render(path.resolve(__dirname, "..", "views", "web", "index.ejs"));
	}
}