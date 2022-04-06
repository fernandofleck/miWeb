var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Requerimos las rutas
var webRouter = require('./routes/web');
var servicesRouter = require("./routes/services");
var superRouter = require("./routes/super");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
//app.engine('html', require('ejs').renderFile);//Probando por error que genera vista /super
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

// Implementamos las rutas
app.use(webRouter);
app.use(servicesRouter);
app.use(superRouter);

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