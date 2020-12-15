var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var InitiateMongoServer = require("./config/db");
var bodyParser = require('body-parser');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pistaRouter = require('./routes/pista');
var formRouter = require('./routes/form');
var atletasRouter = require('./routes/atletas');
var clubsRouter = require('./routes/clubs');


var pinterestRouter = require('./routes/pinterest');
var mimusicaRouter = require('./routes/mimusica');
var covidRouter = require('./routes/covid');
var ventaRouter = require('./routes/venta');
var aclubsRouter = require('./routes/aclubs');
var yourserversidecodeRouter = require('./routes/your-server-side-code');







var app = express();

InitiateMongoServer();
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pista', pistaRouter);

app.use('/pinterest', pinterestRouter);
app.use('/mimusica', mimusicaRouter);
app.use('/covid', covidRouter);
app.use('/venta', ventaRouter);
app.use('/your-server-side-code', yourserversidecodeRouter);
app.use('/form', formRouter);
app.use('/atletas', atletasRouter);
app.use('/clubs', clubsRouter);
app.use('/aclubs', aclubsRouter);




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

module.exports = app;
