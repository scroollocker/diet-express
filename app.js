var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var envmw = require('./middleware/environment-mw');
var authmw = require('./middleware/auth-mw');

var index = require('./routes/index');
var login = require('./routes/login/login');
var templates = require('./routes/templates/templates');
var patients = require('./routes/patients/patients');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var MemoryStore =session.MemoryStore;

// app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'dietmakerapp',
    store: new MemoryStore(),
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(envmw);

app.use('/login', login);

app.use(authmw);

app.use('/', index);
app.use('/templates', templates);
app.use('/patients', patients);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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