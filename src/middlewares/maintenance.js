const path = require("path");

module.exports = (req, res, next) => {
    // Renderizaremos la vista que indica que la página esta en mantenimiento.
    return res.render(path.resolve(__dirname, "..", "views", "web", "maintenance.ejs"));
};