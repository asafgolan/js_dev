var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serverbone = require('serverbone');
var expressSession = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var config = require('./config');
var models = require('./models');
var collections = require('./collections');
/*
var user = new models.User({
  username:'baba',
  password: 'easy',
});

user.save();*/

var usersResource = new serverbone.resources.Resource('users', {
  collection: collections.Users
});


var routes = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');

var passportConfig = require('./auth/passport-config');
var restrict = require('./auth/restrict');
passportConfig();

var user = new models.User({
  username: 'admin',
  password: 'admin'
});


user.save();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession(
    {
        secret: 'hope it works',
        saveUninitialized: false,
        resave: false
    }
));

//for  passprot to flash error messages
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', login);
app.use(restrict);
app.use('/', routes);
app.use('/users'/*, auth*/ ,usersResource.app);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





module.exports = app;
