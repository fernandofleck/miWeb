let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require("express-session");
let app = express();

// Requerimos las rutas
//const usersRouter = require("./routes/users");
let webRouter = require("./routes/web");
//const adminRouter = require("./routes/admin");

// Requerimos los middlewares
let maintenance = require("./middlewares/maintenance");


// view engine setup
app.set("views", path.join(__dirname, "views"));
//app.engine('html', require('ejs').renderFile);//Probando por error que genera vista /super
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(session({secret: "1234", resave: true, saveUninitialized: true}));

// Implementamos las rutas
//app.use(usersRouter);
app.use(webRouter);
//app.use(adminRouter);

// Implementamos los middlewares
app.use(maintenance);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Activar el servidor
app.listen(3000, "localhost", () => console.log("Puerto del Servidor: 3000"));

module.exports = app;